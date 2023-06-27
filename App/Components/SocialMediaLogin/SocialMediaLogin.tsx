import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { FbLogin, GoogleButton } from "../index";
import styles from "./SocialMediaLoginStyle";
interface SocialMediaProps {
  onSocialMediaClick: () => void;
}
const SocialMediaLogin = ({ onSocialMediaClick }: SocialMediaProps) => {
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.orContinuewrapper}>
        <View style={[styles.divider, { marginEnd: 11 }]} />
        <Text style={styles.orContinueText}>{t("login.orContinueWith")}</Text>
        <View style={[styles.divider, { marginStart: 11 }]} />
      </View>
      <View style={styles.socialButtonWrapper}>
        <GoogleButton onSocialMediaClick={onSocialMediaClick} />
        <FbLogin onSocialMediaClick={onSocialMediaClick} />
        {/* <BottomFixedButton onPress={() => {}} style={styles.iconWraaper} SVGIcon={TwitterIcon} svgstyle={{ width: 45, height: 45 }} /> */}
      </View>
    </View>
  );
};

export default SocialMediaLogin;
