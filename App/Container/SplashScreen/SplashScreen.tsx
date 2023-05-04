import React from "react";
import { Image, View } from "react-native";
import { isRTL } from "../../i18n";
import Images from "../../Themes/Images";
import styles from "./SplashStyles";

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      {isRTL() != "rtl" ? (
        <Image resizeMode={"contain"} style={styles.image} source={Images.Logo} />
      ) : (
        <Image resizeMode={"contain"} style={styles.image} source={Images.LogoAr} />
      )}
    </View>
  );
};

export default SplashScreen;
