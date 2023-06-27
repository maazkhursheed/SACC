import * as RA from "ramda-adjunct";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { getType } from "typesafe-actions";
import { getSelectedLanguage } from "../../i18n";
import { getUserParams, isResponseOk, mapHomeData } from "../../Lib/DataHelper";
import { IDependencies } from "../../Reducers/CreateStore";
import { HomeScreenActions } from "../../Reducers/HomeReducers";

export const epicGetHomeScreenData = (action$, state$, { api }: IDependencies) =>
  action$.pipe(
    ofType(getType(HomeScreenActions.requestHomeScreenData)),
    mergeMap(async action => {
      const params = await getUserParams();
      const newParam = { ...params, langCode: getSelectedLanguage()?.code };
      return api.hybris.getHomeScreen(newParam).pipe(
        mergeMap(response => {
          if (isResponseOk(response) && RA.isNotNilOrEmpty(response.data)) {
            const Data = response?.data?.contentSlots?.contentSlot;
            const homeData = Data?.length > 0 ? mapHomeData(Data) : [];
            return of(
              HomeScreenActions.successHomeScreenData({
                homeData: homeData,
                ourRecommendations: homeData?.ourRecommendations,
                bestSellerRecommandedProduct: homeData?.bestSellerRecommandedProduct,
              }),
            );
          } else {
            return of(HomeScreenActions.failure({ action, response }));
          }
        }),
      );
    }),
    mergeMap(obj => from(obj)),
  );
