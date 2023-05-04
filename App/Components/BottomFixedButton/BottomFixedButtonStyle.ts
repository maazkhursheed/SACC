import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

const commonButton = {
  justifyContent: "center",
  shadowColor: "transparent",
  flexDirection: "row",
  paddingHorizontal: 10,
};

export default StyleSheet.create({
  bgActive: { ...commonButton, backgroundColor: Colors.lightBlue },
  bgInActive: { ...commonButton, backgroundColor: Colors.buttonPressed },
  bgDisabled: { ...commonButton, backgroundColor: Colors.disabledBlue },
  btnText: {
    textAlign: "center",
    fontSize: 16,
    padding: 14,
    color: Colors.white,
  },
  btnTextDisabled: {
    textAlign: "center",
    fontSize: 16,
    padding: 14,
    color: Colors.white,
  },
  textContainer: { justifyContent: "center", alignSelf: "stretch" },
  icon: {
    fontSize: 20,
    color: Colors.red,
    alignSelf: "center",
  },
});
