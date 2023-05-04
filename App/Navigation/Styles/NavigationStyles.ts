import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes/index";

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
  },
  tabBarStyle: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopColor: "transparent",
    backgroundColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 3,
  },
  tabBarLabelStyle: {
    ...Fonts.style.openSans12Regular,
  },
  tabBarIconStyle: {
    marginTop: 7,
  },
});
