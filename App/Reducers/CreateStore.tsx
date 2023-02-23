import Reactotron from "reactotron-react-native";
import { applyMiddleware, compose, createStore, Reducer } from "redux";
import { createEpicMiddleware, Epic } from "redux-observable";
import { Api } from "~root/Services/Api";
import Config from "../Config/DebugConfig";
import ScreenTracking from "./ScreenTrackingMiddleware";

export interface IDependencies {
  api: Api;
  store: () => any;
}

// creates the store
export default (rootReducer: Reducer<any>, rootEpics: Epic, dependencies: IDependencies) => {
  /* ------------- Redux Configuration ------------- */
  const middleware = [];
  const enhancers = [];

  /* ------------- Analytics Middleware ------------- */
  if (Config.useReactotron) {
    middleware.push(ScreenTracking);
  }
  /* ------------- Epic Middleware ------------- */

  const epicMiddleWare = createEpicMiddleware({ dependencies });
  middleware.push(epicMiddleWare);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  if (Config.useReactotron) {
    // @ts-ignore
    enhancers.push(Reactotron.createEnhancer());
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  // kick off root epics
  epicMiddleWare.run(rootEpics);

  return {
    store,
  };
};
