import { combineEpics } from "redux-observable";
import { DeleteUserEpic, epicAuth } from "./AuthEpics";
import { epicGetHomeScreenData } from "./HomeEpics";
import { epicSearchSolr } from "./ProductEpics";

export default combineEpics(epicSearchSolr, epicAuth, epicGetHomeScreenData, DeleteUserEpic);
