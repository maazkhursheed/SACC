import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from "react-redux";
import RefineFilter from "../../Images/RefineFilter/refinze.svg";
import SortFilter from "../../Images/SortFilter/SortFilter.svg";
import { RootState } from "../../Reducers";
import styles from "../FilterComponent/FilterComponentStyle";
import RefineComponent from "../RefineComponent/RefineComponent";
import SortByComponent from "../SortByComponent/SortByComponent";
interface OwnProps {
  onSortingSelection: (code: string) => void;
  selectedSortCode: string;
}
type Props = OwnProps;
const FilterComponent: React.FunctionComponent<Props> = ({ onSortingSelection, selectedSortCode }: Props) => {
  const { t } = useTranslation();
  const refRBSheet = useRef();
  const sortRBSheet = useRef();
  const { facets, sorts } = useSelector((state: RootState) => ({
    facets: state.product?.data?.facets ?? [],
    sorts: state.product?.data?.sorts ?? state.product?.dataSearch?.sorts ?? [],
  }));
  const [facetQuery, setFacetQuery] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.view1}>
        <TouchableOpacity style={styles.container} onPress={() => refRBSheet.current.open()}>
          <RefineFilter style={styles.icon} />
          <Text style={styles.text}>{t("refine")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view2}>
        <TouchableOpacity style={styles.container} onPress={() => sortRBSheet.current.open()}>
          <SortFilter style={styles.icon} />
          <Text style={styles.text}>{t("sortBy")}</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={sortRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000080",
          },
        }}
      >
        <SortByComponent
          item={sorts}
          onSortingSelection={onSortingSelection}
          selectedSortCode={selectedSortCode}
          onBackPress={() => sortRBSheet.current.close()}
          sortRef={sortRBSheet}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={800}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000080",
          },
        }}
      >
        <RefineComponent
          facets={facets}
          onBackPress={() => refRBSheet.current.close()}
          closeSheet={(updatedQuery: string) => {
            refRBSheet.current.close();
            setFacetQuery(updatedQuery);
            console.log("Facet Query ", updatedQuery);
          }}
          currentQuery={facetQuery}
        />
      </RBSheet>
    </View>
  );
};

export default FilterComponent;
