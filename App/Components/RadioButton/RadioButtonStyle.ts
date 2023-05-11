import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  mainContainer: {
    marginVertical: 40,
  },
  container: {
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  radioText: {
    ...Fonts.style.openSans14Regular,
    color: colors.h1,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 14,
    height: 14,
    borderRadius: 20,
    backgroundColor: colors.purple,
  },
  refineMainContainer: {
    marginVertical: 10,
  },
  refineContainer: {
    marginBottom: 17,
    alignItems: "center",
    flexDirection: "row",
  },
  refineRadioCircle: {
    height: 20,
    width: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  refineSelectedButton: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.shadow,
    backgroundColor: colors.purple,
  },
  refineRadioText: {
    ...Fonts.style.openSans14Regular,
    color: colors.h1,
    marginLeft: 18,
  },
});
