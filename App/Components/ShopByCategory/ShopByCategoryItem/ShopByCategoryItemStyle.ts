import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import { Fonts } from "../../../Themes";

export default StyleSheet.create({
  containerWrapper: {},
  container: {
    flex: 1,
    marginRight: 16,
    marginBottom: 30,
  },
  imageStyle: {
    width: 66,
    height: 66,
    borderRadius: 50,
    backgroundColor: Colors.wildSandColor,
    marginRight: 10,
  },
  textStyle: {
    ...Fonts.style.openSans14SemiBoldH1,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "left",
  },
  categoryItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
