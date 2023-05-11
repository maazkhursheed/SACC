import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, I18nManager, Image, Modal, SafeAreaView, Text, TouchableOpacity } from "react-native";
import RNRestart from "react-native-restart";
import { LANGUAGESDATA } from "../../i18n/languages";
import styles from "./langModalStyle";
export interface LanguageModalProps {
  visible?: boolean;
  onClose?: () => void;
}
const LanguageModal: React.SFC<LanguageModalProps> = ({ visible, onClose }: LanguageModalProps) => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const setLanguage = async selLanguage => {
    if (selLanguage?.direction === "rtl") {
      callChangeLanguageAlert(selLanguage, true);
    } else {
      const savedLang = await AsyncStorage.getItem("selLanguage");
      const langData = savedLang ? JSON.parse(savedLang) : undefined;
      if (langData && langData?.direction === "rtl") {
        callChangeLanguageAlert(selLanguage, false);
      } else {
        await AsyncStorage.setItem("selLanguage", JSON.stringify(selLanguage));
        return i18n.changeLanguage(selLanguage?.code);
      }
    }
  };

  const callChangeLanguageAlert = (data, isRtl) => {
    const title = t("hello");
    const restartApp = t("restartApp");
    const cancel = t("Cancel");
    const OK = t("Ok");
    Alert.alert(title, restartApp, [
      {
        text: cancel,
        onPress: () => {},
        style: "cancel",
      },
      {
        text: OK,
        onPress: () => {
          AsyncStorage.setItem("selLanguage", JSON.stringify(data))
            .then(r => {
              i18n.changeLanguage(data?.code);
              I18nManager.forceRTL(isRtl);
              setTimeout(() => {
                RNRestart.Restart();
                return;
              }, 500);
            })
            .catch(e => {
              console.log("error: ", e);
            });
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const selectedLanguage = item.code === selectedLanguageCode;
    return (
      <TouchableOpacity key={item.code} style={[styles.changeLangContainer]} disabled={selectedLanguage} onPress={() => setLanguage(item)}>
        <Image source={item?.image} />
        <Text style={[selectedLanguage ? styles.selectedText : styles.text]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal visible={visible} animationType={"slide"} transparent={true} onRequestClose={onClose}>
      <SafeAreaView style={styles.mainContainer}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={{ textAlign: "left" }}>{t("close")}</Text>
        </TouchableOpacity>
        {LANGUAGESDATA && <FlatList data={LANGUAGESDATA} renderItem={item => renderItem(item)} keyExtractor={(item, index) => index.toString()} />}
      </SafeAreaView>
    </Modal>
  );
};

export default LanguageModal;
