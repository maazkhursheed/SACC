import * as React from "react";
import { Text, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";
import styles from "./BottomFixedButtonWithTouchOpacityStyle";

interface OwnProps {
  onPress: any;
  disabled?: boolean;
  btnText: string;
  style?: ViewStyle;
  svgstyle?: any;
  isFooter?: boolean;
  textStyle?: TextStyle;
  iconColor?: string;
  iconName?: string;
  iconStyle?: ViewProps;
  SVGIcon?: any;
  touchDisabled?: boolean;
}

type Props = OwnProps;

const BottomFixedButtonWithTouchOpacity: React.SFC<Props> = ({
  SVGIcon,
  svgstyle,
  onPress,
  disabled,
  btnText,
  style,
  textStyle,
  iconName,
  touchDisabled,
}: Props) => {
  const [active, setActive] = React.useState(false);

  return (
    <View style={[disabled ? styles.bgDisabled : active ? styles.bgActive : styles.bgInActive, style]}>
      <TouchableOpacity onPress={onPress} disabled={touchDisabled}>
        <View style={[styles.textContainer, iconName || SVGIcon ? { flexDirection: "row", justifyContent: "center", alignContent: "center" } : {}]}>
          {SVGIcon && <SVGIcon width={svgstyle?.width ?? 20} height={svgstyle?.height ?? 20} />}
          {btnText && <Text style={[disabled ? styles.btnTextDisabled : styles.btnText, textStyle]}>{btnText}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomFixedButtonWithTouchOpacity;
