import { Epic, ofType } from "redux-observable";
import { of } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { AuthAction } from "../../Reducers/AuthReducer";
import { IDependencies } from "../../Reducers/CreateStore";
import { removeToken, setPassword, setToken } from "../../utils";

export const epicAuth: Epic = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(AuthAction.signIn)),
    mergeMap(action => {
      const reqParams = {
        grant_type: "password",
        username: action.payload.username,
        password: action.payload.password,
        client_id: "mobile_android",
        client_secret: "secret",
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
          console.log("Error : ", error);
          removeToken();
          if (action.meta && action.meta.onFailure) {
            action.meta.onFailure(error);
          }
          return of(AuthAction.signOut());
        }),
      );
    }),
  );
