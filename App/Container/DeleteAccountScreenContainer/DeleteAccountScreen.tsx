import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import CustomButtons from "../../Components/CustomButtons/CustomButtons";
import SmallHeader from "../../Components/SmallHeader/SmallHeader";
import Styles from "./DeleteAccountScreenStyles";

const DeleteAccountScreen = () => {
  const { t } = useTranslation();

  const TextComponent = () => {
    return (
      <View style={Styles.TextContainer}>
        <Text style={Styles.text1}>{t("DeleteAccountText1")}</Text>
        <Text style={Styles.text2}>{t("DeleteAccountText2")}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={Styles.Backround}>
      <SmallHeader title={t("DeleteAccountTitle")} />
      <View style={Styles.Container}>
        <TextComponent />
        <View style={Styles.ButtonContainer}>
          <CustomButtons buttonText1={t("CANCEL")} buttonText2={t("DELETE")} navigateTo="DeleteAcComplete" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccountScreen;
