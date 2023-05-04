import { NativeModules, Platform, StyleSheet } from "react-native";
import { Colors, Metrics } from "../../Themes/index";
const { StatusBarManager } = NativeModules;
export default StyleSheet.create({
  applicationView: {
    backgroundColor: Colors.darkBlueHeader,
    paddingTop: Platform.OS === "ios" ? StatusBarManager.HEIGHT : 0,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    // fontFamily: Fonts.type.base,
    margin: Metrics.baseMargin,
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },

  base: {
    flexDirection: "row",
    height: 60,
    width: "90%",
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
  closeButtonContainer: {
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    width: 9,
    height: 9,
  },
  text1: {
    fontSize: 16,
    // fontFamily: Fonts.type.ProximaNovaRegular,
    marginBottom: 3,
  },
  successToast: {
    fontSize: 20,
    color: Colors.greenCheck,
  },
  infoToast: {
    fontSize: 20,
    color: Colors.darkBlueHeader,
  },
  warningToast: {
    fontSize: 20,
    backgroundColor: Colors.ochre,
    borderRadius: 25,
    padding: 4,
    color: Colors.white,
  },
  profileBtn: {
    backgroundColor: Colors.segmentBackgroundColor,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.white,
    width: 35,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBtnTxt: {
    // ...Fonts.style.openSans18Bold,
    color: Colors.ochre,
    fontSize: 18,
    fontWeight: "bold",
  },
  baseError: {
    flexDirection: "row",
    width: "90%",
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  errorTxt: {
    // ...Fonts.style.openSans16Regular,
    fontSize: 16,
    color: Colors.black,
  },
  errorBtn: {
    backgroundColor: Colors.segmentBackgroundColor,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.white,
    width: 24,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});
