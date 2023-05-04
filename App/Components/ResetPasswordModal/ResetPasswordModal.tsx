import { useFormik } from "formik";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Modal, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { Colors } from "~root/Themes";
import CloseButton from "../../Images/closeButton/CloseButton.svg";
import { BottomFixedButton, CustomTextInput } from "../index";
import styles from "./ResetPasswordModalStyle";
export interface ResetPasswordModalProps {
  heading?: string;
  msg?: string;
  visible?: boolean;
  onButton2Press?: () => void;
  onButton1Press?: (email: object) => void;
  button1Text?: string;
  button2Text?: string;
  onclose?: () => void;
  SVGIcon?: any;
  svgstyle?: any;
}

const ResetPasswordModal: React.SFC<ResetPasswordModalProps> = ({
  button1Text,
  button2Text,
  heading,
  msg,
  visible,
  onButton1Press,
  onButton2Press,
  onclose,
  SVGIcon,
  svgstyle,
}: ResetPasswordModalProps) => {
  const { t } = useTranslation();
  const [onClickNext, setOnClickNext] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter a valid email"),
  });
  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      email: "",
    },
    validationSchema,
  });

  useEffect(() => {
    formik.validateForm();
  }, []);

  const onclickResetLink = () => {
    setOnClickNext(true);
    if (R.isEmpty(formik.errors)) {
      Keyboard.dismiss();
      onButton1Press(formik.values);
    }
  };
  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onclose} visible={visible}>
      {visible && <View style={styles.semiTransparentView} />}
      {visible && (
        <View style={styles.container}>
          <View style={styles.contentView}>
            <View style={styles.headingWrapper}>
              {heading && <Text style={styles.heading}>{heading}</Text>}
              {SVGIcon && (
                <TouchableOpacity onPress={onclose} style={{ padding: 5 }}>
                  <SVGIcon alignSelf={"center"} width={svgstyle?.width ?? 20} height={svgstyle?.height ?? 20} />
                </TouchableOpacity>
              )}
            </View>
            {msg ? <Text style={styles.warningMessage}>{msg}</Text> : <></>}
            <CustomTextInput
              label={t("login.enterEmail")}
              inputLabelStyle={styles.inputLabelStyle}
              placeholder={t("login.enterEmail")}
              value={formik.values.email}
              onChangeHandler={value => formik.setFieldValue("email", value)}
              returnKeyType={"next"}
              autoCapitalize={"none"}
              onSubmitEditing={() => {}}
              textInputStyle={styles.inputTextStyle}
              placeholderTextColor={Colors.darkGrey}
              SVGIcon={CloseButton}
              error={onClickNext && formik.errors.email}
              inputwrapperStyle={[styles.inputwrapperStyle, onClickNext && formik.errors.email && { borderColor: Colors.pink }]}
              autoFocus={true}
            />
            {onButton1Press && button1Text && <BottomFixedButton onPress={onclickResetLink} btnText={button1Text} style={styles.bottomBtnContaiber} />}
            {onButton2Press && button2Text && <BottomFixedButton onPress={onButton2Press} btnText={button2Text} style={styles.bottomBtnContaiber} />}
          </View>
        </View>
      )}
    </Modal>
  );
};

export default ResetPasswordModal;
