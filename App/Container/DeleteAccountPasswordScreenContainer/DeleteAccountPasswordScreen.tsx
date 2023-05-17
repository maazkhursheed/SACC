import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, SafeAreaView, Text, View } from "react-native";
import * as Yup from "yup";
import { Colors } from "~root/Themes";
import CustomButtons from "../../Components/CustomButtons/CustomButtons";
import CustomTextInput from "../../Components/CustomTextInput";
import SmallHeader from "../../Components/SmallHeader/SmallHeader";
import closeEye from "../../Images/closeEye/CloseEye.svg";
import openEye from "../../Images/openEye/OpenEye.svg";
import { getPassword } from "../../utils";
import styles from "./DeleteAccountPasswordScreenStyles";

const DeleteAccountPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [pass, getPass] = useState();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t("PasswordValidation")),
  });
  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      password: "",
    },
    validationSchema,
  });

  useEffect(() => {
    (async () => {
      const passwordVal = await getPassword();
      getPass(passwordVal);
    })();
  }, []);

  const handleOnSubmit = async () => {
    Keyboard.dismiss();
    if (formik.values.password === pass?.password) {
      navigation.navigate("DeleteAc");
    } else {
      Alert.alert(t("login.errorTitle"));
    }
  };

  return (
    <>
      <SafeAreaView style={styles.Background}>
        <SmallHeader title={t("DeleteAccountTitle")} />
      </SafeAreaView>
      <View style={styles.BackgroundContiner}>
        <View>
          <Text style={styles.TextWrap1}>{t("DeleteAccountPasswordText1")}</Text>
          <View style={styles.InputPasswordWrapper}>
            <CustomTextInput
              label={t("login.password")}
              inputLabelStyle={styles.inputLabelStyle}
              placeholder={t("login.password")}
              secureTextEntry={!showPasswordField}
              showPasswordField={showPasswordField}
              autoCapitalize={"none"}
              handleShowPassword={value => setShowPasswordField(value)}
              SVGIcon={showPasswordField ? openEye : closeEye}
              value={formik.values.password}
              onChangeHandler={value => formik.setFieldValue("password", value)}
              showClearButton={false}
              refKey={"password"}
              textInputStyle={styles.inputTextStyle}
              placeholderTextColor={Colors.darkGrey}
              autoCorrect={false}
              error={formik.errors.password}
              inputwrapperStyle={[styles.inputwrapperStyle]}
            />
          </View>
        </View>
        <View style={styles.ButtonWrapper}>
          <CustomButtons buttonText1={t("CANCEL")} buttonText2={t("PROCEED")} onSubmit={handleOnSubmit} />
        </View>
      </View>
    </>
  );
};

export default DeleteAccountPasswordScreen;
