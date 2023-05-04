import * as React from "react";
import { View, ViewStyle } from "react-native";
import styles from "./DividerWithCircleStyle";

interface Props {
  style?: ViewStyle;
}

const DividerWithCircle: React.SFC<Props> = ({ style }: Props) => {
  return (
    <View style={[styles.devideWrapper, style]}>
      <View style={styles.dividerLine}></View>
      <View style={styles.circle}>
        <View style={styles.innerCircle}></View>
      </View>
      <View style={styles.dividerLine}></View>
    </View>
  );
};

export default DividerWithCircle;
