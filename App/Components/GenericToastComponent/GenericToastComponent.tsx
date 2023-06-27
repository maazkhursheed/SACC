import * as React from "react";
import { Image, Platform } from "react-native";
import CustomIcon from "~root/Components/CustomIcon";
import { Images } from "../../Themes";
import GenericToast from "./GenericToast";
import styles from "./GenericToastComponentStyle";

interface OwnProps {
  internalStateText1?: any;
  internalStateText2?: any;
  toastType?: string;
  children?: any;
}

type Props = OwnProps;
const GenericToastComponent: React.FunctionComponent<Props> = ({ internalStateText1, internalStateText2, toastType, children }: Props) => {
  const getIconType = React.useCallback(() => {
    let type;
    switch (toastType) {
      case "cart":
      case "wishList":
      case "removeCart":
        type =
          Platform.OS === "ios" ? (
            <CustomIcon name={"success"} style={styles.successToast} />
          ) : (
            <Image source={Images.Success} style={styles.successToast} width={20} height={20} />
          );
        break;
      case "success":
        type =
          Platform.OS === "ios" ? (
            <CustomIcon name={"success"} style={styles.successToast} />
          ) : (
            <Image source={Images.Success} style={styles.successToast} width={20} height={20} />
          );
        break;
    }
    return type;
  }, [toastType]);

  const viewToastByType = () => {
    let type;
    switch (toastType) {
      case "cart":
      case "success":
      case "wishList":
      case "removeCart":
        type = <GenericToast internalStateText1={internalStateText1} toastType={toastType} getIconType={getIconType} internalStateText2={internalStateText2} />;
        break;
    }
    return type;
  };
  return viewToastByType();
};

export default GenericToastComponent;
