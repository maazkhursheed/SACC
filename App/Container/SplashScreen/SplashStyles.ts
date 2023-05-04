import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
  },
  splashText: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    color: "red",
  },
  image: {
    alignSelf: "center",
    height: 35,
    width: 150,
  },
});
