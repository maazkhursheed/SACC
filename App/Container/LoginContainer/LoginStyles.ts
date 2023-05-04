import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  emailPassContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  headerSection: { marginTop: 50 },
  loginHeaderWrapper: { alignItems: "center" },
  loginHeaderText: { ...Fonts.style.openSans30Bold },
  loginSubText: { marginTop: 10, ...Fonts.style.openSans14SemiBoldGrey },
  errorTextStyle: {
    color: Colors.black,
    flex: 1,
    textAlign: "center",
  },
  bottomBtnContaiber: { marginTop: 30, backgroundColor: Colors.black, borderRadius: 7 },
  errorWrapperStyle: {
    backgroundColor: Colors.pink,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 5,
    alignItems: "center",
  },
  forgotPass: { alignSelf: "flex-end", marginTop: 30 },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputLabelStyle: {
    marginBottom: 5,
    ...Fonts.style.openSans14BoldDarkerGrey,
  },
  loading: { marginTop: 20 },
  inputTextStyle: {
    textAlign: "left",
    marginLeft: 15,
  },
  inputwrapperStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 7,
  },
  disclosureAccountStyle: {
    textAlign: "center",
    fontWeight: "700",
    marginVertical: 14,
    ...Fonts.style.openSans14BoldDarkerGrey,
  },
  clickHere: {
    textAlign: "center",
    marginTop: 14,
    textDecorationLine: "underline",
    ...Fonts.style.openSans14BoldDarkerGrey,
  },
  svgStyle: { width: 15, height: 15 },
  inputeSectionWrapper: { marginTop: 25 },
  textStyles: {
    ...Fonts.style.openSans14BoldWhite,
  },
});
