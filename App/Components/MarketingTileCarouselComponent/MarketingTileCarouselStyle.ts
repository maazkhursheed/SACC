import { StyleSheet } from "react-native";
import { Colors, Metrics } from "~root/Themes";
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  mainContainer: {
    width: Metrics.screenWidth,
    minHeight: Metrics.screenWidth / 2,
  },
  mainBackground: {
    backgroundColor: "#FEF8FA",
  },
  mainTile: {
    margin: 18,
  },
  mainTitleText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 34,
    marginVertical: 12,
    ...Fonts.style.openSans24RegularPromo,
  },
  mainBodyText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    ...Fonts.style.openSans16Regular,
  },
  buttonLightBackground: {
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginVertical: 24,
  },
  shopnowBtn: {
    ...Fonts.style.openSans16Bold,
    marginVertical: 24,
    textAlign: "center",
    textDecorationLine: "underline",
    color: Colors.purple,
  },
  buttonTextLightBackground: {
    ...Fonts.style.openSans16BoldWhite,
  },
  imageBackgroundStyle: { aspectRatio: 1.33 },
  imageView: { width: 80, height: 24 },
  containerStyle: {
    position: "absolute",
    bottom: -16,
    width: "100%",
    alignSelf: "stretch",
  },
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "#DF4C6B",
  },
  inactiveDotStyle: {
    backgroundColor: "black",
  },
});
