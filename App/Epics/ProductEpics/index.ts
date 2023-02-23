import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { finalize, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { invokeOnPath, shouldInvokeFailure } from "~root/Lib/CommonHelper";
import { getRequestParams, isResponseOk } from "~root/Lib/DataHelper";
import { AppActions } from "~root/Reducers/AppReducers";
import { IDependencies } from "~root/Reducers/CreateStore";
import { ProductDetailsActions } from "~root/Reducers/ProductDetailsReducers";

export const epicProductDetails: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductDetailsActions.requestProductDetails)),
    mergeMap(action => {
      const param = getRequestParams(state$);

      return api.hybris.getProductDetails(action.payload, param).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            return of(ProductDetailsActions.successProductDetails(response.data)).pipe(finalize(() => invokeOnPath(["meta", "onSuccess"], action)));
          } else {
            return of(
              ProductDetailsActions.failureProductDetails({
                action,
                response,
              }),
              AppActions.appGenericErrorVisibility(true),
            ).pipe(
              finalize(() => {
                if (shouldInvokeFailure(response)) {
                  invokeOnPath(["meta", "onFailure"], action);
                }
              }),
            );
          }
        }),
      );
    }),
  );
