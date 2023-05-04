import * as React from "react";
import { ActivityIndicator, Keyboard, Platform, View, ViewProps, ViewStyle } from "react-native";
import { Colors } from "../../Themes";
import styles from "./LoadingViewStyle";

interface Props extends ViewProps {
  isLoading: boolean;
  size?: number | "small" | "large";
  children?: any;
  hideViewOnLoading?: boolean;
  showOpacity?: boolean;
  shadowStyle?: ViewStyle;
}

const LoadingView: React.SFC<Props> = ({ showOpacity, hideViewOnLoading, isLoading, size, children, shadowStyle, ...props }: Props) => {
  const [height, setHeight] = React.useState("100%");
  const keyboardDidShow = e => setHeight("60%");
  const keyboardDidHide = () => setHeight("100%");
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", keyboardDidHide);
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View {...props} pointerEvents={isLoading ? "none" : "auto"}>
      {hideViewOnLoading && isLoading ? undefined : children}
      {isLoading && (
        <View style={[styles.container, { height }, showOpacity ? [styles.showOpacityStyle, shadowStyle] : undefined]}>
          <ActivityIndicator color={Platform.OS === "android" ? Colors.darkBlue : ""} size={size ? size : "small"} />
        </View>
      )}
    </View>
  );
};

export default LoadingView;
