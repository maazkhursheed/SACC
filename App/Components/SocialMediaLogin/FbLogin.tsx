import React, { useState } from "react";
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from "react-native-fbsdk";
import FacebookSvg from "../../Images/facebbokIcon/facebook.svg";
import { BottomFixedButton } from "../index";
import styles from "./SocialMediaLoginStyle";
export interface FbLoginProps {
  onPress?: () => void;
  onSocialMediaClick: () => void;
}
const FbLogin: React.SFC<FbLoginProps> = ({ onPress, onSocialMediaClick }: FbLoginProps) => {
  const [userInfo, setuserInfo] = useState({});

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setuserInfo({});
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "email,name,first_name,last_name",
      },
    };
    const profileRequest = new GraphRequest("/me", { token, parameters: PROFILE_REQUEST_PARAMS }, (error, user) => {
      if (error) {
        console.log("login info has error: " + error);
      } else {
        setuserInfo(user);
      }
    });
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["email", "public_profile", "user_friends"]).then(
      login => {
        if (login.isCancelled) {
          // console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        // console.log("Login fail with error: " + error);
      },
    );
  };

  const isLogin = userInfo.name;

  const buttonText = isLogin ? "Logout With Facebook" : "Login From Facebook";

  // const onPressButton = isLogin ? logoutWithFacebook : loginWithFacebook; will use it later

  return <BottomFixedButton onPress={onSocialMediaClick} style={styles.iconWraaper} SVGIcon={FacebookSvg} svgstyle={{ width: 45, height: 45 }} />;
};

export default FbLogin;
