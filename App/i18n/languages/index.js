import en from "./en.json";
import ar from "./ar.json";
import hn from "./hindi.json";

export const LANGUAGESDATA = [
  { code: "en", label: "English", direction: "ltr", image: require("./../../Images/ChangeLanguage/english.png") },
  { code: "ar", label: "عربي", direction: "rtl", image: require("./../../Images/ChangeLanguage/changeLang.png") },
];

export default LANGUAGES = {
  en,
  ar,
};
