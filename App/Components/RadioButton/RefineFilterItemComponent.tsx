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
    <View>
      {data?.name && (
        <TouchableOpacity
          style={{ flexDirection: "row", paddingBottom: 17 }}
          onPress={() => {
            handleValueChanges(R.pathOr("", ["query", "query", "value"])(data));
            R.compose(onFacetTap, R.pathOr("", ["query", "query", "value"]))(data);
          }}
        >
          <View>
            {selectedValues.includes(R.pathOr("", ["query", "query", "value"])(data)) || R.pathOr(false, ["selected"])(data) === true ? (
              <View style={styles.refineSelectedButton} />
            ) : (
              <View style={styles.refineRadioCircle} />
            )}
          </View>
          <Text style={styles.refineRadioText}>
            {data.name} {`(${data.count})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default RefineFilterItemComponent;
