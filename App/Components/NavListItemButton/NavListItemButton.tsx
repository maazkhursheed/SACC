import * as React from "react";
import { Image, Platform, Text, TextStyle, TouchableOpacity, ViewProps, ViewStyle } from "react-native";
import { Icon } from "react-native-elements";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { isRTL, localizeImage } from "../../i18n";
import styles from "./NavListItemButtonStyle";

interface OwnProps {
  onPress: any;
  disabled?: boolean;
  btnText: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  iconName?: string;
  iconStyle?: ViewProps;
}

type Props = OwnProps;

const NavListItemButton: React.SFC<Props> = ({ onPress, disabled, btnText, style, iconColor, textStyle, iconName }: Props) => {
  return (
    <TouchableOpacity style={[styles.mainContainer, style]} onPress={disabled ? null : onPress}>
      <Text style={[styles.textStyle, textStyle]}>{btnText}</Text>
      {Platform.OS === "ios" ? (
        <Icon name={iconName ? iconName : isRTL() != "rtl" ? "chevron-right" : "chevron-left"} size={22} color={iconColor ? iconColor : Colors.Black} />
      ) : (
        <Image resizeMode={"contain"} source={localizeImage("NextIcon")} />
      )}
    </TouchableOpacity>
  );
};

export default NavListItemButton;
