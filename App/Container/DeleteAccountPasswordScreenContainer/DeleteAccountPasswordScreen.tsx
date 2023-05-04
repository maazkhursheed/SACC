import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, Text, View } from "react-native";
import * as Yup from "yup";
import { Colors } from "~root/Themes";
import CustomButtons from "../../Components/CustomButtons/CustomButtons";
import CustomTextInput from "../../Components/CustomTextInput";
import SmallHeader from "../../Components/SmallHeader/SmallHeader";
import closeEye from "../../Images/closeEye/CloseEye.svg";
import openEye from "../../Images/openEye/OpenEye.svg";
import styles from "./DeleteAccountPasswordScreenStyles";

const DeleteAccountPasswordScreen = () => {
  const { t } = useTranslation();
  const validationSchema = Yup.object().shape({
    username: Yup.string().email().required(t("UsernameValidation")),
    password: Yup.string().required(t("PasswordValidation")),
  });
  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
  });
  const [showPasswordField, setShowPasswordField] = useState(false);
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
              inputwrapperStyle={[styles.inputwrapperStyle, formik.errors.username && { borderColor: Colors.pink }]}
            />
          </View>
        </View>
        <View style={styles.ButtonWrapper}>
          <CustomButtons buttonText1={t("CANCEL")} buttonText2={t("PROCEED")} navigateTo="DeleteAc" />
        </View>
      </View>
    </>
  );
};

export default DeleteAccountPasswordScreen;
