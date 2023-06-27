import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { accessibility } from "~root/Lib/DataHelper";
import { imageUrl } from "~root/Lib/StringHelper";
import { BottomFixedButton } from "..";
import styles from "./callOutBrandComponentStyle";
interface OwnProps {
  item: any;
  containerStyle?: ViewProps;
  direction: string;
}

type Props = OwnProps;
const SignatureCollectionItemComponent: React.FunctionComponent<Props> = ({ item, containerStyle, direction }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };
  return (
    <View style={[styles.contentItemWrapper, containerStyle]}>
      <FastImage source={imgSource} style={styles.image} resizeMode={FastImage.resizeMode.stretch} />
      <BottomFixedButton
        onPress={() => {
          const payload = {
            screen: "MainPLP",
            categoryId: `:relevance:brand:${item?.categoryId}`,
            categoryName: item?.name ?? "",
            direction: "calloutBrand",
          };
          navigation.navigate("ProductsListing", payload);
        }}
        btnText={t("shopNow")}
        style={styles.btnwrapper}
        {...accessibility("calloutShopButton")}
        textStyle={styles.textStyle}
      />
    </View>
  );
};

export default SignatureCollectionItemComponent;
