import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes/index";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  removeBase: {
    backgroundColor: Colors.black,
  },
  base: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
    paddingVertical: 10,
  },
  viewCartText: {
    fontSize: 14,
    fontFamily: Fonts.type.OpenSansRegular,
    textAlign: "center",
    marginRight: 15,
    marginTop: 20,
    color: Colors.lightBlue,
  },
  iconContainer: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text1: {
    fontSize: 16,
    fontFamily: Fonts.type.OpenSansRegular,
    marginBottom: 3,
    color: Colors.darkGrey,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  successToast: {
    fontSize: 20,
    color: Colors.greenCheck,
  },
  iconClose: {
    color: Colors.black,
    height: 16,
    width: 16,
    marginHorizontal: 14,
  },
  textwhite: { color: Colors.white },
  removeIcon: {
    color: Colors.white,
  },
});
