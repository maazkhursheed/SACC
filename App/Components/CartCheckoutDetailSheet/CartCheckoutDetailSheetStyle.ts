import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  divider: {
    borderColor: colors.grey,
  },

  title: {
    ...Fonts.style.openSans16SemiBold,
  },
  crossIcon: {
    width: 20,
    height: 20,
    ...Fonts.style.openSans16SemiBold,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  items: {
    ...Fonts.style.openSans14Regular,
  },
  itemGreen: {
    ...Fonts.style.openSans14Regular,
    color: colors.greenText,
  },
  fixedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  refineContainer: { flex: 1, flexDirection: "column" },
  refineButton: {
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 2,
    height: 40,
    width: 180,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  text: {
    fontWeight: "bold",
    color: colors.white,
  },
  total: { ...Fonts.style.openSans20Bold, color: colors.purple },
  headerText: {
    ...Fonts.style.openSans14SemiBold,
    marginVertical: 11,
  },
});
