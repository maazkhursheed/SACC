import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./STCHeaderStyles";

interface OwnProps {
  title: string;
  titleStyle?: any;
  leftItem?: React.ReactElement;
  rightItem?: React.ReactElement;
  style?: any;
  headerContainerStyle?: ViewStyle;
  uxCamTitleHide?: boolean;
  showHorizontalLine?: boolean;
}

type Props = OwnProps;

const STCHeader: React.SFC<Props> = ({
  title,
  titleStyle,
  leftItem,
  rightItem,
  style,
  headerContainerStyle,
  uxCamTitleHide,
  showHorizontalLine = true,
  ...remaining
}: Props) => {
  return (
    <View style={[style]} {...remaining}>
      {showHorizontalLine && (
        <View style={styles.headerStyle}>
          <View style={styles.viewStyle} />
        </View>
      )}
      <View style={[styles.header, headerContainerStyle]}>
        <View style={[styles.items, styles.viewMinWidth]}>{leftItem}</View>
        <Text ref={view => {}} style={[styles.headerTitle, titleStyle]} {...accessibility("commonHeaderLabel")}>
          {title && title.length > 23 ? title.substr(0, 22) + "..." : title}
        </Text>
        <View style={[styles.items, styles.viewMinWidth]}>{rightItem}</View>
      </View>
    </View>
  );
};

export default STCHeader;
