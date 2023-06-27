import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import * as Keychain from "react-native-keychain";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Container/LoginContainer";
import SplashScreen from "../Container/SplashScreen/SplashScreen";
import { RootState } from "../Reducers";
import { AuthAction } from "../Reducers/AuthReducer";
import { Token } from "../Types/CommonTypes";
import AppNavigation from "./AppNavigation";

const Stack = createStackNavigator();

function AppNavigationContainer() {
  return (
    <Stack.Navigator initialRouteName="Main" headerMode={"none"} mode={"card"}>
      <Stack.Screen name="main" component={AppNavigation} />
    </Stack.Navigator>
  );
}

const SplashStack = createStackNavigator();

function SplashContainer() {
  return (
    <SplashStack.Navigator headerMode={"none"}>
      <SplashStack.Screen name="SplashScreen" component={SplashScreen} />
    </SplashStack.Navigator>
  );
}

const LaunchStack = createStackNavigator();

function LaunchContainer() {
  const { isSignOut } = useSelector((state: RootState) => ({
    isSignOut: state.auth?.isSignOut,
  }));
  return (
    <LaunchStack.Navigator headerMode={"none"}>
      <LaunchStack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Sign in",
          animationTypeForReplace: isSignOut ? "pop" : "push",
        }}
      />
    </LaunchStack.Navigator>
  );
}

const ReduxNavigation = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(undefined);
  const { isSignOut } = useSelector((state: RootState) => ({
    isSignOut: state.auth?.isSignOut,
  }));

  const getAccessToken = async () => {
    try {
      return await Keychain.getInternetCredentials(Token.AccessTokenKey);
    } catch (error) {
      return undefined;
    }
  };

  React.useEffect(() => {
    setTimeout(async () => {
      let tkn = await getAccessToken();
      if (tkn) {
        setToken(tkn?.password);
        dispatch(AuthAction.signInSuccess());
      } else {
        setToken(false);
      }
    }, 3000);
  }, []);
  return <NavigationContainer>{token == undefined ? <SplashContainer /> : isSignOut ? <LaunchContainer /> : <AppNavigationContainer />}</NavigationContainer>;
};

export default ReduxNavigation;
