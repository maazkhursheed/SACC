/// <reference types="@types/webpack-env" />
import { combineReducers } from "redux";
import root from "~root/Epics/";
import Api from "~root/Services/Api";
import configureStore from "./CreateStore";
import ProductDetailsReducer, { ImmutableProductDetaiState } from "./ProductDetailsReducers";
/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  productDetail: ProductDetailsReducer,
});

export interface RootState {
  productDetail: ImmutableProductDetaiState;
}

export default async () => {
  let store;
  const api = Api.create;
  // tslint:disable-next-line:prefer-const
  const objStore = configureStore(reducers, root, {
    api,
    store: () => store,
  });
  store = objStore.store;
  return store;
};
