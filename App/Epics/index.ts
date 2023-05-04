import { combineEpics } from "redux-observable";
import { epicSearchSolr } from "~root/Epics/ProductEpics";
import { epicAuth } from "./AuthEpics";
import { epicGetHomeScreenData } from "./HomeEpics";

export default combineEpics(epicSearchSolr, epicAuth, epicGetHomeScreenData);
