import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Platform, Text, TouchableOpacity, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { imageUrl } from "~root/Lib/StringHelper";
import { CustomWebViewRedirection } from "../../Components";
import { getSelectedLanguage, getStringWithArguments } from "../../i18n";
import CartIcon from "../../Images/cartIcon/cartIcon.svg";
import EmptyHeartIcon from "../../Images/heartIcon/emptyHeartIcon.svg";
import HeartIcon from "../../Images/heartIcon/HeartIcon.svg";
import { getCartProductPayload } from "../../Lib/CartHelper";
import { isAnonymousLogin } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import { AuthAction } from "../../Reducers/AuthReducer";
import { CartAction } from "../../Reducers/CartReducer";
import { MyWishListActions } from "../../Reducers/MyWishListReducers";
import AddToCartComponent from "../AddToCartComponent/AddToCartComponent";
import styles from "./BestSellersCartComponentStyle";
interface OwnProps {
  item?: any;
  onpressWishList?: (p: object) => void;
  containerStyle?: ViewProps;
  direction?: any;
}

type Props = OwnProps;
const BestSellersCartItemComponent: React.FunctionComponent<Props> = ({ item, direction, containerStyle, onpressWishList }: Props) => {
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state?.wishList?.fetching,
  }));

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const [skuId, setSKUId] = useState("");

  const onClickWishListIcon = async (code: any) => {
    dispatch(
      MyWishListActions.requestAddToWishList(
        { code: code },
        {
          onSuccess: data => callOkResponce(code, true),
          onFailure: () => {
            Alert.alert(t("errorInAddToWishList"));
          },
        },
      ),
    );
  };

  const callOkResponce = (code, isInWishList) => {
    Toast.show({
      type: "wishList",
      text1: isInWishList ? t("prodAddedToWishList") : t("prodRemoveFromWishList"),
      topOffset: Platform.OS === "ios" ? 50 : 20,
      visibilityTime: 3000,
    });
    const payload = {
      code: code,
      inWishlist: isInWishList,
    };

    if (onpressWishList) onpressWishList(payload);
  };

  const onClickRemoveWishListIcon = async (code: any) => {
    dispatch(
      MyWishListActions.requestRemoveFromWishList(
        { code: code },
        {
          onSuccess: () => callOkResponce(code, false),
          onFailure: data => {
            Alert.alert(t("errorInRemoveFromWishList"));
          },
        },
      ),
    );
  };

  const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };
  const { cartId, newCartEntry } = useSelector((state: RootState) => ({
    cartId: state?.cart?.cartData?.code,
    newCartEntry: state?.cart?.newCartEntry,
  }));
  const handleCartClick = async () => {
    const isGuest = await isAnonymousLogin();
    if (isGuest) {
      dispatch(AuthAction.signOut());
    } else {
      addProductToCart();
    }
  };
  const addProductToCart = React.useCallback(() => {
    const cartPayload = getCartProductPayload(cartId, item, 1);
    dispatch(
      CartAction.addProductToCart(cartPayload, {
        onSuccess: () => {
          Toast.show({
            type: "cart",
            text1: t("prodAddedToCart"),
            topOffset: Platform.OS === "ios" ? 50 : 20,
            visibilityTime: 3000,
          });
          setTimeout(() => {
            refRBSheet.current.open();
          }, 1000);
        },
        onFailure: () => {
          Alert.alert(t("errorAddingToCart"));
        },
      }),
    );
  }, []);

  const callPdp = sku => {
    setSKUId(sku);
  };

  return (
    <TouchableOpacity onPress={() => callPdp(item?.SKU)} style={[styles.listView, containerStyle]} {...accessibility("cartList")}>
      <View>
        <View style={styles.leftwrapper}>
          <View style={styles.leftWrapper}>
            <TouchableOpacity
              onPress={async () => {
                const isGuest = await isAnonymousLogin();
                if (isGuest) {
                  dispatch(AuthAction.signOut());
                } else {
                  item?.inWishlist ? onClickRemoveWishListIcon(item?.SKU) : onClickWishListIcon(item?.SKU);
                }
              }}
              style={styles.leftWrapperImage}
            >
              {item?.inWishlist ? <HeartIcon /> : <EmptyHeartIcon />}
            </TouchableOpacity>
            {/* )} */}
          </View>
        </View>
        <View style={styles.productImageWrapper}>
          <FastImage source={imgSource} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
      </View>
      <View style={[styles.rowView]}>
        <Text numberOfLines={3} style={[styles.productDescription]} {...accessibility("productDetailsLabel")}>
          {item?.ProductDescription.replace(/<[^>]+>/g, "") ?? item?.product?.ProductDescription.replace(/<[^>]+>/g, "")}
        </Text>
        <View style={[styles.qtyView]}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.viewQtyValue}>{item?.discountPrice ? item?.discountPrice : item?.Price}</Text>
            {item?.discountPrice ? (
              <View style={styles.discountValueWrapper}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.discountValue, styles.discountPrice]}>{item?.Price}</Text>
                  <View style={styles.discountText}>
                    <Text style={[styles.discountValue]} {...accessibility("productDetailsLabel")}>
                      {getStringWithArguments("save", "", { savingPrice: item?.savingPrice })}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
          <TouchableOpacity style={styles.cartIconBtn} onPress={handleCartClick}>
            <CartIcon />
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000080",
          },
        }}
      >
        {newCartEntry?.images?.length > 0 && <AddToCartComponent item={newCartEntry} onBackPress={() => refRBSheet.current.close()} />}
      </RBSheet>
      <CustomWebViewRedirection
        url={skuId ? `p/${skuId}?source=Mobile&lang=${getSelectedLanguage()?.code}` : ""}
        closeSheet={() => {
          callPdp("");
        }}
        onStatechanges={() => {}}
      />
    </TouchableOpacity>
  );
};

export default BestSellersCartItemComponent;
