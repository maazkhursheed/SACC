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
};

export const HomeScreenActions = actionCreators;

export interface HomeScreenState {
  data: [] | any;
  fetching: boolean;
}

export type ImmutableHomeScreenState = SI.ImmutableObject<HomeScreenState>;

export const INITIAL_STATE: ImmutableHomeScreenState = SI.from({
  data: [],
  fetching: false,
});

export const requestHomeScreenData: Reducer<ImmutableHomeScreenState> = (state, action) =>
  state.merge({
    data: [],
    fetching: true,
  });

export const failure: Reducer<ImmutableHomeScreenState> = (state, action) =>
  state.merge({
    fetching: false,
  });

export const successHomeScreenData: Reducer<ImmutableHomeScreenState> = (state, action) =>
  state.merge({
    data: action.payload,
    fetching: false,
  });

const reducerMap: ReducerMap<typeof actionCreators, ImmutableHomeScreenState> = {
  requestHomeScreenData,
  successHomeScreenData,
  failure,
};

export const HomeReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default HomeReducer;
