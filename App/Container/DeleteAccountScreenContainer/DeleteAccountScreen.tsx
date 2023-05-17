import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import CustomButtons from "../../Components/CustomButtons/CustomButtons";
import SmallHeader from "../../Components/SmallHeader/SmallHeader";
import { returnBearer } from "../../Lib/ProfileHelper";
import { AuthAction } from "../../Reducers/AuthReducer";
import { getPassword, getToken } from "../../utils";
import Styles from "./DeleteAccountScreenStyles";

const DeleteAccountScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pass, getPass] = useState();
  const [token, getAuthToken] = useState();

  useEffect(() => {
    (async () => {
      const authToken = await getToken();
      const passwordVal = await getPassword();
      getAuthToken(authToken);
      getPass(passwordVal);
    })();
  }, []);

  const TextComponent = () => {
    return (
      <View style={Styles.TextContainer}>
        <Text style={Styles.text1}>{t("DeleteAccountText1")}</Text>
        <Text style={Styles.text2}>{t("DeleteAccountText2")}</Text>
      </View>
    );
  };

  const handleOnSubmit = async () => {
    dispatch(
      AuthAction.deleteAccount(
        { username: pass?.username, auth: returnBearer(token?.password) },
        {
          onSuccess: () => {
            navigation.navigate("DeleteAcComplete");
          },
          onFailure: () => {
            Alert.alert(t("login.errorTitle"));
          },
        },
      ),
    );
  };

  return (
    <SafeAreaView style={Styles.Backround}>
      <SmallHeader title={t("DeleteAccountTitle")} />
      <View style={Styles.Container}>
        <TextComponent />
        <View style={Styles.ButtonContainer}>
          <CustomButtons buttonText1={t("CANCEL")} buttonText2={t("DELETE")} onSubmit={handleOnSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAccountScreen;
