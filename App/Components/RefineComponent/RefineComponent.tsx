import { Slider } from "@miblanchard/react-native-slider";
import * as React from "react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import RangeSlider from "rn-range-slider";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
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
  const [value, setValue] = useState(0.2);
  const refineFacetsRef = useRef<RefineFacetsRef>(null);
  const [facetsArr, setFacetsArr] = React.useState([]);
  const [updatedQuery, setUpdatedQuery] = React.useState(currentQuery);
  const [selectedValues, setSelectedValues] = useState([]);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(10000);
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
      <View style={styles.innerRootThump}></View>
    </View>
  );

  const Label = ({ text, ...restProps }) => (
    <View style={styles.rootlabel} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  const processValue = value => {
    const startString = ":relevance:category:120";
    const regex = new RegExp(startString, "g");
    const result = value.replace(regex, "");
    return startString + result;
  };

  React.useEffect(() => {
    setFilterValues();
  }, [facets]);

  const setFilterValues = () => {
    // if (selectedName !== "Filters") {
    //   setFacetsArr(facets?.filter((item: any) => item.name === selectedName));
    // } else {
    //   setFacetsArr(facets);
    // }
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
    // solrSearch({ query: queryStr, currentPage: "0" }, page => {});
  };
  const onRefinePress = () => {
    const selectedString = selectedValues.join("");
    const processedValue = processValue(selectedString);
    console.log("Final result: ", processedValue);
    console.log("Maaz: ", selectedString);
    closeSheet(updatedQuery);
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
          <TouchableOpacity onPress={handleResetClick}>
            <Text style={styles.clear}>{t("clearAll")}</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.titleBrand}>{t("priceRange")}</Text>
            <Divider style={styles.divider} />
          </View>
          <View style={styles.containerSlider}>
            <RangeSlider
              min={0}
              max={50000}
              step={1}
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
            {/*<Text>Value: {value}</Text>*/}
          </View>
          <View style={styles.priceDataFoundContainer}>
            <Text style={styles.textSAR}>{"SAR 270.00 - SAR 350"}</Text>
            <Text style={styles.textDataCount}>{`480 ${t("productFound")}`}</Text>
          </View>
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
