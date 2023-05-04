import * as R from "ramda";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../RadioButton/RadioButtonStyle";

interface OwnProps {
  data: any;
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  onFacetTap: (query: string) => void;
}
type Props = OwnProps;
const RefineFilterItemComponent: React.FunctionComponent<Props> = ({ data, selectedValues, setSelectedValues, onFacetTap }: Props) => {
  const handleValueChanges = value => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(val => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };
  return (
    <>
      {data?.name && (
        <View key={data.name} style={styles.refineContainer}>
          <TouchableOpacity
            style={styles.refineRadioCircle}
            onPress={() => {
              handleValueChanges(R.pathOr("", ["query", "query", "value"])(data));
              R.compose(onFacetTap, R.pathOr("", ["query", "query", "value"]))(data);
            }}
          >
            {selectedValues.includes(data.name) && <View style={styles.refineSelectedButton} />}
          </TouchableOpacity>
          <Text style={styles.refineRadioText}>
            {data.name} {`(${data.count})`}
          </Text>
        </View>
      )}
    </>
  );
};
export default RefineFilterItemComponent;
