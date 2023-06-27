import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "../../Lib/AlertsHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;

const actionCreators = {
  checkCurrentCart: createAction("CHECK_CURRENT_CART"),
  currentCartSuccess: createStandardAction("CHECK_CURRENT_CART_SUCCESS")<any>(),
  currentCartFailure: createStandardAction("CHECK_CURRENT_CART_FAILURE")<any>(),
  addProductToCart: createStandardAction("ADD_PRODUCT_TO_CART")<any, IAlertCallbacks>(),
  updateProductToCart: createStandardAction("UPDATE_PRODUCT_TO_CART")<any, IAlertCallbacks>(),
  addProductToCartSuccess: createStandardAction("ADD_PRODUCT_TO_CART_SUCCESS")<any>(),
  updateProductToCartSuccess: createStandardAction("UPDATE_PRODUCT_TO_CART_SUCCESS")<any>(),
  addProductToCartFailure: createStandardAction("ADD_PRODUCT_TO_CART_FAILURE")<any>(),
  updateProductToCartFailure: createStandardAction("UPDATE_PRODUCT_TO_CART_FAILURE")<any>(),
  removeItemFromCart: createStandardAction("REMOVE_ITEM_FROM_CART")<any, IAlertCallbacks>(),
  removeItemFromCartSuccess: createStandardAction("REMOVE_ITEM_FROM_CART_SUCCESS")<any>(),
  removeItemFromCartFailure: createStandardAction("REMOVE_ITEM_FROM_CART_FAILURE")<any>(),
  removeAllCartItems: createStandardAction("REMOVE_ALL_ITEMS_FROM_CART")<any, IAlertCallbacks>(),
  removeAllCartItemsSuccess: createStandardAction("REMOVE_ALL_ITEMS_FROM_CART_SUCCESS")<any>(),
  removeAllCartItemsFailure: createStandardAction("REMOVE_ALL_ITEMS_FROM_CART_FAILURE")<any>(),
  clearCart: createAction("CLEAR_CART"),
  getCartCoupons: createStandardAction("REQUEST_CART_COUPONS")<any>(),
  getCartCouponsSuccess: createStandardAction("CART_COUPONS_SUCCESS")<any>(),
  getCartCouponsFailure: createStandardAction("CART_COUPONS_FAILURE")<any>(),
  checkCartCoupon: createStandardAction("CHECK_CART_COUPON")<any, IAlertCallbacks>(),
  checkCartCouponSuccess: createStandardAction("CHECK_CART_COUPON_SUCCESS")<any>(),
  checkCartCouponFailure: createStandardAction("CHECK_CART_COUPON_FAILURE")<any>(),
  applyCartCoupon: createStandardAction("APPLY_CART_COUPON")<any, IAlertCallbacks>(),
  applyCartCouponSuccess: createStandardAction("APPLY_CART_COUPON_SUCCESS")<any>(),
  applyCartCouponFailure: createStandardAction("APPLY_CART_COUPON_FAILURE")<any>(),
  removeAppliedVoucher: createStandardAction("REMOVE_CART_COUPON")<any, IAlertCallbacks>(),
  removeAppliedVoucherSuccess: createStandardAction("REMOVE_CART_COUPON_SUCCESS")<any>(),
  removeAppliedVoucherFailure: createStandardAction("REMOVE_CART_COUPON_FAILURE")<any>(),
};

export const CartAction = actionCreators;
interface Price {
  currencyIso: string;
  value: number;
}

export interface CartState {
  isLoading: boolean;
  error: string;
  cartData: any;
  newCartEntry: any;
  cartCoupons: any;
}

export type AuthAction = PayloadAction<string, CartState>;

export type ImmutableCartState = SI.ImmutableObject<CartState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableCartState = SI.from({
  isLoading: false,
  error: "",
  cartData: {},
  newCartEntry: {},
  cartCoupons: {},
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const checkCurrentCart: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: true,
    error: "",
    // cartData: {},
  });

// @ts-ignore
export const currentCartSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: "",
    cartData: payload,
  });

// @ts-ignore
export const currentCartFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
    cartData: {},
  });
// @ts-ignore
export const addProductToCart: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: true,
    error: "",
  });

// @ts-ignore
export const updateProductToCart: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: true,
    error: "",
  });

// @ts-ignore
export const addProductToCartSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: "",
    newCartEntry: payload,
  });

// @ts-ignore
export const updateProductToCartSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: "",
    // newCartEntry: payload,
  });
// @ts-ignore
export const addProductToCartFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
    newCartEntry: {},
  });
// @ts-ignore
export const updateProductToCartFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
    newCartEntry: {},
  });
// @ts-ignore
export const removeItemFromCart: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const removeItemFromCartSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: false,
    error: "",
    // newCartEntry: payload,
  });
// @ts-ignore
export const clearCart: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: false,
    error: "",
    cartData: {},
    newCartEntry: {},
  });
// @ts-ignore
export const removeItemFromCartFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
    // newCartEntry: payload,
  });
// @ts-ignore
export const removeAllCartItems: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const removeAllCartItemsSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: false,
    error: "",
  });
// @ts-ignore
export const removeAllCartItemsFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
  });
// @ts-ignore
export const getCartCoupons: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const getCartCouponsSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: "",
    cartCoupons: payload,
  });
// @ts-ignore
export const getCartCouponsFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
    cartCoupons: {},
  });
// @ts-ignore
export const checkCartCoupon: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const checkCartCouponSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: false,
    error: "",
  });
// @ts-ignore
export const checkCartCouponFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
  });
// @ts-ignore
export const applyCartCoupon: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const applyCartCouponSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: false,
    error: "",
  });
// @ts-ignore
export const applyCartCouponFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
  });
// @ts-ignore
export const removeAppliedVoucher: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const removeAppliedVoucherSuccess: Reducer<ImmutableCartState> = (state: ImmutableCartState) =>
  state.merge({
    isLoading: false,
    error: "",
  });
// @ts-ignore
export const removeAppliedVoucherFailure: Reducer<ImmutableCartState> = (state: ImmutableCartState, { payload }) =>
  state.merge({
    isLoading: false,
    error: payload,
  });
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableCartState> = {
  checkCurrentCart,
  currentCartSuccess,
  currentCartFailure,
  addProductToCart,
  updateProductToCart,
  addProductToCartSuccess,
  updateProductToCartSuccess,
  addProductToCartFailure,
  updateProductToCartFailure,
  removeItemFromCart,
  removeItemFromCartSuccess,
  removeItemFromCartFailure,
  removeAllCartItems,
  removeAllCartItemsSuccess,
  removeAllCartItemsFailure,
  clearCart,
  getCartCoupons,
  getCartCouponsSuccess,
  getCartCouponsFailure,
  checkCartCoupon,
  checkCartCouponSuccess,
  checkCartCouponFailure,
  applyCartCoupon,
  applyCartCouponSuccess,
  applyCartCouponFailure,
  removeAppliedVoucher,
  removeAppliedVoucherSuccess,
  removeAppliedVoucherFailure,
};
const CartReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default CartReducer;
