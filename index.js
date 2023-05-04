/**
 * @format
 */
import "react-native-gesture-handler";
import "./App/Config/ReactotronConfig";
import { AppRegistry } from "react-native";
import App from "./App/Container/App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
