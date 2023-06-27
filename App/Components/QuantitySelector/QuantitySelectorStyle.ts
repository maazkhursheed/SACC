import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: "#BBBBBB",
    flexDirection: "row",
    alignSelf: "center",
  },
  leftButton: {
    flex: 1,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#BBBBBB",
  },
  buttonLabel: {
    textAlign: "center",
    alignSelf: "center",
    color: "#000000",
  },
  textInput: {
    flex: 1,
    textAlign: "center",
    alignSelf: "center",
    color: "#000000",
    height: 50,
  },
  rightButton: {
    flex: 1,
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#BBBBBB",
  },
});
