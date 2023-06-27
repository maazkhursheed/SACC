import React from "react";
import { Image, View } from "react-native";
import { localizeImage } from "../../i18n";
import styles from "./SplashStyles";

const SplashScreen = () => {
  return (
    <View style={styles.splashContainer}>
      <Image resizeMode={"contain"} style={styles.image} source={localizeImage("Logo")} />
    </View>
  );
};

export default SplashScreen;
