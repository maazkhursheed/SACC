import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  headerTitleWrapper: { flexDirection: "row" },
  contentItemWrapper: {
    marginBottom: 30,
  },
  image: { width: 160, height: 142 },
  btnwrapper: { backgroundColor: Colors.black, marginTop: 10 },
  textStyle: { ...Fonts.style.openSans14BoldWhite },
});
