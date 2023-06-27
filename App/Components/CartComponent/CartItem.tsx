import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { accessibility } from "~root/Lib/DataHelper";
import { imageUrl } from "~root/Lib/StringHelper";
import { CustomWebViewRedirection } from "../../Components";
import AppConfig from "../../Config/AppConfig";
import { getSelectedLanguage, getStringWithArguments } from "../../i18n";
import { updateCartProductPayload } from "../../Lib/CartHelper";
import { RootState } from "../../Reducers";
import { CartAction } from "../../Reducers/CartReducer";
import { Images } from "../../Themes";
import styles from "../BestSellersCartComponent/BestSellersCartComponentStyle";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
interface OwnProps {
  item: any;
  containerStyle?: ViewProps;
  direction: any;
  index: number;
  isCancelled: boolean;
  onDeletePress: (item: any, entryNumber: number) => void;
}

type Props = OwnProps;
const CartItem: React.FunctionComponent<Props> = ({ item, direction, containerStyle, index, onDeletePress, isCancelled }: Props) => {
  const { t } = useTranslation();
  const [skuId, setSKUId] = useState("");
  const dispatch = useDispatch();
  // const refRBSheet = useRef();
  const { cartId, entryNumber } = useSelector((state: RootState) => ({
    cartId: state?.cart?.cartData?.code,
    entryNumber: state?.cart?.cartData?.entries[index]?.entryNumber,
  }));
  const imgSource = item?.product?.images[2]?.url ? { uri: AppConfig.BASE_URL + item?.product?.images[2]?.url } : { uri: imageUrl };
  const onProductQuantityChange = React.useCallback(async count => {
    const cartPayload = updateCartProductPayload(cartId, item, count, entryNumber);
    if (count == 0) {
      onDeletePress(item, entryNumber);
    }
    dispatch(
      CartAction.updateProductToCart(cartPayload, {
        onSuccess: () => {},
        onFailure: () => {},
      }),
    );
  }, []);
  const callPdp = sku => {
    setSKUId(sku);
  };

  const getStockLevelStatus = status => {
    if (status) {
      switch (status) {
        case "lowStock":
          return t("lowStock");
          break;
        case "outOfStock":
          return t("outOfStock");
          break;
        case "inStock":
          return t("inStock");
          break;
        default:
          break;
      }
    } else {
      return "";
    }
  };

  return (
    <TouchableOpacity onPress={() => callPdp(item?.product?.code)} style={[styles.listView, containerStyle]} {...accessibility("cartList")}>
      <View>
        <View style={styles.productImageWrapper}>
          <FastImage source={imgSource} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
        <QuantitySelector
          isCancelled={isCancelled}
          index={index}
          stockLevel={item?.product?.stock?.stockLevel}
          productCount={item?.quantity}
          onProductCountChange={onProductQuantityChange}
        />
        <View style={styles.stockContainer}>
          <Image source={item?.product?.stock?.stockLevel > 0 ? Images.StockGreen : Images.StockRed} />
          <Text style={[styles.stockStyle]}>{getStockLevelStatus(item?.product?.stock?.stockLevelStatus)}</Text>
        </View>
        {item?.product?.stock?.stockLevel < 4 && (
          <Text style={styles.leftStock}>{getStringWithArguments("availableStockCount", "", { cartCount: item?.product?.stock?.stockLevel })}</Text>
        )}
      </View>
      <View style={[styles.rowView]}>
        <TouchableOpacity onPress={() => onDeletePress(item, entryNumber)} style={{ alignSelf: "flex-end", padding: 10 }}>
          <Image source={Images.DeleteCartItemIcon} />
        </TouchableOpacity>
        <Text numberOfLines={3} style={[styles.productDescription]} {...accessibility("productDetailsLabel")}>
          {item?.product?.name}
        </Text>
        <View style={[styles.qtyView]}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.viewQtyValue}>
              {item?.product?.discount ? item?.product?.discount?.discountPrice?.formattedValue : item?.product?.price?.formattedValue}
            </Text>
            {item?.product?.discount ? (
              <View style={styles.discountValueWrapper}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.discountValue, styles.discountPrice]}>{item?.product?.price?.formattedValue}</Text>
                  {item?.product?.discount ? (
                    <View style={styles.discountText}>
                      <Text style={[styles.discountValue]} {...accessibility("cartDiscountLabel")}>
                        {getStringWithArguments("save", "", {
                          savingPrice: item?.product?.discount?.saving?.formattedValue,
                        })}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      {/* <RBSheet
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
        <AddToCartComponent item={item} onBackPress={() => refRBSheet.current.close()} />
      </RBSheet> */}
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

export default React.memo(CartItem);
