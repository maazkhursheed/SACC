import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { FailureRequestParam } from "../../Types/CommonTypes";
import { ISearchSolrParams } from "../../Types/SearchAPITypes";

const { createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */
type SolrSuccessCallback = (page: number) => void;

const actionCreators = {
  requestSearchSolr: createStandardAction("REQUEST_SOLR_SEARCH")<ISearchSolrParams | undefined, SolrSuccessCallback | undefined>(),
  success: createStandardAction("PRODUCT_SUCCESS")<any, string>(),
  failure: createStandardAction("PRODUCT_FAILURE")<FailureRequestParam>(),
  clearProductList: createStandardAction("CLEARE_PRODUCT_LIST")(),
};

export const ProductActions = actionCreators;

export interface ProductState {
  data?: any | null;
  dataSearch?: any | null;
  fetching: boolean;
  productDetails?: any;
  productDetailsLoader: boolean;
  facets: any;
  isShowReset: boolean;
  fetchingTopCategoryProducts: boolean;
  substituteAlternateProducts?: any;
  substituteRelatedProducts?: any;
}
export const showDeliveryTime = () => {
  const time = new Date().getHours();
  if (time < 7) {
    return "(Your order will be delivered in the morning after 7 AM)";
  } else if (time < 16) {
    return "(Delivered in 1-2 hrs depending on branch)";
  } else {
    return "(Your order will be delivered tomorrow)";
  }
};
export type ProductAction = PayloadAction<string, ProductState>;

export type ImmutableProductState = SI.ImmutableObject<ProductState>;

/* ------------- Initial RootState ------------- */
export const INITIAL_STATE: ImmutableProductState = SI.from({
  data: undefined,
  dataSearch: undefined,
  fetching: false,
  productDetails: undefined,
  productDetailsLoader: false,
  facets: undefined,
  isShowReset: false,
  fetchingTopCategoryProducts: false,
  substituteAlternateProducts: undefined,
  substituteRelatedProducts: undefined,
});
/* ------------- Reducers ------------- */
// @ts-ignore
export const request: Reducer<ImmutableProductState> = (state: ImmutableProductState, { payload }) => state.merge({ fetching: true });
// @ts-ignore
export const failure: Reducer<ImmutableProductState> = (state: ImmutableProductState) => state.merge({ fetching: false, productDetailsLoader: false });
// @ts-ignore
export const success: Reducer<ImmutableProductState> = (state: ImmutableProductState, action: AnyAction & { payload?: any; meta: any }) => {
  if (action.payload === undefined) {
    return state.merge({
      data: undefined,
      dataSearch: undefined,
      fetching: false,
    });
  } else if (action.meta?.length) {
    return state.merge({ dataSearch: action.payload, fetching: false });
  } else {
    return state.merge({
      data: action.payload,
      fetching: false,
    });
  }
};

export const clearProductList: Reducer<ImmutableProductState> = state => state.merge({ data: undefined, dataSearch: undefined, fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableProductState> = {
  success,
  failure,
  requestSearchSolr: request,
  clearProductList,
};

export const ProductReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default ProductReducer;
