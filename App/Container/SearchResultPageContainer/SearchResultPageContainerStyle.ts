import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainerStyle: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  productCountStyle: {
    paddingLeft: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    ...Fonts.style.openSans12Regular,
    textAlign: "left",
  },
  Background: {
    backgroundColor: colors.black,
  },
  loadingView: { height: 75, width: "100%" },
  noMatchTxtContainer: {
    flex: 1,
    marginTop: 100,
  },
  noMatchTxt: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 28,
    color: colors.black,
    marginHorizontal: 48,
    textAlign: "center",
    marginBottom: 24,
  },
  browseProducts: {
    fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 16,
    color: colors.lightBlue,
    textAlign: "center",
  },
});
