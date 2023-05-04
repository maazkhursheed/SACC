import * as React from "react";
import { Text, View } from "react-native";
import NumberFormat from "react-number-format";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./PriceComponentStyle";

interface Props {
  style?: any;
  containerStyle?: any;
  prefix?: string;
  value?: number | string;
  testID?: string;
  accessibilityLabel?: string;
}

const PriceComponent: React.FunctionComponent<Props> = ({ style, value, containerStyle, prefix, accessibilityLabel, testID }: Props) => {
  return (
    <View style={[styles.permissionComponentStyle, containerStyle]}>
      <NumberFormat
        defaultValue={0}
        value={value}
        displayType={"text"}
        thousandSeparator={","}
        fixedDecimalScale={true}
        decimalScale={2}
        prefix={prefix ?? "SAR "}
        renderText={formattedText => (
          <Text {...accessibility(testID || accessibilityLabel ? testID || accessibilityLabel : "productPrice")} style={style}>
            {formattedText}
          </Text>
        )}
      />
    </View>
  );
};

export default PriceComponent;
