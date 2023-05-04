import * as React from "react";
import { Text, TextStyle, TouchableWithoutFeedback, View, ViewProps, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import styles from "./BottomFixedButtonStyle";

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
}

type Props = OwnProps;

const BottomFixedButton: React.SFC<Props> = ({ SVGIcon, svgstyle, onPress, disabled, btnText, style, textStyle, iconName }: Props) => {
  const [active, setActive] = React.useState(false);

  const onPressIn = React.useCallback((event: any) => {
    setActive(true);
  }, []);

  const onPressOut = React.useCallback((event: any) => {
    setActive(false);
  }, []);

  return (
    <View style={[disabled ? styles.bgDisabled : active ? styles.bgActive : styles.bgInActive, style]}>
      <TouchableWithoutFeedback
        onPress={!disabled ? onPress : undefined}
        onPressIn={!disabled ? onPressIn : undefined}
        onPressOut={!disabled ? onPressOut : undefined}
        {...accessibility("BottomFixedButtonTouchable")}
      >
        <View style={[styles.textContainer, iconName || SVGIcon ? { flexDirection: "row", justifyContent: "center", alignContent: "center" } : {}]}>
          {SVGIcon && <SVGIcon width={svgstyle?.width ?? 20} height={svgstyle?.height ?? 20} />}
          {/* ) : (
            iconName && <CustomIcon style={[styles.icon, iconStyle, iconColor ? { color: iconColor } : {}]} name={iconName} />
          )} */}
          {btnText && <Text style={[disabled ? styles.btnTextDisabled : styles.btnText, textStyle]}>{btnText}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BottomFixedButton;
