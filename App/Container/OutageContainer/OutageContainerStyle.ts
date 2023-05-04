import { StyleSheet } from "react-native";
import colors from "~root/Themes/Colors";

export default StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    width: "70%",
    aspectRatio: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    // ...Fonts.style.openSans16Bold,
    marginTop: 22,
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    // ...Fonts.style.openSans16Reguler,
    color: colors.darkGrey,
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 24,
  },
  button: {
    // ...Fonts.style.openSans14Reguler,
    fontSize: 14,
    color: colors.lightBlue,
    marginTop: 16,
  },
});
