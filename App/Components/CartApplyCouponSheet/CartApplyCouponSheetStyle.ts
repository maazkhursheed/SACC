import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    paddingTop: 12,
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
  couponCheck: {
    ...Fonts.style.openSans16Bold,
    color: colors.white,
  },
  couponTag: {
    ...Fonts.style.openSans14Bold,
    marginTop: 32,
    marginBottom: 8,
    textAlign: "left",
  },
  orUse: {
    ...Fonts.style.openSans12Regular,
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
  textInputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.subHeadingColor,
  },
  textInput: {
    height: 36,
    backgroundColor: "white",
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 10,
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    ...Fonts.style.openSans14Regular,
    borderColor: colors.black,
  },
  cleareBtn: { backgroundColor: "#FFF", height: 40, padding: 10, justifyContent: "center" },
  search: {
    alignSelf: "center",
    height: 17,
    width: 17,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  touchableOpacity: {
    height: 40,
    backgroundColor: Colors.black,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 1,
    borderColor: colors.black,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.subHeadingColor,
  },
  word: {
    paddingHorizontal: 10,
    color: colors.subHeadingColor,
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    borderRadius: 2,
    backgroundColor: colors.purple,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    borderRadius: 2,
    backgroundColor: colors.shadow,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    ...Fonts.style.openSans16Bold,
    color: colors.white,
  },
  containerMain: {
    flex: 1,
    margin: 16,
  },
  content: {
    flex: 1,
    paddingBottom: 60,
  },
  approvedCode: {
    ...Fonts.style.openSans12Regular,
    color: colors.greenText,
    marginTop: 4,
    textAlign: "left",
  },
  unApprovedCode: {
    ...Fonts.style.openSans12Regular,
    color: colors.red,
    marginTop: 4,
    textAlign: "left",
  },
  voucherContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appliedCoupon: {
    ...Fonts.style.openSans12Regular,
    color: colors.smoothGrey,
  },
  appliedCouponBold: {
    ...Fonts.style.openSans12Bold,
  },
});
