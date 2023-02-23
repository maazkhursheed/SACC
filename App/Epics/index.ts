import { combineEpics } from "redux-observable";
import { epicProductClear, epicProductDetails, epicRelatedAndSubstituteProducts } from "~root/Epics/ProductEpics";

export default combineEpics(epicProductClear, epicProductDetails, epicRelatedAndSubstituteProducts);
