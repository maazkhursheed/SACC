import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import GoogleSvg from "../../Images/googleIcon/google.svg";
import { BottomFixedButton } from "../index";
import styles from "./SocialMediaLoginStyle";
export interface GoogleButtonProps {
  onPress?: () => void;
}
const GoogleButton: React.SFC<GoogleButtonProps> = ({ onPress }: GoogleButtonProps) => {
  useEffect(() => {
    GoogleSignin
      .configure
      //   {
      // webClientId: "74706937438-cib077b090s7opgtahv9ot5p6p4a6hm7.apps.googleusercontent.com",
      // }
      ();
  }, []);

  const signGoogleIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      console.log("error: ", error);
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
    return false;
  };

  const googleLogin = async () => {
    const data = await signGoogleIn();
    if (data) {
      const form = {
        firstName: data?.user?.givenName,
        lastName: data?.user?.familyName,
        email: data?.user?.email,
        googleId: data?.user?.id,
        imageUrl: data?.user?.photo,
      };
      // makeLogin(form);
    }
  };

  return <BottomFixedButton onPress={() => googleLogin()} style={styles.iconWraaper} SVGIcon={GoogleSvg} svgstyle={{ width: 45, height: 45 }} />;
};

export default GoogleButton;
