import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "../../Lib/AlertsHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;

/* ------------- Types and Action Creators ------------- */
type SolrSuccessCallback = (page: number) => void;

const actionCreators = {
  addItemToSuccess: createStandardAction("WISH_LIST_ACTION_SUCCESS")<any, string>(),
  addItemToFailure: createStandardAction("WISH_LIST_FAILURE")<any, string>(),
  requestAddToWishList: createStandardAction("WISH_LIST_ADD_ITEM")<any, IAlertCallbacks>(),
  removedItemFromSuccess: createStandardAction("REMOVE_WISH_LIST_ACTION_SUCCESS")<any, string>(),
  removedItemFromFailure: createStandardAction("REMOVE_WISH_LIST_FAILURE")<any, string>(),
  requestRemoveFromWishList: createStandardAction("WISH_LIST_REMOVE_ITEM")<any, IAlertCallbacks>(),
};

export const MyWishListActions = actionCreators;

export interface MyWishListState {
  fetching: boolean;
}

export type MyWishListActions = PayloadAction<string, MyWishListState>;

export type ImmutableMyWishListState = SI.ImmutableObject<MyWishListState>;

/* ------------- Initial RootState ------------- */
export const INITIAL_STATE: ImmutableMyWishListState = SI.from({
  fetching: false,
});
/* ------------- Reducers ------------- */
// @ts-ignore
export const requestAddToWishList: Reducer<ImmutableMyWishListState> = (state: ImmutableMyWishListState) => state.merge({ fetching: true });
// @ts-ignore
export const addItemToFailure: Reducer<ImmutableMyWishListState> = (state: ImmutableMyWishListState) => state.merge({ fetching: false, wishListLoader: false });
// @ts-ignore
export const addItemToSuccess: Reducer<ImmutableMyWishListState> = (state: ImmutableMyWishListState) => state.merge({ fetching: false });

export const requestRemoveFromWishList: Reducer<ImmutableMyWishListState> = (state: ImmutableMyWishListState) => state.merge({ fetching: true });
// @ts-ignore
export const removedItemFromFailure: Reducer<ImmutableMyWishListState> = (state: ImmutableMyWishListState) => state.merge({ fetching: false });
// @ts-ignore
export const removedItemFromSuccess: Reducer<ImmutableMyWishListState> = (state: ImmutableMyWishListState) => state.merge({ fetching: false });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableMyWishListState> = {
  addItemToSuccess,
  addItemToFailure,
  requestAddToWishList,
  requestRemoveFromWishList,
  removedItemFromSuccess,
  removedItemFromFailure,
};

export const WishListReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default WishListReducer;
