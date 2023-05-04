import React from "react";
import { Linking, Text } from "react-native";
import AppConfig from "~root/Config/AppConfig";
import { Colors } from "~root/Themes";

export interface IAlertCallbacks {
  onSuccess?: (...args: any) => void;
  onFailure?: (...args: any) => void;
}
// Text constants used in the code
export const genericErrorMessageWithoutEmail = "Oops! Something went wrong. If problem persists, contact us at ";
export const OKButton = "OK";
export const netErrMsg = "Oh No! We have lost internet connection while you were in the App, please connect to internet and retry.";
export enum ERROR_ELEMENTS {
  ERROR_GENERIC_ELEMENT = "ERROR_GENERIC_ELEMENT",
  ERROR_503_ELEMENT = "ERROR_503_ELEMENT",
}

export const getModalContent = (element: any) => {
  switch (element) {
    case ERROR_ELEMENTS.ERROR_GENERIC_ELEMENT:
      return ERROR_GENERIC_ELEMENT;
    case ERROR_ELEMENTS.ERROR_503_ELEMENT:
      return ERROR_503_ELEMENT;
    default:
      return null;
  }
};
// This is generic error message with email
export const ERROR_GENERIC_ELEMENT = (
  <Text
    style={{
      alignSelf: "flex-start",
      marginBottom: 20,
      fontSize: 14,
      color: Colors.wedgeBlue,
    }}
  >
    {genericErrorMessageWithoutEmail}
    <Text style={{ color: Colors.facebook }} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}>
      {"\n" + AppConfig.SUPPORT_EMAIL}
    </Text>
  </Text>
);

// This error message used when there is a server unavailability or there is a problem from server side
export const ERROR_503_ELEMENT = (
  <Text
    style={{
      alignSelf: "flex-start",
      marginBottom: 20,
      color: Colors.wedgeBlue,
      fontSize: 16,
      // ...Fonts.style.subtitleLowlight,
    }}
  >
    Service unavailable, try again later. If the problem persists, please contact
    <Text style={{ color: Colors.facebook }} onPress={() => Linking.openURL(`mailto:${AppConfig.SUPPORT_EMAIL}`)}>
      {"\n" + AppConfig.SUPPORT_EMAIL}
    </Text>
  </Text>
);

export const showAlertMessage = (title: string, subTitle: string, dispatchAlert) => {
  dispatchAlert?.({
    heading: title,
    msg: subTitle,
    visible: true,
    button1Text: OKButton,
    onButton1Press: () => {
      dispatchAlert?.({ visible: false });
    },
  });
};

export const BoldText = ({ children }) => {
  return (
    <Text
      style={{
        // fontFamily: Fonts.type.OpenSansBold,
        fontSize: 12,
      }}
    >
      {children}
    </Text>
  );
};
