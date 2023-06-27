import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import Reactotron from "reactotron-react-native";
import GenericToastComponent from "~root/Components/GenericToastComponent";
import DebugConfig from "../Config/DebugConfig";
import "../i18n";
import ReduxNavigation from "../Navigation/ReduxNavigation";
import createStore from "../Reducers";

const toastConfig = {
  cart: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"cart"} />,
  removeCart: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"removeCart"} />,
  wishList: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"wishList"} />,
  success: internalState => <GenericToastComponent internalStateText1={internalState.text1} toastType={"success"} />,
};

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
        <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      </Provider>
    );
  } else {
    return null;
  }
};

export default DebugConfig.useReactotron ? Reactotron.overlay(App) : App;
