import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getSelectedLanguage } from "../../i18n";
import { getUserParams, isResponseOk, mapSanitizedItems, sanitizeSolrSearchForDb } from "../../Lib/DataHelper";
import { getSearchParameters } from "../../Lib/ProductHelper";
import { IDependencies } from "../../Reducers/CreateStore";
import { MyWishListActions } from "../../Reducers/MyWishListReducers";
import { ProductActions } from "../../Reducers/ProductReducers/index";
export const epicSearchSolr: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(ProductActions.requestSearchSolr)),
    mergeMap(async action => {
      const params = { ...getSearchParameters(state$.value), authToken: await getUserParams(), lang: getSelectedLanguage()?.code };

      const page = R.pathOr(0, ["payload", "currentPage"], action);

      return api.hybris.solrSearch(action.payload, params).pipe(
        mergeMap(response => {
          if ((isResponseOk(response) && RA.isNotNilOrEmpty(response.data)) || RA.isNotNilOrEmpty(R.path(["data", "products"], response))) {
            const totalPages = R.pathOr(0, ["data", "pagination", "totalPages"], response);
            const productCount = R.pathOr(0, ["data", "pagination", "totalResults"], response);
            const breadcrumbs = R.pathOr([], ["data", "breadcrumbs"], response) as any;
            const facets = R.pathOr([], ["data", "facets"], response) as any;
            const sorts = R.pathOr([], ["data", "sorts"], response) as any;
            const facetValueName = breadcrumbs.length ? breadcrumbs[0].facetValueName : undefined;
            const isFromMarketingTile = action?.payload?.query?.includes(":relevance:category:");
            const actionMeta = isFromMarketingTile ? "" : action?.payload?.query;
            const data = R.compose(
              R.ifElse(
                R.always(page > 0),
                R.concat(
                  action?.payload?.query?.length > 0 && !isFromMarketingTile
                    ? R.pathOr([], ["value", "product", "dataSearch", "products"], state$)
                    : R.pathOr([], ["value", "product", "data", "products"], state$),
                ),
                R.identity,
              ),
              R.map(mapSanitizedItems(state$.value)),
              R.map(sanitizeSolrSearchForDb),
              R.prop("products"),
            )(response.data);
            const pageIncremented = Number(page) + 1;
            if (action.meta && action.meta.onSuccess) {
              action.meta.onSuccess(pageIncremented);
            }
            return of(
              ProductActions.success(
                {
                  products: data,
                  pages: totalPages,
                  totalResults: productCount,
                  currentQuery: response.data.currentQuery?.query?.value,
                  facetValueName,
                  facets,
                  sorts,
                },
                actionMeta,
              ),
            );
          } else {
            return of(ProductActions.failure({ action, response }));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const epicAddItemToList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyWishListActions.requestAddToWishList)),
    mergeMap(async action => {
      const reqParams = {
        code: action.payload.code,
        authToken: await getUserParams(),
        langCode: getSelectedLanguage()?.code,
      };
      return api.hybris.addItemToWishListApi(reqParams).pipe(
        mergeMap(response => {
          if (response.ok) {
            action.meta.onSuccess(response?.data);
            return of(MyWishListActions.addItemToSuccess({ response }, ""));
          } else {
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure(response?.data?.error_description);
            }
            return of(MyWishListActions.addItemToFailure({ response }, ""));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );

export const epicRemoveItemFromList: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(MyWishListActions.requestRemoveFromWishList)),
    mergeMap(async action => {
      const reqParams = {
        code: action.payload.code,
        authToken: await getUserParams(),
        langCode: getSelectedLanguage()?.code,
      };
      return api.hybris.removeItemFromWishListApi(reqParams).pipe(
        mergeMap(response => {
          if (response.ok) {
            action.meta.onSuccess(response?.data);
            return of(MyWishListActions.removedItemFromSuccess({ response }, ""));
          } else {
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure(response?.data?.error_description);
            }
            return of(MyWishListActions.removedItemFromFailure({ response }, ""));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );
