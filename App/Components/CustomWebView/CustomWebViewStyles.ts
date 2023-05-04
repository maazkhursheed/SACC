import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: { flex: 1, backgroundColor: "#fff" },
  doneStyle: {
    // ...Fonts.style.openSans16Regular,
    fontSize: 14,
    color: Colors.lightBlue,
  },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  cancelStyle: {
    // ...Fonts.style.openSans16Regular,
    fontSize: 14,
    color: Colors.lightBlue,
    marginHorizontal: 10,
  },
  reloadStyle: {
    // ...Fonts.style.openSans16Regular,
    fontSize: 14,
    color: Colors.lightBlue,
    marginHorizontal: 10,
  },
  changeText: {
    // ...Fonts.style.openSans16Regular,
    fontSize: 14,
    marginRight: 18,
    color: Colors.lightBlue,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitleStyle: {
    // ...Fonts.style.openSans18Bold,
    fontSize: 18,
    color: Colors.black,
  },
});
