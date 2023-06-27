import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    paddingBottom: 12,
    justifyContent: "space-between",
    paddingTop: 15,
  },
  divider: {
    borderColor: colors.grey,
  },

  title: {
    ...Fonts.style.openSans16SemiBold,
  },
  description: {
    ...Fonts.style.openSans14Regular,
    marginVertical: 10,
    textAlign: "left",
  },
  leftButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    borderColor: "#00000029",
    borderWidth: 0.5,
    justifyContent: "center",
  },
  rightButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    borderColor: "#00000029",
    borderWidth: 0.5,
    backgroundColor: colors.black,
    justifyContent: "center",
  },
  leftButtonText: {
    textAlign: "center",
    alignSelf: "center",
    ...Fonts.style.openSans14Bold,
    color: colors.black,
  },
  rightButtonText: {
    textAlign: "center",
    alignSelf: "center",
    ...Fonts.style.openSans14Bold,
    color: colors.white,
  },
  crossIcon: {
    width: 25,
    height: 25,
    ...Fonts.style.openSans16SemiBold,
    color: Colors.black,
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
