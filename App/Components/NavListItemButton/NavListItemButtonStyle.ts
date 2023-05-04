import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";

const commonButton = {
  justifyContent: "center",
  shadowColor: "transparent",
  flexDirection: "row",
  paddingHorizontal: 10,
};

export default StyleSheet.create({
  mainContainer: { paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  textStyle: { ...Fonts.style.openSans14Regular, alignSelf: "center" },
});
