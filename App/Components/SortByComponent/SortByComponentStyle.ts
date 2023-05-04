import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  title: {
    ...Fonts.style.openSans16SemiBold,
  },
  crossIcon: {
    width: 20,
    height: 20,
    ...Fonts.style.openSans16SemiBold,
  },
});
