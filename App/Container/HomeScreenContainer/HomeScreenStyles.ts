import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  frequentlyOrderContainer: {
    borderTopColor: Colors.offWhite,
    borderTopWidth: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  marketingTileView: {
    flex: 1,
    paddingBottom: 30,
    backgroundColor: Colors.white,
  },
  flashSaleWrapper: {
    backgroundColor: Colors.black,
    paddingVertical: 20,
    paddingHorizontal: 19,
    marginHorizontal: 16,
  },
  flashSaleTopWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
  flashSaleDiscountDetails: {
    flex: 1,
    justifyContent: "center",
  },
  flashText: {
    textAlign: "left",
    ...Fonts.style.openSans14RegularWhite,
  },
  discountPercentage: {
    marginTop: 12,
    textAlign: "left",
    ...Fonts.style.openSans20BoldWhite,
  },
  price: {
    ...Fonts.style.openSans14RegularWhite,
  },
  miniText: {
    marginTop: 12,
    textAlign: "left",
    ...Fonts.style.openSans14RegularWhite,
  },
  flashBtn: {
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  flashImage: {
    width: "100%",
    height: 160,
    flex: 1,
  },
  flashSaletextStyle: {
    ...Fonts.style.openSans16BoldFlash,
  },
  bestSellerTextStyle: {
    fontWeight: "bold",
  },
  callOutBrandcontainerStyle: {
    marginBottom: 15,
    marginTop: 48,
  },
  brandNamestyle: {
    width: "100%",
    height: 160,
    marginVertical: 38,
  },
  BrandCrouselWrapper: {
    marginBottom: 10,
    paddingVertical: 30,
    backgroundColor: Colors.pink,
  },
  BrandCrouselImageStyle: {
    height: 80,
    width: 160,
    marginRight: 12,
  },
});
