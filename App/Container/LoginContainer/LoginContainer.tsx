import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, KeyboardAvoidingView, Linking, Platform, SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { CustomTextInput, CustomWebView, SocialMediaLogin } from "../../Components";
import BottomFixedButtonWithTouchOpacity from "../../Components/BottomFixedButtonWithTouchOpacity/BottomFixedButtonWithTouchOpacity";
import LoadingView from "../../Components/LoadingView/LoadingView";
import MainHeader from "../../Components/MainHeader/MainHeader";
import ResetPasswordModal from "../../Components/ResetPasswordModal/ResetPasswordModal";
import AppConfig from "../../Config/AppConfig";
import { getSelectedLanguage } from "../../i18n";
import CloseButton from "../../Images/closeButton/CloseButton.svg";
import closeEye from "../../Images/closeEye/CloseEye.svg";
import openEye from "../../Images/openEye/OpenEye.svg";
import { isDisplayWithNotch } from "../../Lib/CommonHelper";
import { inputs } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import { AuthAction } from "../../Reducers/AuthReducer";
import { CartAction } from "../../Reducers/CartReducer";
import { Colors } from "../../Themes";
import styles from "./LoginStyles";

const Login = () => {
  const dispatch = useDispatch();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [onClickNext, setOnClickNext] = useState(false);
  const [webview, setWebView] = useState(false);
  const [socialWebView, setSocialWebView] = useState(false);
  const [forgetPasswebview, setForgetPassWebView] = useState(false);
  const { t } = useTranslation();
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state.auth?.isLoading,
  }));
  const validationSchema = Yup.object().shape({
    username: Yup.string().email().required("Username cannot be empty"),
    password: Yup.string().required("Password field cannot be empty"),
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

  useEffect(() => {
    dispatch(CartAction.clearCart());
    // formik.validateForm();
  }, []);

  const handleOnSubmit = async () => {
    setOnClickNext(true);
    Keyboard.dismiss();
    dispatch(
      AuthAction.signIn(formik.values, {
        onSuccess: () => {},
        onFailure: (error: string) => {
          Alert.alert(t("login.errorTitle"), error, [{ text: t("Cancel") }], { cancelable: true });
        },
      }),
    );
  };

  const handleDirectLogin = async () => {
    setOnClickNext(true);
    Keyboard.dismiss();
    dispatch(
      AuthAction.signInDirect(formik.values, {
        onSuccess: () => {},
        onFailure: (error: string) => {
          Alert.alert(t("login.errorTitle"), error, [{ text: t("Cancel") }], { cancelable: true });
        },
      }),
    );
  };

  const onSubmitEditing = id => {
    inputs[id] ? inputs[id].focus() : null;
  };

  const onStatechanges = event => {
    if (
      Platform.OS === "ios" &&
      event?.loading &&
      event?.navigationType == "formsubmit" &&
      event?.title === "register | Skysales SA Site" &&
      event?.url === AppConfig.WEB_VIEW_URL
    ) {
      setWebView(false);
      return true;
    } else if (Platform.OS === "android" && event?.loading && event?.target == 245 && event?.url === AppConfig.WEB_VIEW_URL) {
      setWebView(false);
      return true;
    } else {
      return false;
    }
  };
  const onSocialMediaClick = () => {
    setSocialWebView(true);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.mainContainer}
        behavior={Platform.select({ android: "", ios: "padding" })}
        keyboardVerticalOffset={Platform.OS === "ios" ? (isDisplayWithNotch() ? 44 : 20) : 0}
        enabled
      >
        <MainHeader isHam={false} isSearch={false} />
        <ScrollView showsVerticalScrollIndicator={true}>
          <SafeAreaView style={styles.container}>
            <View style={styles.emailPassContainer}>
              <View style={styles.headerSection}>
                <View style={styles.loginHeaderWrapper}>
                  <Text style={styles.loginHeaderText}>{t("login.login")}</Text>
                  <Text style={styles.loginSubText}>{t("login.enterEmailAndPass")}</Text>
                </View>
              </View>
              <View style={styles.inputeSectionWrapper}>
                <CustomTextInput
                  label={t("login.enterEmail")}
                  inputLabelStyle={styles.inputLabelStyle}
                  placeholder={t("login.enterEmail")}
                  value={formik.values.username}
                  onChangeHandler={value => formik.setFieldValue("username", value)}
                  returnKeyType={"next"}
                  autoCapitalize={"none"}
                  onSubmitEditing={() => onSubmitEditing("password")}
                  textInputStyle={styles.inputTextStyle}
                  placeholderTextColor={Colors.darkGrey}
                  SVGIcon={CloseButton}
                  inputwrapperStyle={[styles.inputwrapperStyle, onClickNext && formik.errors.username && { borderColor: Colors.pink }]}
                  autoFocus={true}
                />
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
                  inputwrapperStyle={[styles.inputwrapperStyle, onClickNext && formik.errors.username && { borderColor: Colors.pink }]}
                />
                {isLoading && <LoadingView style={styles.loading} isLoading={isLoading} hideViewOnLoading={true} />}
                <Text style={[styles.clickHere, styles.forgotPass]} onPress={() => setForgetPassWebView(true)}>
                  {t("login.forgotPassword")}
                </Text>
                <BottomFixedButtonWithTouchOpacity
                  onPress={handleOnSubmit}
                  btnText={t("login.login")}
                  isFooter={true}
                  style={styles.bottomBtnContaiber}
                  textStyle={styles.textStyles}
                  touchDisabled={isLoading ? true : false}
                />
              </View>
              <BottomFixedButtonWithTouchOpacity
                onPress={handleDirectLogin}
                btnText={t("guestLogin")}
                isFooter={true}
                style={styles.bottomBtnContaiber}
                textStyle={styles.textStyles}
                touchDisabled={isLoading ? true : false}
              />
              <SocialMediaLogin
                onSocialMediaClick={() => {
                  Linking.openURL(AppConfig.WEB_VIEW_URL + `login?lang=${getSelectedLanguage()?.code}`);
                }}
              />
              <Text style={styles.disclosureAccountStyle}>
                {t("login.dontHaveAccount")}{" "}
                <Text style={styles.clickHere} onPress={() => setWebView(true)}>
                  {t("login.createAccount")}
                </Text>
              </Text>
            </View>
            {showResetModal && (
              <ResetPasswordModal
                onclose={() => {
                  setShowResetModal(false);
                }}
                heading={"Reset Password"}
                msg={"Please enter your account email address. Instructions on how to reset your password will be send to this address"}
                iconName={"alert-icon"}
                visible={showResetModal}
                button1Text="RESET PASSWORD"
                onButton1Press={values => {
                  setShowResetModal(false);
                }}
                SVGIcon={CloseButton}
                svgstyle={styles.svgStyle}
              />
            )}
            {webview && (
              <CustomWebView
                source={{
                  uri: AppConfig.WEB_VIEW_URL + `register?lang=${getSelectedLanguage()?.code}`,
                }}
                visible={webview}
                onStatechanges={onStatechanges}
                closeSheet={() => setWebView(false)}
                isHeader={true}
              />
            )}
            {socialWebView && (
              <CustomWebView
                source={{
                  uri: AppConfig.WEB_VIEW_URL + `login?lang=${getSelectedLanguage()?.code}`,
                }}
                visible={socialWebView}
                onStatechanges={onStatechanges}
                closeSheet={() => setSocialWebView(false)}
                isHeader={true}
              />
            )}
            {forgetPasswebview && (
              <CustomWebView
                source={{
                  uri: AppConfig.WEB_VIEW_URL + `login?lang=${getSelectedLanguage()?.code}`,
                }}
                visible={forgetPasswebview}
                onStatechanges={onStatechanges}
                closeSheet={() => setForgetPassWebView(false)}
                isHeader={true}
              />
            )}
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
