import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { imageUrl } from "../../Lib/StringHelper";
import styles from "../AddToCartComponent/AddToCartComponentStyle";
import Divider from "../Divider";
import PriceComponent from "../PriceComponent";

interface OwnProps {
  item: any;
  onBackPress?: () => void;
}

type Props = OwnProps;

const AddToCartComponent: React.FunctionComponent<Props> = ({ item, onBackPress }: Props) => {
  const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };
  const { t } = useTranslation();
  const navigation = useNavigation();
  const onProceed = () => {
    onBackPress();
    navigation.navigate("CartScreen");
  };
  return (
    <>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {"1 item added to cart"}
        </Text>
        <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
          <Multiply style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <View style={[styles.subContainer, { paddingTop: 24 }]}>
        <View style={styles.productImageWrapper}>
          <FastImage source={imgSource} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
        <View style={[styles.rowView]}>
          <Text numberOfLines={3} style={[styles.productDescription]} {...accessibility("productDetailsLabel")}>
            {item?.ProductDescription ?? item?.product?.ProductDescription}
          </Text>
          <View style={[styles.qtyView]}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <PriceComponent style={styles.viewQtyValue} value={item?.Price} />
              {item?.discountPrice ? (
                <View style={styles.discountValueWrapper}>
                  <View style={{ flex: 1 }}>
                    <PriceComponent style={[styles.discountValue, styles.discountPrice]} value={item?.discountPrice} />
                    <View style={styles.discountText}>
                      <Text style={[styles.discountValue]} {...accessibility("productDetailsLabel")}>
                        {t("save")}{" "}
                      </Text>
                      <PriceComponent style={[styles.discountValue]} value={item?.savingPrice} />
                      <Text style={styles.discountValue} {...accessibility("productDetailsLabel")}>
                        {` (${item?.percentage}%)`}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.itemsCount}>{"2 items in your cart"}</Text>
      <Text style={styles.itemsTotalCount}>{"Subtotal: SAR 432.90"}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={onProceed}>
        <Text style={styles.text}>{"VIEW CART & CHECKOUT"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueShopButton} onPress={onBackPress}>
        <Text style={styles.textShop}>{"CONTINUE SHOPPING"}</Text>
      </TouchableOpacity>
    </>
  );
};
export default AddToCartComponent;
