import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Keychain from "react-native-keychain";
import { useDispatch } from "react-redux";
import BottomFixedButton from "../../Components/BottomFixedButton/BottomFixedButton";
import MainHeader from "../../Components/MainHeader/MainHeader";
import { AuthAction } from "../../Reducers/AuthReducer";
import { Images } from "../../Themes";
import { Token } from "../../Types/CommonTypes";
import styles from "./DeleteAccountCompleteScreenStyles";

const DeleteAccountCompleteScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onPressSearch = () => {};

  const handleLogout = async () => {
    await Keychain.resetInternetCredentials(Token.AccessTokenKey);
    await Keychain.resetInternetCredentials(Token.RefreshTokenKey);
    dispatch(AuthAction.signOut());
  };

  const TextComponent = () => {
    return (
      <View style={styles.Icon}>
        <Image resizeMode={"contain"} style={styles.image} source={Images.DeleteIcon} />
        <Text style={styles.Title}>{t("AccountDeletionComplete")}</Text>
        <Text style={styles.Text1}>{t("DeleteAccountCompleteText1")}</Text>
        <Text style={styles.Text2}>{t("DeleteAccountCompleteText2")}</Text>
        <Text style={styles.Text3}>{t("DeleteAccountCompleteText3")}</Text>
      </View>
    );
  };

  return (
    <>
      <MainHeader onPressSearch={onPressSearch} isHam={false} isSearch={false} />
      <View style={styles.backgroundContainer}>
        <TextComponent />
        <View style={{}}>
          <BottomFixedButton
            onPress={() => {
              handleLogout();
            }}
            btnText={t("Close")}
            style={styles.bottomBtnContainer}
            textStyle={styles.textStyles}
          />
        </View>
        <TouchableOpacity style={styles.buttonWrapper}>
          <Text style={styles.contactUs}>{t("ContactUs")}</Text>
          <Image resizeMode={"contain"} style={styles.contactUsIcon} source={Images.contactUs} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DeleteAccountCompleteScreen;
