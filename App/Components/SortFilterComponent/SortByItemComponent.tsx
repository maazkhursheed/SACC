import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../RadioButton/RadioButtonStyle";

const SortByItemComponent = ({ sorts }) => {
  const [selectedCode, setSelectedCode] = useState(sorts.find(sort => sort.selected).code);

  const handleSortSelect = code => {
    setSelectedCode(code);
  };

  return (
    <View style={styles.mainContainer}>
      {sorts.map(sort => {
        return (
          <View key={sort.code} style={styles.container}>
            <Text style={styles.radioText}>{sort.name}</Text>
            <TouchableOpacity style={styles.radioCircle} onPress={() => handleSortSelect(sort.code)}>
              {selectedCode === sort.code && <View style={styles.selectedRb} />}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default SortByItemComponent;
