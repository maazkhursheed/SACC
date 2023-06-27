import { Platform, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    zIndex: 10,
  },
  titleIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 1, android: 1 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
  },
  titleView: {
    textAlign: "left",
  },
  bottomButtonContainer: {
    flexDirection: "row",
  },
  profileBtn: {
    marginRight: 24,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  invisible: {
    marginRight: 24,
    marginLeft: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacityStyle: {},
  touchableOpacity: {
    height: 40,
    backgroundColor: Colors.purple,
    borderRadius: 5,
    width: "30%",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  iconStyle: {
    fontSize: 20,
    color: Colors.darkGrey,
  },
  image: {
    alignSelf: "center",
    height: 35,
    width: 150,
  },
  imageLeft: {
    height: 30,
    width: 30,
  },
  countContainer: { width: 20, height: 20, backgroundColor: "#6F263D", borderRadius: 10, marginLeft: -10, alignItems: "center", marginTop: 5 },
  counterText: { color: "#fff", paddingTop: 1 },
  search: {
    alignSelf: "center",
    height: 17,
    width: 17,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  cartWishIcon: {
    flexDirection: "row",
    // marginLeft: "30%",
  },
  cartIcon: {
    paddingLeft: 15,
  },
  textInputWrapper: {
    flexDirection: "row",
    marginTop: 30,
    bottom: 20,
    marginHorizontal: 15,
    justifyContent: "space-between",
    borderRadius: 5,
    alignItems: "center",
    borderColor: "#989898",
    borderBottomWidth: 1,
  },
  textInput: {
    height: 40,
    backgroundColor: "white",
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 10,
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    ...Fonts.style.openSans14Regular,
  },
  cleareBtn: { backgroundColor: "#FFF", height: 40, padding: 10, justifyContent: "center" },
  suggestionWrapper: {
    backgroundColor: "#fff",
    position: "absolute",
    marginHorizontal: 16,
    width: "92%",
    borderWidth: 1,
    borderColor: "#989898",
    marginTop: 103,
  },
  flatlistContainer: {
    paddingHorizontal: 16,
  },
  keywordSuggestion: {
    margin: 10,
    flexDirection: "row",
  },
  keywordText: {
    ...Fonts.style.openSans14Regular,
  },
  productSuggestionContainer: {
    margin: 10,
    flexDirection: "row",
    marginLeft: 0,
  },
  imageWrapper: {
    marginRight: 10,
    paddingLeft: 5,
  },
  imageProductSuggestion: {
    width: 50,
    height: 50,
  },
  productSuggestionText: {
    width: 250,
    ...Fonts.style.openSans14SemiBold,
  },
  priceStyle: {
    ...Fonts.style.openSans14SemiBoldPrice,
  },
});
