import Aes from "react-native-aes-crypto";
import Config from "react-native-config";

export const GetConstants = async (decryptInput: string) => {
  const decryptData = (encryptedData, key) => Aes.decrypt(encryptedData.cipher, key, encryptedData.iv, "aes-256-cbc");
  try {
    const spiltData = decryptInput.split(" ");
    const cipher = spiltData[0];
    const iv = spiltData[1];
    const key = "4fd8a942c1b08150582fb38187cccc6c2c2c1e5827d7d93914f6d4592409d64d";
    const text = await decryptData({ cipher, iv }, key);
    if (text !== null) {
      return text;
    } else {
      return "Error";
    }
  } catch (e) {
    return "Error";
  }
};

const AppConfig: AppConfig = {
  allowTextFontScaling: true,
  NUMBER_OF_LINES: 500,
  IS_PRODUCTION: Config.IS_PRODUCTION === "true",
  ENVIRONMENT: Config.ENVIRONMENT,
};

export const initializeAppConfig = async () => {
  AppConfig.CCV2_ENDPOINT = await GetConstants(Config.CCV2_ENDPOINT);
  AppConfig.SUPPORT_EMAIL = await GetConstants(Config.SUPPORT_EMAIL);
};
export default AppConfig;

export interface AppConfig {
  ENVIRONMENT: string;
  allowTextFontScaling: boolean;
  IS_PRODUCTION: boolean;
  NUMBER_OF_LINES: number;
  CCV2_ENDPOINT?: string;
  SUPPORT_EMAIL?: string;
}
