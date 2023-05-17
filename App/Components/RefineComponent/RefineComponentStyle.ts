import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

const THUMB_RADIUS = 15;

export default StyleSheet.create({
  title: {
    ...Fonts.style.openSans16Bold,
    textAlign: "left",
  },
  titleBrand: {
    ...Fonts.style.openSans14SemiBold,
    textAlign: "left",
  },
  crossIcon: {
    width: 20,
    height: 20,
    ...Fonts.style.openSans16SemiBold,
  },
  divider: {
    borderColor: colors.grey,
    marginVertical: 13,
  },
  moreText: {
    ...Fonts.style.openSans14Regular,
    color: colors.purple,
    textDecorationLine: "underline",
    marginBottom: 25,
    textAlign: "left",
  },
  refineButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 2,
    height: 40,
  },
  text: {
    fontWeight: "bold",
    color: colors.white,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 2,
    height: 40,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  textShop: {
    fontWeight: "bold",
    color: colors.black,
  },
  refineContainer: { flex: 1, flexDirection: "row" },
  priceDataFoundContainer: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 27, paddingBottom: 32 },
  textSAR: { ...Fonts.style.openSans14SemiBold, color: colors.purple },
  textDataCount: { ...Fonts.style.openSans14Regular, color: colors.smoothGrey },
  clear: {
    ...Fonts.style.openSans14Regular,
    color: colors.smoothGrey,
    alignSelf: "flex-end",
    marginVertical: 17,
    paddingHorizontal: 20,
    textDecorationLine: "underline",
    // textAlign:'right'
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  fixedContainer: {
    height: 50,
    backgroundColor: "white",
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  containerSlider: {
    paddingHorizontal: 20,
    alignItems: "stretch",
    justifyContent: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: colors.purple,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: "80%",
    height: 40,
  },

  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CCC",
  },
  rootThump: {
    width: THUMB_RADIUS * 1.5,
    height: THUMB_RADIUS * 1.5,
    borderRadius: THUMB_RADIUS,
    borderColor: "#6E263D",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRootThump: {
    width: THUMB_RADIUS * 1,
    height: THUMB_RADIUS * 1,
    borderRadius: THUMB_RADIUS,
    borderWidth: 0.5,
    borderColor: "#fff",
    backgroundColor: "#6E263D",
  },
  rootselected: {
    height: 4,
    backgroundColor: "#6E263D",
    borderRadius: 2,
  },
  rootnotch: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#6E263D",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },

  rootlabel: {
    alignItems: "center",
    padding: 3,
    backgroundColor: "#6E263D",
    borderRadius: 4,
  },
  labelText: {
    fontSize: 16,
    color: "#fff",
  },
});
