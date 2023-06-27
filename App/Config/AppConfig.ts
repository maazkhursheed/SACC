import Config from "react-native-config";
import SecureConfig from "react-native-config-encrypted";

SecureConfig.configure({
  key: "4fd8a942c1b08150582fb38187cccc6c2c2c1e5827d7d93914f6d4592409d64d",
  provider: Config,
});

export default {
  allowTextFontScaling: true,
  NUMBER_OF_LINES: 500,
  IS_PRODUCTION: Config.IS_PRODUCTION === "true",
  ENVIRONMENT: Config.ENV,
  BASE_URL: SecureConfig.decrypt(Config.BSERL),
  WEB_VIEW_URL: SecureConfig.decrypt(Config.WBVWRL),
  CLIENT_ID: SecureConfig.decrypt(Config.CLNTID),
  CLIENT_SECRET: SecureConfig.decrypt(Config.CLNTSCRT),
  SUPPORT_EMAIL: SecureConfig.decrypt(Config.SPRTMAL),
  GRANT_TYPE: SecureConfig.decrypt(Config.GRNTTYP),
  GRANT_TYPE_GUEST: SecureConfig.decrypt(Config.GRNTTYPGST),
};
