import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
const THUMB_RADIUS = 15;
export default StyleSheet.create({
  container: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
  },
  heading: {
    ...Fonts.style.openSans20Regular,
    fontSize: 20,
    color: Colors.black,
  },
  listContainerStyle: {
    paddingLeft: 16,
  },
  headerTextStyle: {
    ...Fonts.style.openSans18Bold,
  },
  containerStyle: {
    marginTop: 20,
  },
  footerContaiber: {
    marginBottom: 20,
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
    borderWidth: 2,
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
  text: {
    fontSize: 16,
    color: "#fff",
  },
});
