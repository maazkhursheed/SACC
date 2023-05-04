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
  cancelButton: {
    ...Fonts.style.openSans14Bold,
  },
  secondButton: {
    ...Fonts.style.openSans14BoldWhite,
  },
});
