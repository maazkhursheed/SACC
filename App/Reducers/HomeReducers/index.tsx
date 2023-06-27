import { Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated } from "typesafe-actions";
import { ReducerMap } from "~root/Lib/ReduxHelpers";
import { mapReducers } from "../../Lib/ReduxHelpers";
import { FailureRequestParam } from "../../Types/CommonTypes";

const { createAction, createStandardAction } = deprecated;

const actionCreators = {
  requestHomeScreenData: createAction("REQUEST_HOMESCREEN_DATA"),
  successHomeScreenData: createStandardAction("HOMESCREEN_DATA_SUCCESS")<any>(),
  failure: createStandardAction("HOMESCREEN_DATA_FAILURE")<FailureRequestParam>(),
  updatedHomeList: createStandardAction("UPDATED_HOME_LIST")<any>(),
};

export const HomeScreenActions = actionCreators;

export interface HomeScreenState {
  data: [] | any;
  recommendationData: [] | any;
  bestSellerData: [] | any;
  fetching: boolean;
}

export type ImmutableHomeScreenState = SI.ImmutableObject<HomeScreenState>;

export const INITIAL_STATE: ImmutableHomeScreenState = SI.from({
  data: [],
  recommendationData: [],
  bestSellerData: [],
  fetching: false,
});

export const requestHomeScreenData: Reducer<ImmutableHomeScreenState> = (state, action) =>
  state.merge({
    data: [],
    recommendationData: [],
    bestSellerData: [],
    fetching: true,
  });

export const failure: Reducer<ImmutableHomeScreenState> = (state, action) =>
  state.merge({
    fetching: false,
  });

export const successHomeScreenData: Reducer<ImmutableHomeScreenState> = (state, action) => {
  return state.merge({
    data: action.payload?.homeData,
    recommendationData: action.payload?.ourRecommendations,
    bestSellerData: action.payload?.bestSellerRecommandedProduct,
    fetching: false,
  });
};

export const updatedHomeList: Reducer<ImmutableHomeScreenState> = (state, action) => {
  let newData = {};
  if (action?.payload?.direction == "bestSeller") {
    return state.merge({ bestSellerData: action.payload?.newData });
  } else {
    return state.merge({ recommendationData: action.payload?.newData });
  }
};

const reducerMap: ReducerMap<typeof actionCreators, ImmutableHomeScreenState> = {
  requestHomeScreenData,
  successHomeScreenData,
  failure,
  updatedHomeList,
};

export const HomeReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default HomeReducer;
