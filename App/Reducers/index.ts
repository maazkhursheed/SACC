/// <reference types="@types/webpack-env" />
import { combineReducers } from "redux";
import root from "../Epics/";
import Api from "../Services/Api";
import AuthReducer, { ImmutableAuthState } from "./AuthReducer";
import configureStore from "./CreateStore";
import HomeReducer, { ImmutableHomeScreenState } from "./HomeReducers";
import ProductReducer, { ImmutableProductState } from "./ProductReducers";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: AuthReducer,
  product: ProductReducer,
  home: HomeReducer,
});

export interface RootState {
  auth: ImmutableAuthState;
  product: ImmutableProductState;
  home: ImmutableHomeScreenState;
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
