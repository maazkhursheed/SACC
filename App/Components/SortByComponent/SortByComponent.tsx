import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import styles from "../SortByComponent/SortByComponentStyle";
import SortByItemComponent from "../SortFilterComponent/SortByItemComponent";
interface OwnProps {
  item: any;
  onBackPress?: () => void;
  onSortingSelection: (code: string) => void;
  selectedSortCode: string;
  sortRef: any;
}

type Props = OwnProps;

const SortByComponent: React.FunctionComponent<Props> = ({ item, onBackPress, onSortingSelection, selectedSortCode, sortRef }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {t("sortBy1")}
        </Text>
        <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
          <Multiply style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <SortByItemComponent sortRef={sortRef} selectedSortCode={selectedSortCode} onSortingSelection={onSortingSelection} sorts={item} />
    </>
  );
};
export default SortByComponent;
