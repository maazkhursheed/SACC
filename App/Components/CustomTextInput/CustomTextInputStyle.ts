import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 28,
  },
  labelViewStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    // fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 15,
    flex: 1,
    width: "100%",
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#262119",
    padding: 0,
  },
  inputStyle2: {
    // fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 15,
    flex: 1,
    width: "100%",
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "black",
    paddingLeft: 15,
  },
  textInputInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    alignItems: "center",
  },
  iconContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  iconStyle: {
    width: 20.3,
    height: 15.3,
    resizeMode: "contain",
  },
  errorTextStyle: {
    // fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 15,
    textAlign: "left",
    color: "#b00820",
    paddingVertical: 5,
  },
  infoIconStyle: {
    width: 18,
    height: 18,
    resizeMode: "contain",
    marginLeft: 10,
  },
  detailIconStyle: {
    width: 17,
    height: 17,
    marginRight: 4,
  },
  inputLabelOptionalStyle: {
    // fontFamily: Fonts.type.OpenSansRegular,
    fontSize: 15,
    fontStyle: "italic",
    color: Colors.darkerGrey,
  },
});

export default styles;
