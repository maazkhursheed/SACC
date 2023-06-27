import { Dimensions, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  menuContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowDownContainer: { width: 90, height: 30, alignSelf: "center", justifyContent: "center" },
  arrowDown: { alignSelf: "flex-end" },
  welcomeContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subMenuContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  menuText: {
    ...Fonts.style.openSans15Bold,
    color: Colors.white,
    paddingVertical: 15,
  },
  subMenuText: {
    ...Fonts.style.openSans15Bold,
    color: Colors.white,
    paddingVertical: 15,
  },
  welcomeSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  iconStyle: {
    alignSelf: "flex-start",
  },
  menuHeaderText: {
    ...Fonts.style.openSans15Bold,
    color: Colors.white,
  },
  listContainer: {
    paddingTop: 5,
  },
  listContent: {
    paddingBottom: 100,
  },
  childMenuContainer: {
    marginTop: 50,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  childMenuItem: {
    width: Dimensions.get("window").width - 60,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 40,
    justifyContent: "space-between",
  },
  grandChildMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginHorizontal: 60,
  },
  grandMenuText: {
    ...Fonts.style.openSans15Bold,
    color: Colors.white,
    paddingVertical: 15,
  },
});
