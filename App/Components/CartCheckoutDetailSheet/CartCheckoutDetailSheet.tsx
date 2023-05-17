import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import styles from "../CartCheckoutDetailSheet/CartCheckoutDetailSheetStyle";
import Divider from "../Divider";
import { useTranslation } from "react-i18next";

interface OwnProps {
  onBackPress?: () => void;
}

type Props = OwnProps;

const CartCheckoutDetailSheet: React.FunctionComponent<Props> = ({ onBackPress }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {"Details"}
        </Text>
        <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
          <Multiply style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {"Item Total"}
        </Text>
        <Text numberOfLines={1} style={styles.items}>
          {"SAR 868.00"}
        </Text>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {"Discounts"}
        </Text>
        <Text numberOfLines={1} style={styles.itemGreen}>
          {"-SAR 222.90"}
        </Text>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {"Subtotal (inc tax)"}
        </Text>
        <Text numberOfLines={1} style={styles.items}>
          {"SAR 645.10"}
        </Text>
      </View>
      <View style={styles.mainView}>
        <Text numberOfLines={1} style={styles.items}>
          {"Delivery"}
        </Text>
        <Text numberOfLines={1} style={styles.items}>
          {"Calculated at checkout"}
        </Text>
      </View>
      <Divider style={{ marginTop: 10 }} />
      <View style={styles.fixedContainer}>
        <View style={styles.refineContainer}>
          <Text style={styles.headerText}>{t("cart.orderTotal")}</Text>
          <Text style={styles.total}>{"SAR 645.10"}</Text>
        </View>
        <TouchableOpacity style={styles.refineButton} onPress={onBackPress}>
          <Text style={styles.text}>{t("cart.checkout").toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CartCheckoutDetailSheet;
