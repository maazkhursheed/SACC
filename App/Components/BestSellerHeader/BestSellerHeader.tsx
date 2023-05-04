import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import styles from "./BestSellerHeaderStyle";
interface OwnProps {
  title?: string;
  rightText?: string;
  count?: number;
  containerStyle?: any;
  onPress?: () => void;
  headerStyle?: ViewStyle | any;
}

interface StateProps {}

type Props = StateProps & OwnProps;

const BestSellerHeader: React.SFC<Props> = ({ title, containerStyle, count, rightText, onPress, headerStyle }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.categoryHeaderWrapper, containerStyle]}>
      <View style={[styles.headerWrapper]}>
        <Text style={[styles.headerText, headerStyle]}>{title ? title : t("header.Title")}</Text>
        {count > 0 && <Text style={[styles.itemCount]}>{` (${count}) `}</Text>}
      </View>
      {rightText && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.viewMoreStyle}>{rightText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BestSellerHeader;
