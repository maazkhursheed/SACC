import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
  },
  heading: {
    ...Fonts.style.openSans20Regular,
  },
  listContainerStyle: {
    paddingLeft: 16,
  },
  containerStyle: { marginHorizontal: 16, marginTop: 30, marginBottom: 10 },
});
