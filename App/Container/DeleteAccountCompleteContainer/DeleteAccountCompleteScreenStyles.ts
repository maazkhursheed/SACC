import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  bottomBtnContainer: {
    marginTop: 30,
    backgroundColor: Colors.black,
    borderRadius: 3,
    width: "95%",
    alignSelf: "center",
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
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 40,
  },
  Icon: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 50,
    alignContent: "center",
    alignSelf: "center",
  },
  Title: {
    marginBottom: 30,
    textAlign: "center",
    ...Fonts.style.openSans20RegularH1,
  },
  Text1: {
    width: 415,
    textAlign: "center",
    padding: 35,
    paddingTop: 0,
    ...Fonts.style.openSans14RegularGrey,
  },
  Text2: {
    width: 415,
    textAlign: "center",
    padding: 55,
    paddingTop: 0,
    paddingBottom: 35,
    ...Fonts.style.openSans14RegularGrey,
  },
  Text3: {
    width: 415,
    textAlign: "center",
    paddingTop: 0,
    ...Fonts.style.openSans14RegularGrey,
  },
  textStyles: {
    ...Fonts.style.openSans14BoldWhite,
  },
  backgroundContainer: {
    backgroundColor: colors.white,
    height: "100%",
  },
  contactUs: {
    textAlign: "center",
    paddingTop: 20,
    textDecorationLine: "underline",
    ...Fonts.style.openSans14RegularGrey,
  },
  contactUsIcon: {
    width: 15,
    height: 15,
    alignSelf: "center",
    color: colors.smoothGrey,
    marginTop: 15,
    marginLeft: 5,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
