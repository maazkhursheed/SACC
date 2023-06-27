import { AnyAction, Reducer } from "redux";
import * as SI from "seamless-immutable";
import { deprecated, PayloadAction } from "typesafe-actions";
import { mapReducers, ReducerMap } from "../../Lib/ReduxHelpers";
import { FailureRequestParam } from "../../Types/CommonTypes";
const { createAction, createStandardAction } = deprecated;

const actionCreators = {
  requestSearchSuggestions: createStandardAction("SEARCH_SUGGESTIONS_REQUEST")<string>(),
  successSearchSuggestions: createStandardAction("SEARCH_SUGGESTIONS_SUCCESS")<[]>(),
  failureSearchSuggestions: createStandardAction("SEARCH_SUGGESTIONS_FAILURE")<FailureRequestParam>(),
  requestProductSearchSuggestions: createStandardAction("SEARCH_PRODUCT_SUGGESTIONS_REQUEST")<string>(),
  successProductSearchSuggestions: createStandardAction("SEARCH_PRODUCT_SUGGESTIONS_SUCCESS")<[]>(),
  failureProductSearchSuggestions: createStandardAction("SEARCH_PRODUCT_SUGGESTIONS_FAILURE")<FailureRequestParam>(),
  resetFields: createAction("SEARCH_SUGGESTIONS_RESET"),
  setTerm: createStandardAction("SEARCH_SUGGESTION_TERM")<string>(),
};

export const SearchSuggestionsActions = actionCreators;

export interface SearchSuggestionsState {
  data: [];
  all: [];
  term: string;
  fetching: boolean;
  productData: [];
  query: string;
}

export type SearchSuggestionsAction = PayloadAction<string, SearchSuggestionsState>;

export type ImmutableSearchSuggestionsState = SI.ImmutableObject<SearchSuggestionsState>;

/* ------------- Initial State ------------- */

export const INITIAL_STATE: ImmutableSearchSuggestionsState = SI.from({
  data: [],
  term: "",
  all: [],
  fetching: false,
  productData: [],
});

/* ------------- Reducers ------------- */

export const requestSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState) => state.merge({ fetching: true });

export const successSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (
  state: ImmutableSearchSuggestionsState,
  action: AnyAction & { payload: any },
) =>
  state.merge({
    fetching: false,
    data: action.payload?.data,
    all: action.payload?.all,
  });

export const failureSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState) => state.merge({ fetching: false });

export const failureProductSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState) =>
  state.merge({ fetching: false });

export const requestProductSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState) =>
  state.merge({ fetching: true });

export const successProductSearchSuggestions: Reducer<ImmutableSearchSuggestionsState> = (
  state: ImmutableSearchSuggestionsState,
  action: AnyAction & { payload: any },
) =>
  state.merge({
    fetching: false,
    productData: action.payload,
  });

export const resetFields: Reducer<ImmutableSearchSuggestionsState> = () => INITIAL_STATE;

export const setTerm: Reducer<ImmutableSearchSuggestionsState> = (state: ImmutableSearchSuggestionsState, action: any) => state.merge({ term: action.payload });

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actionCreators, ImmutableSearchSuggestionsState> = {
  requestSearchSuggestions,
  failureSearchSuggestions,
  successSearchSuggestions,
  requestProductSearchSuggestions,
  failureProductSearchSuggestions,
  successProductSearchSuggestions,
  setTerm,
  resetFields,
};

export const SearchSuggestionsReducer = mapReducers(INITIAL_STATE, reducerMap, actionCreators);

export default SearchSuggestionsReducer;
