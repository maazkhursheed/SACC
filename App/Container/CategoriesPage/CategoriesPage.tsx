import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RangeSlider from "rn-range-slider";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import HeaderTitle from "../../Components/BestSellerHeader/BestSellerHeader";
import FullHeader from "../../Components/FullHeader/FullHeader";
import LoadingView from "../../Components/LoadingView";
import ShopByCategoryItem from "../../Components/ShopByCategory/ShopByCategoryItem/ShopByCategoryItem";
import styles from "./CategoriesPageStyles";
const SettingsScreen = ({ navigation }) => {
  const { homeData, isLoading, shoByCategorydata } = useSelector((state: RootState) => ({
    homeData: state?.home?.data,
    shoByCategorydata: state?.home?.data?.featureCategories ?? [],
    isLoading: state?.home?.fetching,
  }));
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

  const dispatch = useDispatch();
  const { t } = useTranslation();
  let categories = shoByCategorydata?.length > 0 ? shoByCategorydata : [];
  return (
    <AnimationProvider>
      <FullHeader />
      <LoadingView style={styles.container} hideViewOnLoading={true} isLoading={isLoading && homeData.length === 0}>
        <RangeSlider
          style={styles.slider}
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
        <FlatList
          contentContainerStyle={styles.listContainerStyle}
          data={categories}
          numColumns={2}
          ListHeaderComponent={<HeaderTitle title={"Categories"} containerStyle={styles.containerStyle} headerStyle={styles.headerTextStyle} />}
          ListFooterComponent={<View style={styles.footerContaiber}></View>}
          renderItem={({ item, index }) => {
            const isEnd = index === categories.length - 2 || index === categories.length - 1;
            return <ShopByCategoryItem item={item} isEnd={isEnd} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View>
                <Text>{t("noproductsFound")}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </LoadingView>
    </AnimationProvider>
  );
};

export default SettingsScreen;
