import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  headerWrapper: { flexDirection: "row" },
  headerText: {
    ...Fonts.style.openSans20Regular,
    color: Colors.black,
    marginBottom: 24,
    textAlign: "left",
  },
  itemCount: {
    ...Fonts.style.openSans20Regular,
    marginBottom: 24,
    color: Colors.black,
  },
  categoryHeaderWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewMoreStyle: {
    ...Fonts.style.openSans14Regular,
    color: Colors.purple,
    textDecorationLine: "underline",
  },
});
