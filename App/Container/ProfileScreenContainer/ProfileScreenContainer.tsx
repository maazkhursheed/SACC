import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Config from "react-native-config";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import * as Keychain from "react-native-keychain";
import { useDispatch } from "react-redux";
import { CustomWebView, LanguageModal } from "../../Components";
import Divider from "../../Components/Divider";
import NavListItemButton from "../../Components/NavListItemButton/NavListItemButton";
import { getSelectedLanguage } from "../../i18n";
import { encodingBase64 } from "../../Lib/ProfileHelper";
import { AuthAction } from "../../Reducers/AuthReducer";
import { Token } from "../../Types/CommonTypes";
import { getPassword } from "./../../utils";
import styles from "./ProfileScreenStyles";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [orderWebview, setOrderWebView] = useState(false);
  const [profileWebview, setProfileWebView] = useState(false);
  const [updatePassWebview, setUpdatePassWebView] = useState(false);
  const [updateEmailWebview, setUpdateEmailWebView] = useState(false);
  const [addressWebview, setAddressWebView] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pass, getPass] = useState();

  useEffect(() => {
    (async () => {
      const passwordVal = await getPassword();

      getPass(passwordVal);
    })();
  }, []);

  const onCloseLangModal = () => {
    setIsVisible(!isVisible);
  };
  const handleLogout = dispatch => {
    Keychain.resetInternetCredentials(Token.AccessTokenKey);
    Keychain.resetInternetCredentials(Token.RefreshTokenKey);
    dispatch(AuthAction.signOut());
  };

  const ProfileHeader: React.SFC = () => <Text style={styles.welcomeHeader}>{t("welcome") + t("user")}</Text>;
  const LinksHeading: React.SFC = ({ heading }) => <Text style={styles.quickLinksHeading}>{heading}</Text>;
  const QuickLinks: React.SFC = () => {
    return (
      <View>
        <LinksHeading heading={t("myAccount")} />
        <NavListItemButton onPress={() => {}} btnText={t("myWishList")} />
        <NavListItemButton
          onPress={() => {
            setOrderWebView(true);
          }}
          btnText={t("orderHistory")}
        />
        <NavListItemButton onPress={() => {}} btnText={t("supportTickets")} />
        <NavListItemButton
          onPress={() => {
            setProfileWebView(true);
          }}
          btnText={t("personalDetails")}
        />
      </View>
    );
  };
  const MyAccounts: React.SFC = () => {
    return (
      <View>
        <LinksHeading heading={t("settings")} />
        <NavListItemButton
          onPress={() => {
            setUpdatePassWebView(true);
          }}
          btnText={t("changePassword")}
        />
        <NavListItemButton
          onPress={() => {
            setUpdateEmailWebView(true);
          }}
          btnText={t("updateEmailAddress")}
        />
        <NavListItemButton
          onPress={() => {
            setAddressWebView(true);
          }}
          btnText={t("addressBook")}
        />
        <NavListItemButton onPress={() => navigation.navigate("DeleteAccountContainer")} btnText={t("deleteAccount")} />
      </View>
    );
  };
  const ChangeLanguage: React.SFC = () => {
    return (
      <View>
        <LinksHeading heading={t("ChangeLang")} />
        <TouchableOpacity style={styles.changeLangContainer} onPress={onCloseLangModal}>
          <Image source={getSelectedLanguage()?.image} />
          <Text style={styles.langText}>{getSelectedLanguage()?.label}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ProfileHeader />
      <Divider style={styles.divider} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <QuickLinks />
        <Divider style={styles.divider} />
        <MyAccounts />
        <Divider style={styles.divider} />
        <ChangeLanguage />
      </ScrollView>
      {isVisible && <LanguageModal visible={isVisible} onClose={onCloseLangModal} />}
      <Button
        title={t("signOut")}
        containerStyle={styles.signOutContainer}
        titleStyle={styles.signOutTitle}
        buttonStyle={styles.signOutBtn}
        onPress={() => {
          const title = t("hello");
          const logout = t("logOut");
          const cancel = t("Cancel");
          const OK = t("Ok");
          Alert.alert(title, logout, [
            {
              text: cancel,
              onPress: () => {},
              style: "cancel",
            },
            {
              text: OK,
              onPress: () => {
                handleLogout(dispatch);
              },
            },
          ]);
        }}
      />
      {orderWebview && (
        <CustomWebView
          source={{
            uri: Config.WEB_VIEW_URL + "orders?source=Mobile",
            headers: {
              Authorization: "Basic " + encodingBase64(pass?.username, pass?.password),
            },
          }}
          visible={orderWebview}
          onStatechanges={() => {}}
          closeSheet={() => setOrderWebView(false)}
          isHeader={true}
        />
      )}
      {profileWebview && (
        <CustomWebView
          source={{
            uri: Config.WEB_VIEW_URL + "update-profile?source=Mobile",
            headers: {
              Authorization: "Basic " + encodingBase64(pass?.username, pass?.password),
            },
          }}
          visible={profileWebview}
          onStatechanges={() => {}}
          closeSheet={() => setProfileWebView(false)}
          isHeader={true}
        />
      )}
      {updatePassWebview && (
        <CustomWebView
          source={{
            uri: Config.WEB_VIEW_URL + "update-password?source=Mobile",
            headers: {
              Authorization: "Basic " + encodingBase64(pass?.username, pass?.password),
            },
          }}
          visible={updatePassWebview}
          onStatechanges={() => {}}
          closeSheet={() => setUpdatePassWebView(false)}
          isHeader={true}
        />
      )}
      {updateEmailWebview && (
        <CustomWebView
          source={{
            uri: Config.WEB_VIEW_URL + "update-email?source=Mobile",
            headers: {
              Authorization: "Basic " + encodingBase64(pass?.username, pass?.password),
            },
          }}
          visible={updateEmailWebview}
          onStatechanges={() => {}}
          closeSheet={() => setUpdateEmailWebView(false)}
          isHeader={true}
        />
      )}
      {addressWebview && (
        <CustomWebView
          source={{
            uri: Config.WEB_VIEW_URL + "address-book?source=Mobile",
            headers: {
              Authorization: "Basic " + encodingBase64(pass?.username, pass?.password),
            },
          }}
          visible={addressWebview}
          onStatechanges={() => {}}
          closeSheet={() => setAddressWebView(false)}
          isHeader={true}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
