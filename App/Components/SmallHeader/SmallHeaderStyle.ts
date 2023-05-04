import { StyleSheet } from "react-native";
import { ApplicationStyles, Metrics } from "~root/Themes";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  container: {
    height: Metrics.navBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: colors.shadowWithAlpha,
    ...ApplicationStyles.shadow,
    backgroundColor: colors.white,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 12,
  },
  title: {
    ...Fonts.style.openSans16SemiBold,
  },
  backIcon: {
    fontSize: 20,
  },
  backIconContainer: {
    paddingLeft: 10,
  },
  rightItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
