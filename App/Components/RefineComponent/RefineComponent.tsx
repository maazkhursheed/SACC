import * as React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import { ProductActions } from "../../Reducers/ProductReducers";
import RefineFacetsComponent, { RefineFacetsRef } from "../BrandFacetComponent/RefineFacetsComponent";
import styles from "../RefineComponent/RefineComponentStyle";

interface OwnProps {
  facets: any;
  onBackPress?: () => void;
  currentQuery: string;
  closeSheet: (updatedQuery: string) => void;
  selectedSortCode: string;
  params: any;
  searchTerm: string;
}

type Props = OwnProps;

const RefineComponent: React.FunctionComponent<Props> = ({ facets, onBackPress, currentQuery, closeSheet, selectedSortCode, params, searchTerm }: Props) => {
  const { t } = useTranslation();
  const refineFacetsRef = useRef<RefineFacetsRef>(null);
  const [updatedQuery, setUpdatedQuery] = React.useState(currentQuery);
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const { dataSearch, term } = useSelector((state: RootState) => ({
    dataSearch: state.product?.dataSearch?.products,
    term: state.search?.term,
  }));

  const processValue = value => {
    const dataToSplit = value.split(value.split(":")[0] + ":relevance:");
    let data = value.split(":")[0] + ":relevance:";
    for (let i = 0; i < dataToSplit.length; i++) {
      if (i > 0) {
        const lastDelimiter = i < dataToSplit.length - 1 ? ":" : "";
        data += dataToSplit[i] + lastDelimiter;
      }
    }
    if (dataSearch?.length > 0) {
      const startString = data;
      const regex = new RegExp(startString, "g");
      const result = value.replace(regex, "");
      return startString;
    } else {
      const startString = params?.categoryId;
      const regex = new RegExp(startString, "g");
      const result = value.replace(regex, "");
      return startString + result;
    }
  };

  const callRootApi = () => {
    const data = params?.categoryId;
    apiCall({ query: data, currentPage: "0", sort: selectedSortCode }, 1);
  };

  const handleResetClick = text => {
    if (dataSearch?.length > 0) {
      if (selectedValues.length > 0) {
        setSelectedValues([]);
      }
      apiCall({ query: searchTerm, currentPage: "0" }, 1);
      closeSheet();
    } else {
      if (selectedValues.length > 0) {
        setSelectedValues([]);
      } else {
        dispatch(ProductActions.clearProductList());
        callRootApi();
      }
    }
  };
  const onFacetTapped = (queryStr: string) => {
    setUpdatedQuery(queryStr);
  };
  const onRefinePress = () => {
    const selectedString = selectedValues.join("");
    const processedValue = processValue(selectedString);
    apiCall({ query: processedValue, currentPage: "0" }, 1);
    closeSheet(updatedQuery);
  };

  const apiCall = (param, callback) => {
    dispatch(ProductActions.requestSearchSolr(param, callback));
  };

  return (
    <>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {t("refine")}
        </Text>
        <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
          <Multiply style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={[styles.scrollContainer, { flexGrow: 1 }]} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              handleResetClick(term);
            }}
          >
            <Text style={styles.clear}>{t("clearAll")}</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 20 }}>
            <FlatList
              data={facets}
              renderItem={({ item }) => (
                <RefineFacetsComponent
                  ref={refineFacetsRef}
                  facets={item}
                  onFacetTapped={(queryStr: string) => onFacetTapped(queryStr)}
                  showMore={true}
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.fixedContainer}>
        <View style={styles.refineContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onBackPress}>
            <Text style={styles.textShop}>{t("Cancel").toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.refineButton} onPress={onRefinePress}>
            <Text style={styles.text}>{t("refine").toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default RefineComponent;
