import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LANGUAGES, { LANGUAGESDATA } from "./languages";
import RNLocalize from "react-native-localize";
import { Images } from "../Themes";

let selLanguage = {};
const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR = {
  type: "languageDetector",
  async: true,
  detect: callback => {
    AsyncStorage.getItem("user-language", (err, language) => {
      selLanguage = language
        ? LANGUAGESDATA.filter(function (obj) {
            return obj.code == language;
          })
        : [{ code: "en", label: "English", direction: "ltr", image: require("./../Images/ChangeLanguage/changeLang.png") }];
      if (err || !language) {
        if (err) {
          console.log("Error fetching Languages from asyncstorage ", err);
        } else {
          console.log("No language is set, choosing English as fallback");
        }
        const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(LANG_CODES);
        callback(findBestAvailableLanguage.languageTag || "en");
        callback("en");
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: language => {
    AsyncStorage.setItem("user-language", language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

const localizeImage = imageName => {
  if (selLanguage?.[0]?.direction == "rtl") {
    return Images[`${imageName}_ar`];
  }
  return Images[imageName];
};

const isRTL = () => {
  return selLanguage?.[0]?.direction == "rtl" ? "rtl" : "ltr";
};

const getSelectedLanguage = () => {
  return selLanguage?.[0];
};

function getStringWithArguments(key, value, args) {
  let translation = selLanguage?.[0]?.code === "en" ? LANGUAGES?.en?.translation[key] : LANGUAGES?.ar?.translation[key];
  if (translation != "" && translation != undefined && translation != null) {
    Object.entries(args).forEach(([replacementKey, replacementValue]) => {
      translation = translation.replace(`%{${replacementKey}}`, replacementValue);
      if (isRTL() === "rtl") {
        translation = translation.replace(`{${replacementKey}}%`, replacementValue);
      }
    });
  } else {
    translation = key;
  }
  return translation;
}

export { isRTL, getSelectedLanguage, localizeImage, getStringWithArguments };

export default i18n;
