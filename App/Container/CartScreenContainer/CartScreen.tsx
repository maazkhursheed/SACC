import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Animated, Image, Keyboard, Platform, Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { CustomWebViewRedirection } from "../../Components";
import HeaderTitle from "../../Components/BestSellerHeader/BestSellerHeader";
import CartApplyCouponSheet from "../../Components/CartApplyCouponSheet/CartApplyCouponSheet";
import CartCheckoutDetailSheet from "../../Components/CartCheckoutDetailSheet/CartCheckoutDetailSheet";
import CartItem from "../../Components/CartComponent/CartItem";
import CartDeleteSheet from "../../Components/CartDeleteSheet/CartDeleteSheet";
import { CartEmptyComponent } from "../../Components/CartEmptyComponent/CartEmptyComponent";
import Divider from "../../Components/Divider";
import LoadingView from "../../Components/LoadingView";
import MainContainer from "../../Components/MainContainer";
import SmallHeader from "../../Components/SmallHeader";
import { getSelectedLanguage, localizeImage } from "../../i18n";
import { removeItemFromCartPayload } from "../../Lib/CartHelper";
import { accessibility } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import { CartAction } from "../../Reducers/CartReducer";
import styles from "../CartScreenContainer/CartScreenStyle";
interface StateProps {}

type Props = StateProps;

const CartScreen: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const cartDetailsSheet = useRef();
  const dispatch = useDispatch();
  const deleteItemSheet = useRef();
  const cartApplyCouponSheet = useRef();
  const [webUrl, setUrl] = useState("");
  const [isCancelled, setCancelled] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [entryNumber, setEntryNumber] = useState(0);
  const [isRemoveAll, setIsRemoveAll] = useState(false);
  const { cart, isLoading, cartId } = useSelector((state: RootState) => ({
    cart: state?.cart?.cartData,
    isLoading: state?.cart?.isLoading,
    cartId: state?.cart?.cartData?.code,
  }));
  const entries = cart?.entries;
  const scrollY = new Animated.Value(0);

  const renderMessageForNoProducts = () => {
    return !isLoading ? (
      <View style={styles.noMatchTxtContainer}>
        <Text style={styles.noMatchTxt}>{t("noproductsFound")}</Text>
      </View>
    ) : null;
  };

  const callSuccessResponce = count => {
    Toast.show({
      type: "removeCart",
      text1: count === "single" ? t("oneItemRemove") : t("AllItemRemove"),
      topOffset: Platform.OS === "ios" ? 50 : 20,
      visibilityTime: 3000,
    });
  };

  const onProductRemove = () => {
    deleteItemSheet?.current?.close();
    const removeItemPayload = removeItemFromCartPayload(cartId, entryNumber);
    dispatch(
      CartAction.removeItemFromCart(removeItemPayload, {
        onSuccess: () => callSuccessResponce("single"),
        onFailure: data => {
          Alert.alert(t("errorInRemoveFromCart"));
        },
      }),
    );
  };

  const onCartItemDelete = (itemToDelete: any, entryNumber: number) => {
    Keyboard.dismiss();
    setIsRemoveAll(false);
    setItemToDelete(itemToDelete);
    setEntryNumber(entryNumber);
    deleteItemSheet?.current?.open();
    setCancelled(false);
  };

  const onCancelDelete = () => {
    deleteItemSheet?.current?.close();
    setCancelled(true);
  };
  const removeAllCartItems = () => {
    deleteItemSheet?.current?.close();
    dispatch(
      CartAction.removeAllCartItems(cartId, {
        onSuccess: () => callSuccessResponce("all"),
        onFailure: data => {
          Alert.alert(t("errorInRemoveFromWishList"));
        },
      }),
    );
  };

  React.useEffect(() => {
    dispatch(CartAction.getCartCoupons({}));
  }, []);

  const renderFooter = () => {
    return (
      <TouchableOpacity onPress={() => cartApplyCouponSheet?.current?.open()}>
        <Divider style={{ marginTop: 20 }} />
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{t("cart.coupon")}</Text>
          <Image resizeMode={"contain"} source={localizeImage("NextIcon")} />
        </View>
        <Divider style={{ marginBottom: 26 }} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <SmallHeader onBackPress={navigation.goBack} title={t("cart")} containerStyle={styles.smallHeaderContainer} titleTextStyle={styles.titleText} />
      <Divider />
      {cart?.totalItems > 0 ? (
        <MainContainer>
          {cart?.totalItems && (
            <HeaderTitle
              title={cart?.totalItems + " " + t("cart.itemsInCart")}
              count={0}
              onPress={() => {
                Keyboard.dismiss();
                deleteItemSheet?.current?.open();
                setIsRemoveAll(true);
                setCancelled(false);
              }}
              rightText={t("cart.removeAll")}
              containerStyle={styles.containerStyle}
            />
          )}
          <LoadingView style={styles.container} isLoading={isLoading}>
            <Animated.FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainerStyle}
              data={entries}
              onEndReachedThreshold={0.02}
              numColumns={1}
              bounces={false}
              renderItem={({ item, index }) => {
                return <CartItem isCancelled={isCancelled} onDeletePress={onCartItemDelete} index={index} item={item} direction={"Cartlist"} />;
              }}
              {...accessibility("CartFlatList")}
              keyExtractor={(item, index) => (item ? item.SKU : index.toString())}
              ListEmptyComponent={renderMessageForNoProducts}
              onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
              ListFooterComponent={renderFooter}
            />
          </LoadingView>
          <View style={styles.fixedContainer}>
            <View style={styles.refineContainer}>
              <TouchableOpacity onPress={() => cartDetailsSheet?.current?.open()}>
                <Text style={styles.viewMoreStyle}>{t("cart.viewDetails")}</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>{t("cart.subtotal")}</Text>
              {isLoading ? <LoadingView style={styles.container} isLoading={isLoading} /> : <Text style={styles.total}>{cart?.subTotal?.formattedValue}</Text>}
            </View>
            <TouchableOpacity
              style={styles.refineButton}
              onPress={() => setUrl(`/checkout/multi/delivery-address/add?source=Mobile&lang=${getSelectedLanguage()?.code}`)}
            >
              <Text style={styles.text}>{t("cart.checkout").toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
          <RBSheet
            ref={cartDetailsSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={350}
            customStyles={{
              wrapper: {
                backgroundColor: "#00000080",
              },
            }}
          >
            <CartCheckoutDetailSheet onBackPress={() => cartDetailsSheet?.current?.close()} />
          </RBSheet>
          <RBSheet
            ref={cartApplyCouponSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            height={800}
            customStyles={{
              wrapper: {
                backgroundColor: "#00000080",
              },
            }}
          >
            <CartApplyCouponSheet onBackPress={() => cartApplyCouponSheet?.current?.close()} />
          </RBSheet>
          <RBSheet
            ref={deleteItemSheet}
            closeOnDragDown={false}
            closeOnPressMask={false}
            height={200}
            customStyles={{
              wrapper: {
                backgroundColor: "#00000080",
              },
            }}
          >
            <CartDeleteSheet
              onRemovePress={isRemoveAll ? removeAllCartItems : onProductRemove}
              onBackPress={onCancelDelete}
              title={isRemoveAll ? t("cart.removeAll") : t("removeItem")}
              description={isRemoveAll ? t("cart.removeAllItemsDescription") : t("removeItemDescription")}
            />
          </RBSheet>
          <CustomWebViewRedirection
            url={webUrl}
            closeSheet={() => {
              dispatch(CartAction.checkCurrentCart());
              setUrl("");
            }}
            onStatechanges={() => {}}
          />
        </MainContainer>
      ) : (
        !isLoading && <CartEmptyComponent />
      )}
    </>
  );
};

export default CartScreen;
