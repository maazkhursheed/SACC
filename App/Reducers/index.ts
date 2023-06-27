/// <reference types="@types/webpack-env" />
import { combineReducers } from "redux";
import root from "../Epics/";
import Api from "../Services/Api";
import AuthReducer, { ImmutableAuthState } from "./AuthReducer";
import CartReducer, { ImmutableCartState } from "./CartReducer";
import configureStore from "./CreateStore";
import HomeReducer, { ImmutableHomeScreenState } from "./HomeReducers";
import WishListReducer, { ImmutableMyWishListState } from "./MyWishListReducers";
import ProductReducer, { ImmutableProductState } from "./ProductReducers";
import SearchSuggestionsReducer, { ImmutableSearchSuggestionsState } from "./SearchReducers";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  home: HomeReducer,
  search: SearchSuggestionsReducer,
  wishList: WishListReducer,
  cart: CartReducer,
});

export interface RootState {
  auth: ImmutableAuthState;
  product: ImmutableProductState;
  home: ImmutableHomeScreenState;
  search: ImmutableSearchSuggestionsState;
  wishList: ImmutableMyWishListState;
  cart: ImmutableCartState;
}

export default async () => {
  let store;
  const api = Api.create;
  // tslint:disable-next-line:prefer-const
  const objStore = configureStore(reducers, root, {
    api,
    db: {},
    store: () => store,
  });
  store = objStore.store;
  return store;
};
