import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import AppConfig from "../../Config/AppConfig";
import { getStringWithArguments } from "../../i18n";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { imageUrl } from "../../Lib/StringHelper";
import { RootState } from "../../Reducers";
import styles from "../AddToCartComponent/AddToCartComponentStyle";
import Divider from "../Divider";
interface OwnProps {
  item: any;
  onBackPress?: () => void;
}

type Props = OwnProps;

const AddToCartComponent: React.FunctionComponent<Props> = ({ item, onBackPress }: Props) => {
  const imgSource = item?.images[2]?.url ? { uri: AppConfig.BASE_URL + item?.images[2]?.url } : { uri: imageUrl };
  const { cart } = useSelector((state: RootState) => ({
    cart: state?.cart?.cartData,
  }));
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onProceed = () => {
    navigation.navigate("CartScreen");
    if (onBackPress) {
      onBackPress();
    }
  };
  return (
    <>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {t("oneItemAdd")}
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
            {item?.name ?? ""}
          </Text>
          <View style={[styles.qtyView]}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.viewQtyValue}>{item?.discount ? item?.discount?.discountPrice?.formattedValue : item?.price?.formattedValue}</Text>
              {item?.discount?.discountPrice ? (
                <View style={styles.discountValueWrapper}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.discountValue, { textDecorationLine: "line-through" }]}>{item?.price?.formattedValue}</Text>
                    <View style={styles.discountText}>
                      <Text style={[styles.discountValue]} {...accessibility("productDetailsLabel")}>
                        {getStringWithArguments("save", "", { savingPrice: item?.discount?.saving?.formattedValue })}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.itemsCount}>{`${cart?.totalItems} ${t("itemsInCart")}`}</Text>
      <Text style={styles.itemsTotalCount}>{`${t("Subtotal")}: ${cart?.totalPriceWithTax?.formattedValue}`}</Text>
      <TouchableOpacity style={styles.checkoutButton} onPress={onProceed}>
        <Text style={styles.text}>{t("view&checkout")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueShopButton} onPress={onBackPress}>
        <Text style={styles.textShop}>{t("continueShopping")}</Text>
      </TouchableOpacity>
    </>
  );
};
export default AddToCartComponent;
