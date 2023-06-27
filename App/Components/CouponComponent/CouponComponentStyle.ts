import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
    ...Fonts.style.openSans14Regular,
    color: colors.h1,
  },
  radioTextSelected: {
    ...Fonts.style.openSans14Regular,
    color: colors.purple,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.shadow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  selectedRb: {
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: colors.purple,
  },
  dottedBorder: {
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  text: {
    ...Fonts.style.openSans14Bold,
  },
  dottedBorderSelected: {
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.purple,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  textSelected: {
    ...Fonts.style.openSans14Bold,
    color: colors.purple,
  },
  textDesc: {
    ...Fonts.style.openSans12Regular,
    color: colors.smoothGrey,
    width: 323,
  },
});
