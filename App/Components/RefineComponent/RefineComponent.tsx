import * as R from "ramda";
import * as React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import RangeSlider from "rn-range-slider";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { ProductActions } from "../../Reducers/ProductReducers";
import RefineFacetsComponent, { RefineFacetsRef } from "../BrandFacetComponent/RefineFacetsComponent";
import Divider from "../Divider";
import styles from "../RefineComponent/RefineComponentStyle";

interface OwnProps {
  facets: any;
  onBackPress?: () => void;
  currentQuery: string;
  closeSheet: (updatedQuery: string) => void;
}

type Props = OwnProps;

const RefineComponent: React.FunctionComponent<Props> = ({ facets, onBackPress, currentQuery, closeSheet }: Props) => {
  const { t } = useTranslation();
  const refineFacetsRef = useRef<RefineFacetsRef>(null);
  const [updatedQuery, setUpdatedQuery] = React.useState(currentQuery);
  const [selectedValues, setSelectedValues] = useState([]);
  const priceFacets = R.pathOr([], ["0", "values"], facets);
  const [getPriceFacet, setGetPriceFacet] = useState(priceFacets.find(item => item.selected === true) || []);
  const dispatch = useDispatch();

  const [low, setLow] = useState(1);
  const [high, setHigh] = useState(1000);
  const renderThumb = React.useCallback(() => <Thumb />, []);
  const renderRail = React.useCallback(() => <View style={styles.root} />, []);
  const renderRailSelected = React.useCallback(() => <View style={styles.rootselected} />, []);
  const renderLabel = React.useCallback(value => <Label text={value} />, []);
  const renderNotch = React.useCallback(() => <View style={styles.rootnotch} />, []);
  const handleValueChange = React.useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  const Thumb = () => (
    <View style={styles.rootThump}>
      <View style={styles.innerRootThump} />
    </View>
  );

  const Label = ({ text, ...restProps }) => (
    <View style={styles.rootlabel} {...restProps}>
      <Text style={styles.labelText}>{text}</Text>
    </View>
  );

  const getFacetObject = (low, high, facets) => {
    if (low >= 50 && high <= 100) {
      return facets.find(facet => facet.name === "SAR50-SAR100");
    } else if (low >= 101 && high <= 200) {
      return facets.find(facet => facet.name === "SAR101-SA200");
    } else if (low >= 201 && high <= 300) {
      return facets.find(facet => facet.name === "SAR201-SAR300");
    } else if (low >= 301 && high <= 400) {
      return facets.find(facet => facet.name === "SAR301-SAR400");
    } else if (low >= 401 && high <= 500) {
      return facets.find(facet => facet.name === "SAR401-SAR500");
    } else {
      return facets.find(facet => facet.name === "SAR501-Highest price");
    }
  };

  const getObtainedPriceFacet = () => {
    // if (priceFacets.find(item => item.selected === true) != undefined || null) {
    //   return priceFacets.find(item => item.selected === true);
    // }
    if (getFacetObject(low, high, priceFacets) !== undefined || null) {
      return getFacetObject(low, high, priceFacets);
    } else {
      return { count: 0, name: "Nothing Selected" };
    }
  };

  const processValue = value => {
    const startString = ":relevance:category:120";
    const regex = new RegExp(startString, "g");
    const result = value.replace(regex, "");
    return startString + result;
  };

  const handleResetClick = () => {
    if (refineFacetsRef.current) {
      refineFacetsRef.current.handleResetClick();
    }
    setSelectedValues([]);
  };
  const onFacetTapped = (queryStr: string) => {
    setUpdatedQuery(queryStr);
    console.log("Query: ", queryStr);
  };
  const onRefinePress = () => {
    selectedValues.push(R.pathOr([], ["query", "query", "value"])(getFacetObject(low, high, priceFacets)));
    const selectedString = selectedValues.join("");
    const processedValue = processValue(selectedString);
    apiCall({ query: processedValue, currentPage: "0" }, 1);
    closeSheet(updatedQuery);
  };

  const apiCall = (param, callback) => {
    dispatch(ProductActions.requestSearchSolr(param, callback));
  };

  return (
    <View>
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {t("refine")}
        </Text>
        <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
          <Multiply style={styles.crossIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={handleResetClick}>
          <Text style={styles.clear}>{t("clearAll")}</Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.titleBrand}>{t("priceRange")}</Text>
          <Divider style={styles.divider} />
        </View>
        <View style={styles.containerSlider}>
          <RangeSlider
            min={50}
            max={2000}
            step={100}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        </View>
        <View style={styles.priceDataFoundContainer}>
          <Text style={styles.textSAR}>{getObtainedPriceFacet()?.name}</Text>
          <Text style={styles.textDataCount}>
            {getObtainedPriceFacet()?.count} {t("productFound")}
          </Text>
        </View>
        <FlatList
          data={facets}
          style={{ paddingHorizontal: 20, marginBottom: 100, backgroundColor: "red" }}
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
    </View>
  );
};

export default RefineComponent;
