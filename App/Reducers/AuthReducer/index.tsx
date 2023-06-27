import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { IAlertCallbacks } from "../../Lib/AlertsHelper";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
const { createAction, createStandardAction } = deprecated;

const actionCreators = {
  signIn: createStandardAction("SIGN_IN")<any, IAlertCallbacks>(),
  signInDirect: createStandardAction("SIGN_IN_DIRECT")<any, IAlertCallbacks>(),
  signInSuccess: createAction("SIGN_IN_SUCCESS"),
  signInFailure: createAction("SIGN_IN_FAILURE"),
  signOut: createAction("SIGN_OUT"),
  deleteAccount: createStandardAction("DELETE_ACCOUNT")<any, IAlertCallbacks>(),
  deleteAccountSuccess: createAction("DELETE_ACCOUNT_SUCCESS"),
  deleteAccountFailure: createAction("DELETE_ACCOUNT_FAILURE"),
};

export const AuthAction = actionCreators;

export interface AuthState {
  isLoading: boolean;
  isSignOut: boolean;
}

export type AuthAction = PayloadAction<string, AuthState>;

export type ImmutableAuthState = SI.ImmutableObject<AuthState>;

/* ------------- Initial RootState ------------- */

export const INITIAL_STATE: ImmutableAuthState = SI.from({
  isLoading: false,
  isSignOut: true,
});

/* ------------- Reducers ------------- */

// @ts-ignore
export const signIn: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: true,
  });
// @ts-ignore
export const signInDirect: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: true,
  });

// @ts-ignore
export const signInSuccess: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: false,
    isSignOut: false,
  });

// @ts-ignore
export const signInFailure: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: false,
    isSignOut: true,
  });
// @ts-ignore
export const signOut: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: false,
    isSignOut: true,
  });
// @ts-ignore
export const deleteAccount: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: true,
  });

// @ts-ignore
export const deleteAccountSuccess: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: false,
  });

// @ts-ignore
export const deleteAccountFailure: Reducer<ImmutableAuthState> = (state: ImmutableAuthState) =>
  state.merge({
    isLoading: false,
  });
/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableAuthState> = {
  signIn,
  signInDirect,
  signOut,
  signInSuccess,
  signInFailure,
  deleteAccount,
  deleteAccountSuccess,
  deleteAccountFailure,
};

const AuthReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default AuthReducer;
