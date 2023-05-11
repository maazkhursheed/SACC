import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let categories = shoByCategorydata?.length > 0 ? shoByCategorydata : [];
  return (
    <AnimationProvider>
      <FullHeader />
      <LoadingView style={styles.container} hideViewOnLoading={true} isLoading={isLoading && homeData.length === 0}>
        <FlatList
          contentContainerStyle={styles.listContainerStyle}
          data={categories}
          numColumns={2}
          ListHeaderComponent={<HeaderTitle title={t("CategoriesHeader")} containerStyle={styles.containerStyle} headerStyle={styles.headerTextStyle} />}
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
