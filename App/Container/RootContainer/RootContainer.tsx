import { StyleProvider } from "native-base";
import * as React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import getTheme from "../../../native-base-theme/components";
import material from "../../../native-base-theme/variables/material";
import ReduxNavigation from "../../Navigation/ReduxNavigation";
// Styles
import styles from "./RootContainerStyles";

interface OwnProps {}

export interface State {}

interface IStateProps {}

interface IDispatchProps {}

type Props = OwnProps & IDispatchProps & IStateProps;

export class RootContainer extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <View style={styles.mainContainer}>
          <SafeAreaView style={styles.applicationView} forceInset={{ bottom: "never" }}>
            <ReduxNavigation />
          </SafeAreaView>
        </View>
      </StyleProvider>
    );
  }
}

const mapStateToProps = (): IStateProps => ({});

const mapDispatchToProps = (): IDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
