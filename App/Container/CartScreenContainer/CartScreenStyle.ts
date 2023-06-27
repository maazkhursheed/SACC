import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  smallHeaderContainer: { borderBottomWidth: 0, paddingLeft: 0, height: Platform.OS === "ios" ? 50 : 40 },
  titleText: { ...Fonts.style.openSans18Bold },
  containerStyle: { paddingHorizontal: 16, paddingTop: 10 },
  viewMoreStyle: {
    ...Fonts.style.openSans14Regular,
    color: Colors.purple,
    textDecorationLine: "underline",
  },
  headerText: {
    ...Fonts.style.openSans14SemiBold,
    marginVertical: 11,
  },
  fixedContainer: {
    backgroundColor: colors.white, // Add a background color
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 25,
  },
  refineContainer: { flex: 1, flexDirection: "column", alignItems: "flex-start" },
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
  listContainerStyle: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  noMatchTxtContainer: {
    flex: 1,
    marginTop: 100,
  },
  noMatchTxt: {
    fontFamily: Fonts.type.OpenSansExtraBold,
    fontSize: 28,
    color: colors.black,
    marginHorizontal: 48,
    textAlign: "center",
    marginBottom: 24,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingRight: 12,
  },
  footerText: {
    ...Fonts.style.openSans14SemiBold,
  },
});
