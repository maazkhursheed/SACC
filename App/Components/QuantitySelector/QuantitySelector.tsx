import { t } from "i18next";
import { debounce } from "lodash";
import * as React from "react";
import { Keyboard, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducers";
import qStyle from "./QuantitySelectorStyle";
interface OwnProps {
  productCount: string;
  stockLevel: number;
  isCancelled: boolean;
  index: number;
  onProductCountChange: (count: number) => void;
}
type Props = OwnProps;

const QuantitySelector: React.FunctionComponent<Props> = ({ productCount, onProductCountChange, stockLevel, isCancelled, index }: Props) => {
  const [count, setCount] = React.useState<string>(String(productCount));
  const [localCount, setLocalCount] = React.useState<string>("");
  const [isClicked, setClicked] = React.useState<boolean>(false);
  const [isKeyBoardVisible, setKeyBoardVisible] = React.useState<boolean>(false);
  const { isLoading } = useSelector((state: RootState) => ({
    isLoading: state?.cart?.isLoading,
  }));
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (!isLoading) {
      setClicked(false);
      setCount(String(productCount));
    }
  }, [isLoading]);

  const keyboardDidHide = React.useCallback(() => {
    setKeyBoardVisible(false);
  }, []);

  const keyboardDidShow = React.useCallback(() => {
    setKeyBoardVisible(true);
  }, []);

  React.useEffect(() => {
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", keyboardDidHide);
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    return () => {
      keyboardHideListener.remove();
      keyboardShowListener.remove();
    };
  }, []);

  React.useEffect(() => {
    if (!isKeyBoardVisible && isCancelled) {
      setCount(String(productCount));
    }
    if (!isKeyBoardVisible && isNaN(parseInt(localCount))) {
      setCount(String(productCount));
    }
  }, [isCancelled, localCount]);

  const increaseCount = () => {
    if (parseInt(count) < stockLevel) {
      if (!isClicked) {
        setClicked(true);
        setCount(String(parseInt(count) + 1));
        setLocalCount(String(parseInt(count) + 1));
      }
    } else {
      Toast.show({
        type: "error",
        text1: t("insufficientStock"),
        topOffset: Platform.OS === "ios" ? 50 : 20,
        visibilityTime: 2000,
      });
    }
  };

  const decreaseCount = () => {
    if (parseInt(count) > 0) {
      if (!isClicked) {
        setClicked(true);
        setCount(String(parseInt(count) - 1));
        setLocalCount(String(parseInt(count) - 1));
      }
    }
  };

  const updateCount = React.useCallback(text => {
    setCount(String(parseInt(text)));
    setLocalCount(String(parseInt(text, 10)) == NaN ? "0" : String(parseInt(text)));
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateProductCount = React.useCallback(
    debounce(() => onProductCountChange(parseInt(localCount)), 1000),
    [localCount],
  );
  React.useMemo(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (parseInt(localCount) >= 0) {
        updateProductCount();
      }
    }
  }, [localCount]);
 
  return (
    <View style={qStyle.container}>
      <TouchableOpacity onPress={decreaseCount} style={qStyle.leftButton}>
        <Text style={qStyle.buttonLabel}>-</Text>
      </TouchableOpacity>

      <TextInput
        focusable={false}
        keyboardType="numeric"
        onChangeText={text => updateCount(text)}
        value={isNaN(parseInt(count)) ? "" : count}
        style={qStyle.textInput}
      />

      <TouchableOpacity onPress={increaseCount} style={qStyle.rightButton}>
        <Text style={qStyle.buttonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(QuantitySelector);
