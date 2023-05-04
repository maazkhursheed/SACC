import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Reactotron from "reactotron-react-native";
import DebugConfig from "../Config/DebugConfig";
import "../i18n";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import createStore from "../Reducers";

const App = () => {
  const [store, setStore] = useState(null);
  const initializeStore = async () => {
    const storeValue = await createStore();
    setStore(storeValue);
  };
  useEffect(() => {
    initializeStore();
  }, []);

  if (store) {
    return (
      <Provider store={store}>
        <ReduxNavigation />
      </Provider>
    );
  } else {
    return null;
  }
};

export default DebugConfig.useReactotron ? Reactotron.overlay(App) : App;
