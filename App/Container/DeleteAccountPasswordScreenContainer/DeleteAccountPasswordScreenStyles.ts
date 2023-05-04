import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  bottomBtnContainer: { marginTop: 30, backgroundColor: Colors.black, borderRadius: 3, width: "45%" },
  bottomCancelBtnContainer: {
    marginTop: 30,
    backgroundColor: Colors.white,
    borderRadius: 3,
    borderColor: colors.black,
    borderWidth: 1,
    marginRight: 20,
    width: "45%",
  },
  inputLabelStyle: {
    marginBottom: 5,
    ...Fonts.style.openSans14BoldDarkerGrey,
  },
  inputTextStyle: {
    textAlign: "left",
    marginLeft: 15,
    ...Fonts.style.openSans14Regular,
  },
  inputwrapperStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 7,
  },
  Background: {
    backgroundColor: "white",
  },
  BackgroundContiner: {
    backgroundColor: "white",
    height: "100%",
  },
  TextWrap1: {
    paddingBottom: 0,
    padding: 30,
    letterSpacing: 1,
    width: 375,
    textAlign: "left",
    ...Fonts.style.openSans20RegularH1,
  },
  InputPasswordWrapper: {
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  ButtonWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    width: "94%",
    paddingLeft: 15,
  },
});
