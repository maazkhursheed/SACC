import { StyleSheet } from "react-native";
import { Colors, Fonts } from "~root/Themes";

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.textLight,
  },
  doneStyle: {
    ...Fonts.style.openSans16Regular,
    fontSize: 14,
    color: Colors.textLight,
  },
  headerStyle: {
    shadowColor: Colors.darkGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  cancelStyle: {
    ...Fonts.style.openSans16Regular,
    fontSize: 14,
    color: Colors.textLight,
  },
  changeText: {
    ...Fonts.style.openSans16Regular,
    fontSize: 14,
    marginRight: 18,
    color: Colors.textLight,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  headerTitleStyle: {
    ...Fonts.style.openSans18Bold,
    fontSize: 18,
    color: Colors.fadeblack,
  },
  stgHeader: {
    marginTop: 20,
  },
  headerContainerStyle: {
    backgroundColor: Colors.fadeblack,
    paddingBottom: 10,
  },
  nextTextBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  closeBtnStyle: {
    marginTop: -20,
  },
  septaror: { marginHorizontal: 2 },
});
