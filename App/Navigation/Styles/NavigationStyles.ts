import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes/index";

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
  },
  tabBarLabelStyle: {
    ...Fonts.style.openSans12Regular,
  },
  tabBarIconStyle: {
    marginTop: 7,
  },
});
