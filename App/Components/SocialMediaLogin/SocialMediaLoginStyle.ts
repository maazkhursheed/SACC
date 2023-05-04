import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

const styles = StyleSheet.create({
  iconWraaper: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  orContinuewrapper: { flexDirection: "row", marginHorizontal: 20, alignItems: "center", paddingVertical: 40 },
  orContinueText: { color: Colors.darkerGrey, fontSize: 14 },
  socialButtonWrapper: { flexDirection: "row", justifyContent: "center" },
  divider: { height: 0.5, backgroundColor: Colors.darkGrey, flex: 1 },
});

export default styles;
