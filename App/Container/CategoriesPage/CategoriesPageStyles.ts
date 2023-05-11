import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
const THUMB_RADIUS = 15;
export default StyleSheet.create({
  container: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
    backgroundColor: Colors.white,
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
});
