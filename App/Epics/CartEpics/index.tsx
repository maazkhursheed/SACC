import R from "ramda";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getSelectedLanguage } from "../../i18n";
import { invokeOnPath } from "../../Lib/CommonHelper";
import { getUserParams } from "../../Lib/DataHelper";
import { AuthAction } from "../../Reducers/AuthReducer";
import { CartAction } from "../../Reducers/CartReducer";
import { IDependencies } from "../../Reducers/CreateStore";

export const CheckCartEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.checkCurrentCart)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.checkCartApi(newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            return of(CartAction.currentCartSuccess(response?.data));
          } else if (R.path(["errors", 0, "message"], response?.data) == "No cart created yet.") {
            return api.hybris.createCartApi(newparams).pipe(
              mergeMap(cartResponse => {
                if (response.ok) {
                  return of(CartAction.currentCartSuccess(cartResponse?.data));
                } else {
                  return of(CartAction.currentCartFailure(cartResponse?.data));
                }
              }),
            );
          } else if (R.path(["errors", 0, "message"], response?.data)) {
            return of(AuthAction.signOut());
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const addItemToCartEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.addProductToCart)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.addProductToCartApi(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.addProductToCartSuccess(response?.data?.entry?.product), CartAction.checkCurrentCart());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.addProductToCartFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const updateProductToCartEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.updateProductToCart)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.updateProductToCartApi(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.updateProductToCartSuccess(response?.data?.entry?.product), CartAction.checkCurrentCart());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.updateProductToCartFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const removeItemFromCartEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.removeItemFromCart)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.removeItemFromCartApi(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.removeItemFromCartSuccess(response?.data?.entry?.product), CartAction.checkCurrentCart());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.removeItemFromCartFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const removeAllCartItemsEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.removeAllCartItems)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.removeAllCartItemsApi(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.removeAllCartItemsSuccess(response?.data?.entry?.product), CartAction.checkCurrentCart());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.removeAllCartItemsFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const getCartCouponsEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.getCartCoupons)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.getCartCoupons(newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.getCartCouponsSuccess(response?.data?.vouchers));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.getCartCouponsFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const checkCartCouponEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.checkCartCoupon)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.checkCartCoupon(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            if (action.meta && action.meta.onSuccess) {
              action.meta.onSuccess(response?.data?.valid);
            }
            return of(CartAction.checkCartCouponSuccess(response?.data?.valid));
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.checkCartCouponFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const applyCartCouponEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.applyCartCoupon)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.applyCartCoupon(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.applyCartCouponSuccess(response?.data), CartAction.checkCurrentCart());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.applyCartCouponFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const removeAppliedVoucherEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(CartAction.removeAppliedVoucher)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newparams = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.removeAppliedVoucherApi(action.payload, newparams).pipe(
        mergeMap(response => {
          if (response.ok) {
            invokeOnPath(["meta", "onSuccess"], action);
            return of(CartAction.removeAppliedVoucherSuccess(response?.data), CartAction.checkCurrentCart());
          } else {
            invokeOnPath(["meta", "onFailure"], action);
            return of(CartAction.removeAppliedVoucherFailure(R.path(["errors", 0, "message"], response?.data)));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );
