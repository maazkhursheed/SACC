import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
  contentItemWrapper: {
    borderWidth: 1,
    borderColor: Colors.steel,
    marginBottom: 20,
    paddingBottom: 15,
  },
  image: {
    width: "100%",
    height: 229,
  },
  contentWrapper: {
    alignItems: "center",
    paddingVertical: 16,
  },
  categoryType: {
    ...Fonts.style.openSans14Regular,
  },
  categoryTypeTitle: {
    marginTop: 12,
    ...Fonts.style.openSans20Bold,
  },
  categoryTypeSubTitle: {
    marginTop: 12,
    ...Fonts.style.openSans14Regular,
  },
  btnwrapper: {
    backgroundColor: Colors.black,
    width: "90%",
    marginTop: 17,
    borderRadius: 5,
  },
  textStyle: {
    ...Fonts.style.openSans16BoldWhite,
  },
});
