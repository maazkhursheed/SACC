import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import HeaderTitle from "../BestSellerHeader/BestSellerHeader";
import LoadingView from "../LoadingView";
import ShopByCategoryItem from "./ShopByCategoryItem/ShopByCategoryItem";
import styles from "./ShopByCategoryStyle";
interface StateProps {
  data?: any;
  loading?: boolean;
}

type Props = StateProps;

const ShopByCategory: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  const viewAllCategory = () => {
    navigation.navigate("CategoriContainer");
  };
  const { homeData, isLoading, shoByCategorydata } = useSelector((state: RootState) => ({
    homeData: state?.home?.data,
    shoByCategorydata: state?.home?.data?.featureCategories ?? [],
    isLoading: state?.home?.fetching,
  }));
  const { t } = useTranslation();
  let categories = shoByCategorydata?.length > 0 ? shoByCategorydata?.slice(0, 6) : [];
  return (
    <LoadingView style={styles.container} hideViewOnLoading={true} isLoading={isLoading && homeData.length === 0}>
      <HeaderTitle
        title={t("home.FeaturedCategories")}
        count={0}
        onPress={() => viewAllCategory()}
        rightText={t("home.ViewAll")}
        containerStyle={styles.containerStyle}
      />
      <FlatList
        contentContainerStyle={styles.listContainerStyle}
        data={categories}
        numColumns={2}
        renderItem={({ item, index }) => {
          const isEnd = index === categories.length - 2 || index === categories.length - 1;
          return <ShopByCategoryItem item={item} isEnd={isEnd} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </LoadingView>
  );
};

export default ShopByCategory;
