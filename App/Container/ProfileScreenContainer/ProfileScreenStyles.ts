import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  welcomeHeader: { ...Fonts.style.openSans12Bold, fontSize: 15, marginTop: 15, textAlign: "left" },
  quickLinksHeading: { ...Fonts.style.openSans14SemiBold, marginVertical: 5, textAlign: "left" },
  divider: {
    borderColor: Colors.grey,
    marginVertical: 13,
  },
  btnStyle: { paddingVertical: 10, backgroundColor: Colors.green, marginHorizontal: 50, marginBottom: 20, borderRadius: 20 },
  btnText: { color: Colors.white, fontSize: 15, textAlign: "center" },
  scrollContainer: { paddingBottom: 20 },
  signOutContainer: { marginBottom: 20, borderWidth: 1, borderColor: Colors.purple },
  signOutTitle: { color: Colors.purple },
  signOutBtn: { backgroundColor: Colors.white },
  changeLangContainer: { flexDirection: "row", alignItems: "center", paddingVertical: 15 },
  langText: { marginLeft: 10, ...Fonts.style.openSans14Regular },
});
