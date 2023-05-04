import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import BottomFixedButton from "../BottomFixedButton/BottomFixedButton";
import styles from "./CustomButtonsStyles";

interface OwnProps {
  navigateTo: any;
  buttonText1: string;
  buttonText2: string;
}

type Props = OwnProps;

const CustomButtons: React.SFC<Props> = ({ navigateTo, buttonText1, buttonText2 }: Props) => {
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
      <BottomFixedButton
        onPress={() => {
          navigation.navigate(navigateTo);
        }}
        btnText={buttonText2}
        style={styles.bottomBtnContainer}
        textStyle={styles.secondButton}
      />
    </>
  );
};

export default CustomButtons;
