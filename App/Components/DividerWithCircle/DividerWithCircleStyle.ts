import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  dividerLine: {
    height: 1,
    borderRadius: 1,
    flex: 1,
    borderWidth: 0.2,
    borderStyle: "dashed",
    backgroundColor: Colors.lighterGrey,
    marginVertical: 48,
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 30,
    borderWidth: 0.2,
    borderStyle: "dashed",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 3,
    width: 3,
    borderRadius: 30,
    backgroundColor: Colors.darkGrey,
  },
  devideWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: -20,
  },
});
