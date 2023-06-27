import * as Keychain from "react-native-keychain";
import { Epic, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import AppConfig from "../../Config/AppConfig";
import { getSelectedLanguage } from "../../i18n";
import { AuthAction } from "../../Reducers/AuthReducer";
import { IDependencies } from "../../Reducers/CreateStore";
import { Token } from "../../Types/CommonTypes";
import { removeToken, setAnonymousToken, setPassword, setToken } from "../../utils";

export const epicAuth: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AuthAction.signIn)),
    mergeMap(action => {
      const reqParams = {
        grant_type: AppConfig.GRANT_TYPE,
        username: action.payload.username,
        password: action.payload.password,
        client_id: AppConfig.CLIENT_ID,
        client_secret: AppConfig.CLIENT_SECRET,
        langCode: getSelectedLanguage()?.code,
      };
      return api.hybris.authorization(reqParams).pipe(
        mergeMap(response => {
          if (response.ok) {
            setToken(action, response);
            setPassword(action);
            return of(AuthAction.signInSuccess());
          } else {
            removeToken();
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure(response?.data?.error_description);
            }
            return of(AuthAction.signInFailure());
          }
        }),
        catchError(error => {
          removeToken();
          if (action.meta && action.meta.onFailure) {
            action.meta.onFailure(error);
          }
          return of(AuthAction.signOut());
        }),
      );
    }),
  );

export const epicAuthDirect: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AuthAction.signInDirect)),
    mergeMap(action => {
      const reqParams = {
        grant_type: AppConfig.GRANT_TYPE_GUEST,
        client_id: AppConfig.CLIENT_ID,
        client_secret: AppConfig.CLIENT_SECRET,
        langCode: getSelectedLanguage()?.code,
      };
      return api.hybris.directAuthorization(reqParams).pipe(
        mergeMap(response => {
          if (response.ok) {
            setAnonymousToken(action, response);
            return of(AuthAction.signInSuccess());
          } else {
            removeToken();
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure(response?.data?.error_description);
            }
            return of(AuthAction.signInFailure());
          }
        }),
        catchError(error => {
          removeToken();
          if (action.meta && action.meta.onFailure) {
            action.meta.onFailure(error);
          }
          return of(AuthAction.signOut());
        }),
      );
    }),
  );

export const DeleteUserEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AuthAction.deleteAccount)),
    mergeMap(action => {
      const reqParams = {
        username: action.payload.username,
        authToken: action.payload.auth,
        langCode: getSelectedLanguage()?.code,
      };
      return api.hybris.deleteAccountApi(reqParams).pipe(
        mergeMap(response => {
          if (response.ok) {
            if (action.meta && action.meta.onSuccess) {
              action.meta.onSuccess();
            }
            return of(AuthAction.deleteAccountSuccess());
          } else {
            if (action.meta && action.meta.onFailure) {
              action.meta.onFailure(response?.data?.error_description);
            }
            return of(AuthAction.deleteAccountFailure());
          }
        }),
      );
    }),
  );

export const SignOutEpic: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AuthAction.signOut)),
    mergeMap(async action => {
      await Keychain.resetInternetCredentials(Token.AccessTokenKey);
      await Keychain.resetInternetCredentials(Token.RefreshTokenKey);
      return of(AuthAction.signOut());
    }),
    mergeMap(obj => from(obj)),
  );
