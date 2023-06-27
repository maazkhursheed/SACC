import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import images from "../../Themes/Images";
import styles from "./CartEmptyComponentStyle";

interface OwnProps {}
type Props = OwnProps;
export const CartEmptyComponent: React.SFC<Props> = ({}: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={images.CartEmpty} style={styles.cartEmptyThumbNail} />
        <Text style={styles.cartEmptyLabel}>{t("cartEmptyLabel")}</Text>
        <Text style={styles.cartEmptyDesc}>{t("cartEmptyDesc1")}</Text>
        <Text style={styles.cartEmptyDesc}>{t("cartEmptyDesc2")}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnStyle}>
        <Text style={styles.stripText}>{t("browseProducts")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
