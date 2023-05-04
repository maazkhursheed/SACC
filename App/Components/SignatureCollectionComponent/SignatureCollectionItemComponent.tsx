import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { imageUrl } from "~root/Lib/StringHelper";
import { BottomFixedButton } from "../../Components";
import styles from "./SignatureCollectionComponentStyle";
interface OwnProps {
  item: any;
  containerStyle?: ViewProps;
  direction: string;
}

type Props = OwnProps;
const SignatureCollectionItemComponent: React.FunctionComponent<Props> = ({ item, containerStyle }: Props) => {
  const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };
  const { t } = useTranslation();
  return (
    <View style={[styles.contentItemWrapper, containerStyle]}>
      <FastImage source={imgSource} style={styles.image} resizeMode={FastImage.resizeMode.stretch} />
      <View style={styles.contentWrapper}>
        {item?.title && <Text style={styles.categoryType}>{item?.title}</Text>}
        {item?.headline && <Text style={styles.categoryTypeTitle}>{item?.headline}</Text>}
        {item?.message && <Text style={styles.categoryTypeSubTitle}>{item?.message}</Text>}
        <BottomFixedButton onPress={() => {}} btnText={t("shopNow")} style={styles.btnwrapper} textStyle={styles.textStyle} />
      </View>
    </View>
  );
};

export default SignatureCollectionItemComponent;
