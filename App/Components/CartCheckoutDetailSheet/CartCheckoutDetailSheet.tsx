import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomWebViewRedirection } from "../../Components";
import { getSelectedLanguage } from "../../i18n";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import { CartAction } from "../../Reducers/CartReducer";
import styles from "../CartCheckoutDetailSheet/CartCheckoutDetailSheetStyle";
import Divider from "../Divider";
interface OwnProps {
  onBackPress?: () => void;
}

type Props = OwnProps;

const CartCheckoutDetailSheet: React.FunctionComponent<Props> = ({ onBackPress }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [webUrl, setUrl] = React.useState("");
  const { cart } = useSelector((state: RootState) => ({
    cart: state?.cart?.cartData,
  }));

  const callCancelSheet = () => {
    setUrl("");
    dispatch(CartAction.checkCurrentCart());
    if (onBackPress) {
      onBackPress();
    }
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {t("details")}
        </Text>
        <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
          <Multiply style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {t("itemTotal")}
        </Text>
        <Text>{cart?.subTotalBeforeSavingPrice?.formattedValue}</Text>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {t("discount")}
        </Text>
        <Text numberOfLines={1} style={styles.itemGreen}>
          {`-${cart?.totalDiscounts?.formattedValue}`}
        </Text>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {t("subTotalIncTax")}
        </Text>
        <Text numberOfLines={1} style={styles.items}>
          {cart?.subTotal?.formattedValue}
        </Text>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {t("Delivery")}
        </Text>
        <Text numberOfLines={1} style={styles.items}>
          {t("calAtCheckout")}
        </Text>
      </View>
      <Divider style={{ marginTop: 10 }} />
      <View style={styles.fixedContainer}>
        <View style={styles.refineContainer}>
          <Text style={styles.headerText}>{t("cart.orderTotal")}</Text>
          <Text style={styles.total}>{cart?.totalPriceWithTax?.formattedValue}</Text>
        </View>
        <TouchableOpacity style={styles.refineButton} onPress={() => setUrl(`/checkout/multi/delivery-address/add?lang=${getSelectedLanguage()?.code}`)}>
          <Text style={styles.text}>{t("cart.checkout").toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <CustomWebViewRedirection url={webUrl} closeSheet={callCancelSheet} onStatechanges={() => {}} />
    </View>
  );
};
export default CartCheckoutDetailSheet;
