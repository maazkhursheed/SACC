import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
  },
  heading: {
    // ...Fonts.style.openSans20Regular,
    fontSize: 20,
    color: Colors.black,
  },
  listContainerStyle: {
    paddingLeft: 16,
  },
});
