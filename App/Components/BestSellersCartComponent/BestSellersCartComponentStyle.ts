import { StyleSheet } from "react-native";
import { Colors } from "~root/Themes";
import { Fonts } from "../../Themes";

export default StyleSheet.create({
  listView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.grey,
    paddingTop: 10,
    paddingBottom: 16,
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
    width: 112,
    height: 112,
  },
  stockContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10,
  },
  stockStyle: {
    ...Fonts.style.openSans12Regular,
    alignSelf: "center",
    paddingHorizontal: 5,
    color: "#707372",
  },
  leftStock: {
    ...Fonts.style.openSans12Regular,
    alignSelf: "center",
    paddingLeft: 10,
    color: "#6F263D",
    marginTop: 5,
  },
  productDescription: {
    marginTop: 24,
    ...Fonts.style.openSans14SemiBold,
    textAlign: "left",
  },
  viewQtyValue: {
    ...Fonts.style.openSans14SemiBoldPrice,
    textAlign: "left",
  },
  discountValue: {
    marginTop: 8,
    ...Fonts.style.openSans12RegularGrey,
    textAlign: "left",
  },
  leftwrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -10,
  },
  bestSellerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    flex: 1,
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
  leftWrapperImage: {
    padding: 5,
    borderRadius: 50,
    borderColor: Colors.steel,
    borderWidth: 1,
    backgroundColor: Colors.lightGrey,
    marginVertical: 10,
  },
  productImageWrapper: { marginHorizontal: 10 },
  discountText: { flexDirection: "row", flex: 1, flexWrap: "wrap" },
  cartIconBtn: {
    backgroundColor: Colors.black,
    borderRadius: 5,
    alignSelf: "flex-end",
    padding: 9,
  },
  discountValueWrapper: { flexDirection: "row" },
  footerWrapper: {
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: Colors.steel,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    marginRight: 5,
    ...Fonts.style.openSans12Regular,
  },
  discountPrice: { textDecorationLine: "line-through" },
  activityIndicator: { marginTop: 10 },
});
