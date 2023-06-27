import { combineEpics } from "redux-observable";
import { DeleteUserEpic, epicAuth, epicAuthDirect } from "./AuthEpics";
import {
  addItemToCartEpic,
  applyCartCouponEpic,
  checkCartCouponEpic,
  CheckCartEpic,
  getCartCouponsEpic,
  removeAllCartItemsEpic,
  removeAppliedVoucherEpic,
  removeItemFromCartEpic,
  updateProductToCartEpic,
} from "./CartEpics";
import { epicGetHomeScreenData } from "./HomeEpics";
import { epicAddItemToList, epicRemoveItemFromList, epicSearchSolr } from "./ProductEpics";
import { epicSearchProductSuggestions, epicSearchSuggestions } from "./SearchEpics";

export default combineEpics(
  epicSearchSolr,
  epicAuth,
  epicAuthDirect,
  epicGetHomeScreenData,
  DeleteUserEpic,
  CheckCartEpic,
  addItemToCartEpic,
  epicAddItemToList,
  epicRemoveItemFromList,
  updateProductToCartEpic,
  removeItemFromCartEpic,
  removeAllCartItemsEpic,
  epicSearchSuggestions,
  epicSearchProductSuggestions,
  getCartCouponsEpic,
  checkCartCouponEpic,
  applyCartCouponEpic,
  removeAppliedVoucherEpic,
);
