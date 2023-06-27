import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import BottomFixedButton from "../BottomFixedButton/BottomFixedButton";
import BottomFixedButtonWithTouchOpacity from "../BottomFixedButtonWithTouchOpacity";
import styles from "./CustomButtonsStyles";

interface OwnProps {
  buttonText1: string;
  buttonText2: string;
  onSubmit?: any;
}

type Props = OwnProps;

const CustomButtons: React.SFC<Props> = ({ buttonText1, buttonText2, onSubmit }: Props) => {
  const navigation = useNavigation();
  return (
    <>
      <BottomFixedButton
        onPress={() => {
          navigation.goBack();
        }}
        btnText={buttonText1}
        style={styles.bottomCancelBtnContainer}
        textStyle={styles.cancelButton}
      />
      <BottomFixedButtonWithTouchOpacity onPress={onSubmit} btnText={buttonText2} style={styles.bottomBtnContainer} textStyle={styles.secondButton} />
    </>
  );
};

export default CustomButtons;
