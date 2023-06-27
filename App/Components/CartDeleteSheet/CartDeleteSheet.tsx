import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import styles from "./CartDeleteSheetStyle";

interface OwnProps {
  onBackPress?: () => void;
  title?: any;
  description?: any;
  onRemovePress: () => void;
}

type Props = OwnProps;

const CartDeleteSheet: React.FunctionComponent<Props> = ({ onBackPress, title, description, onRemovePress }: Props) => {
  const { t } = useTranslation();
  const { cart } = useSelector((state: RootState) => ({
    cart: state?.cart?.cartData,
  }));
  return (
    <View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.subContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
            <Multiply style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.leftButton} onPress={onBackPress} {...accessibility("crossIcon")}>
          <Text style={styles.leftButtonText}>{t("cancelAllCaps")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightButton} onPress={() => onRemovePress()} {...accessibility("crossIcon")}>
          <Text style={styles.rightButtonText}>{t("removeAllCaps")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CartDeleteSheet;
