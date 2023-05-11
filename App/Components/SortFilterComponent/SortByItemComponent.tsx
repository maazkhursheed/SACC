import R from "ramda";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../RadioButton/RadioButtonStyle";

interface OwnProps {
  onSortingSelection: (code: string) => void;
  sorts: any;
  selectedSortCode: string;
  sortRef: any;
}
type Props = OwnProps;
const SortByItemComponent: React.FunctionComponent<Props> = ({ sorts, onSortingSelection, selectedSortCode, sortRef }: Props) => {
  const [selectedCode, setSelectedCode] = useState(
    R.isEmpty(selectedSortCode) && !R.isEmpty(sorts) ? sorts?.find(sort => sort?.selected).code : selectedSortCode,
  );

  const handleSortSelect = code => {
    setSelectedCode(code);
    onSortingSelection(code);
  };
  return (
    <View style={styles.mainContainer}>
      {sorts.map(sort => {
        return (
          <View key={sort.code} style={styles.container}>
            <Text style={styles.radioText}>{sort.name}</Text>
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => {
                handleSortSelect(sort.code);
                sortRef.current.close();
              }}
            >
              {selectedCode === sort.code && <View style={styles.selectedRb} />}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default SortByItemComponent;
