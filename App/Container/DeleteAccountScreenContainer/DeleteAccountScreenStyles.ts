import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  bottomBtnContainer: {
    marginTop: 30,
    backgroundColor: Colors.black,
    borderRadius: 3,
    width: "45%",
  },
  bottomCancelBtnContainer: {
    marginTop: 30,
    backgroundColor: Colors.white,
    borderRadius: 3,
    borderColor: colors.black,
    borderWidth: 1,
    marginRight: 20,
    width: "45%",
  },
  TextContainer: {
    paddingBottom: 10,
    paddingTop: 50,
    padding: 20,
  },
  text1: {
    marginBottom: 30,
    textAlign: "left",
    ...Fonts.style.openSans20RegularH1,
  },
  text2: {
    lineHeight: 24,
    textAlign: "left",
    ...Fonts.style.openSans14RegularGrey,
  },
  Backround: {
    backgroundColor: "white",
  },
  Container: {
    backgroundColor: colors.white,
    height: "100%",
  },
  ButtonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "97%",
    paddingLeft: 15,
  },
});
