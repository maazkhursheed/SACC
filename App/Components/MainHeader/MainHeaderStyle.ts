import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    zIndex: 10,
  },
  titleIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    bottom: 10,
    shadowOffset: { width: 0, height: Platform.select({ ios: 0, android: 2 }) },
    shadowOpacity: Platform.select({ ios: 1, android: 1 }),
    shadowRadius: Platform.select({ ios: 5, android: 2 }),
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 30,
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  profileBtn: {
    marginRight: 24,
    marginLeft: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacityStyle: {},
  iconStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    color: Colors.darkGrey,
  },
  image: {
    alignSelf: "center",
    height: 35,
    width: 150,
  },
});
