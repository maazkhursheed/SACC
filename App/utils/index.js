import * as Keychain from "react-native-keychain";
import { Token } from "../Types/CommonTypes";
export const setToken = async (action, response) => {
  try {
    await Keychain.setInternetCredentials(Token.AccessTokenKey, action.payload.username, response?.data?.access_token);
    if (response?.data?.refresh_token) {
      await Keychain.setInternetCredentials(Token.RefreshTokenKey, action.payload.username, response?.data?.refresh_token);
    }
  } catch (error) {}
};

export const setPassword = async action => {
  try {
    await Keychain.setInternetCredentials(Token.PasswordTokenKey, action.payload.username, action.payload.password);
  } catch (error) {}
};

export const setAnonymousToken = async (action, response) => {
  try {
    await Keychain.setInternetCredentials(Token.AccessTokenKey, "annonymous", response?.data?.access_token);
  } catch (error) {}
};

export const getToken = async () => {
  try {
    return await Keychain.getInternetCredentials(Token.AccessTokenKey);
  } catch (error) {}
};

export const getPassword = async () => {
  try {
    return await Keychain.getInternetCredentials(Token.PasswordTokenKey);
  } catch (error) {}
};

export const removeToken = async () => {
  try {
    await Keychain.resetInternetCredentials(Token.AccessTokenKey);
    await Keychain.resetInternetCredentials(Token.RefreshTokenKey);
  } catch (error) {}
};
