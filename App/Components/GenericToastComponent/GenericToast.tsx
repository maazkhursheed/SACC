import React from "react";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import Toast from "react-native-toast-message";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import styles from "./GenericToastComponentStyle";
interface Props extends ViewProps {
  internalStateText1?: any;
  toastType?: string;
  getIconType?: any;
  internalStateText2?: string;
}

const GenericToast: React.FC<Props> = ({ internalStateText1, toastType, getIconType, internalStateText2 }: Props) => {
  return (
    <View style={[styles.base, toastType === "removeCart" && styles.removeBase]}>
      <View style={styles.iconContainer}>{getIconType()}</View>
      <View style={styles.contentContainer}>
        <View>
          <View>
            <Text style={[styles.text1, toastType === "removeCart" && styles.textwhite]} numberOfLines={1}>
              {internalStateText1}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={Toast.hide} {...accessibility("crossIcon")}>
        <Multiply style={[styles.iconClose, toastType === "removeCart" && styles.removeIcon]} />
      </TouchableOpacity>
    </View>
  );
};

export default GenericToast;
