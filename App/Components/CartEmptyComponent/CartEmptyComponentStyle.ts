import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  subContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 22,
    marginTop: 30,
  },
  stripText: { ...Fonts.style.openSans14Bold, color: Colors.white },
  cartEmptyThumbNail: {
    alignSelf: "center",
    marginTop: 32,
    marginRight: 16,
  },
  cartEmptyLabel: { ...Fonts.style.openSans20Regular, color: Colors.black, alignSelf: "center", marginTop: 16, textAlign: "center" },
  cartEmptyDesc: { ...Fonts.style.openSans14Regular, color: Colors.smoothGrey, alignSelf: "center", marginTop: 16, textAlign: "center" },
  btnStyle: {
    backgroundColor: Colors.black,
    width: "94%",
    height: 40,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 22,
    justifyContent: "center",
  },
});
