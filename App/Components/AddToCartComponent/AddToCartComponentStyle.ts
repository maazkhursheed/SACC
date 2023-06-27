import { StyleSheet } from "react-native";
import { Fonts } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    justifyContent: "space-between",
  },
  rowView: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  qtyView: {
    marginTop: 16,
    flexDirection: "row",
  },
  image: {
    marginVertical: 20,
    width: 90,
    height: 70,
  },
  productDescription: {
    ...Fonts.style.openSans14SemiBold,
    textAlign: "left",
  },
  viewQtyValue: {
    ...Fonts.style.openSans14SemiBoldPrice,
    color: colors.purple,
    textAlign: "left",
  },
  discountValue: {
    marginTop: 8,
    ...Fonts.style.openSans12RegularGrey,
    textAlign: "left",
  },
  productImageWrapper: {
    marginRight: 20,
  },
  discountText: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  itemsCount: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    ...Fonts.style.openSans14SemiBold,
  },
  itemsTotalCount: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    ...Fonts.style.openSans14SemiBoldPrice,
  },
  discountValueWrapper: {
    flexDirection: "row",
  },
  divider: {
    borderColor: colors.grey,
  },

  title: {
    ...Fonts.style.openSans16SemiBold,
  },
  crossIcon: {
    width: 20,
    height: 20,
    ...Fonts.style.openSans16SemiBold,
  },
  checkoutButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 2,
    height: 40,
    marginTop: 30,
  },
  text: {
    fontWeight: "bold",
    color: colors.white,
  },
  continueShopButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 2,
    height: 40,
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.black,
  },
  textShop: {
    fontWeight: "bold",
    color: colors.black,
  },
  discountPrice: { textDecorationLine: "line-through" },
});
