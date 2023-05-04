import * as RA from "ramda-adjunct";
import { ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { isResponseOk, mapHomeData } from "../../Lib/DataHelper";
import { IDependencies } from "../../Reducers/CreateStore";
import { HomeScreenActions } from "../../Reducers/HomeReducers";

export const epicGetHomeScreenData = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(HomeScreenActions.requestHomeScreenData)),
    mergeMap(action => {
      return api.hybris.getHomeScreen().pipe(
        mergeMap(response => {
          if (isResponseOk(response) && RA.isNotNilOrEmpty(response.data)) {
            const Data = response?.data?.contentSlots?.contentSlot;
            const homeData = Data?.length > 0 ? mapHomeData(Data) : [];
            return of(HomeScreenActions.successHomeScreenData(homeData));
          } else {
            return of(HomeScreenActions.failure({ action, response }));
          }
        }),
      );
    }),
  );
