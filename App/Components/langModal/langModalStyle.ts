import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    color: "#444",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#CCC",
    paddingVertical: 5,
  },
  closeBtn: {
    marginTop: 20,
    alignSelf: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 20,
  },
  text: {
    ...Fonts.style.openSans14Regular,
    fontSize: 20,
    color: "#000",
    paddingVertical: 4,
    marginHorizontal: 10,
    textAlign: "left",
  },
  selectedText: {
    ...Fonts.style.openSans14Regular,
    fontSize: 20,
    fontWeight: "600",
    color: "green",
    paddingVertical: 4,
    marginHorizontal: 10,
    textAlign: "left",
  },
  changeLangContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: Colors.lighterGrey,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
});
