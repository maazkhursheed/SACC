import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  text: {
    ...Fonts.style.openSans12Regular,
  },

  mainContainer: {
    flexDirection: "row",
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  view1: {
    flex: 1,
    marginRight: 2,
    borderRightColor: colors.grey,
    borderRightWidth: 1,
  },
  view2: {
    flex: 1,
  },
});
