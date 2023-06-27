import * as R from "ramda";
import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap, switchMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getSelectedLanguage } from "../../i18n";
import { getSanitizedListOfAllSuggestions, getSanitizedListOfSuggestions, isResponseOk, sanitizeSolrSearchForDb } from "../../Lib/DataHelper";
import { IDependencies } from "../../Reducers/CreateStore";
import { SearchSuggestionsActions } from "../../Reducers/SearchReducers";

export const epicSearchSuggestions: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SearchSuggestionsActions.requestSearchSuggestions)),
    mergeMap(action => {
      const params = { lang: getSelectedLanguage()?.code };
      return api.hybris.searchSuggestions(action.payload, params).pipe(
        switchMap(response => {
          if (isResponseOk(response)) {
            return of(
              SearchSuggestionsActions.successSearchSuggestions({
                all: getSanitizedListOfAllSuggestions(response.data),
                data: getSanitizedListOfSuggestions(response.data),
              }),
            );
          } else {
            return of(
              SearchSuggestionsActions.failureSearchSuggestions({
                action,
                response,
              }),
            );
          }
        }),
      );
    }),
  );

export const epicSearchProductSuggestions: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(SearchSuggestionsActions.requestProductSearchSuggestions)),
    mergeMap(action => {
      const params = { lang: getSelectedLanguage()?.code };
      return api.hybris.searchSuggestionByProduct(action.payload, params).pipe(
        mergeMap(response => {
          if (isResponseOk(response)) {
            const sanitizeData = R.compose(R.map(sanitizeSolrSearchForDb), R.prop("products"))(response.data);
            return of(SearchSuggestionsActions.successProductSearchSuggestions(sanitizeData));
          } else {
            return of(SearchSuggestionsActions.failureProductSearchSuggestions({ action, response }));
          }
        }),
      );
    }),
  );
