import { StyleSheet } from "react-native";
import { Colors } from "../Themes";

export default StyleSheet.create({
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
});
