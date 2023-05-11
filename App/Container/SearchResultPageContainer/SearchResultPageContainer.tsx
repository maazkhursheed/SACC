import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "~root/Components/MainContainer";
import { accessibility } from "~root/Lib/DataHelper";
import BestSellersCartItemComponent from "../../Components/BestSellersCartComponent/BestSellerCartComponentItem";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import FullHeader from "../../Components/FullHeader/FullHeader";
import LoadingView from "../../Components/LoadingView/LoadingView";
import SearchHeader from "../../Components/SearchHeader";
import { RootState } from "../../Reducers";
import { ProductActions } from "../../Reducers/ProductReducers";
import styles from "./SearchResultPageContainerStyle";

interface StateProps {
  data?: any;
  loading?: boolean;
  searchPageCount: number;
  route: any;
}

type Props = StateProps;

const SearchResultPageContainer: React.SFC<Props> = ({ route }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let onEndReachedCalledDuringMomentum = true;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSortCode, setSelectedSortCode] = useState("");
  const { products, searchPageCount, totalResults, loading, facets, data } = useSelector((state: RootState) => ({
    data: state.product,
    products: state.product?.dataSearch ? state.product?.dataSearch?.products : state.product?.data ? state.product?.data?.products : [],
    searchPageCount: state.product?.dataSearch ? R.pathOr(0, ["product", "dataSearch", "pages"], state) : R.pathOr(0, ["product", "data", "pages"], state),
    totalResults: state.product?.dataSearch
      ? R.pathOr(0, ["product", "dataSearch", "totalResults"], state)
      : R.pathOr(0, ["product", "data", "totalResults"], state),
    loading: state.product?.fetching,
    facets: state.product.facets ?? [],
  }));
  const callRootApi = () => {
    const data = route.params?.searchText;
    apiCall({ query: data, currentPage: "0", sort: selectedSortCode }, 1);
  };

  const apiCall = (param, callback) => {
    dispatch(ProductActions.requestSearchSolr(param, callback));
  };

  useEffect(() => {
    callRootApi();
  }, [selectedSortCode]);

  const handleMoreData = () => {
    if (currentPage < searchPageCount - 1) {
      let queryStr = "";
      if (route.params?.searchText?.length > 0) {
        queryStr = route.params?.searchText;
      }
      apiCall({ query: queryStr, currentPage: (currentPage + 1).toString() }, 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const renderMessageForNoProducts = () => {
    return (
      <View style={styles.noMatchTxtContainer}>
        <Text style={styles.noMatchTxt}>{t("noproductsFound")}</Text>
        <TouchableOpacity onPress={callRootApi}>
          <Text style={styles.browseProducts}>{t("browseAllProducts")}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderFooter = () => {
    return loading && currentPage < searchPageCount ? (
      <LoadingView style={[styles.loadingView, { marginBottom: facets.length > 0 ? 94 : 34 }]} isLoading={true} />
    ) : (
      <View style={{ marginBottom: facets.length > 0 ? 70 : 10, paddingBottom: 40 }} />
    );
  };

  const onBackPress = () => {
    dispatch(ProductActions.clearProductList());
    navigation.goBack();
  };
  function onSortSelection(sort: any) {
    setSelectedSortCode(sort);
  }
  const renderHeader = () => {
    return (
      <View style={{ marginHorizontal: -16 }}>
        <Text style={styles.productCountStyle}>
          {totalResults} {t("products")}
        </Text>
      </View>
    );
  };

  const scrollY = new Animated.Value(0);

  return (
    <>
      <MainContainer>
        <FullHeader />
        <FilterComponent selectedSortCode={selectedSortCode} onSortingSelection={onSortSelection} />
        <SearchHeader title={t("searchHeader")} subTitle={route.params?.searchText} onBackPress={onBackPress} />
        <LoadingView style={styles.container} isLoading={loading && searchPageCount === 0}>
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[totalResults > 0 && styles.listContainerStyle]}
            data={products}
            onEndReachedThreshold={0.02}
            numColumns={1}
            bounces={false}
            renderItem={({ item }) => {
              return <BestSellersCartItemComponent item={item} />;
            }}
            onTouchStart={() => {
              onEndReachedCalledDuringMomentum = false;
            }}
            onEndReached={() => {
              if (!onEndReachedCalledDuringMomentum) {
                handleMoreData();
                onEndReachedCalledDuringMomentum = true;
              }
            }}
            {...accessibility("PLPFlatList")}
            keyExtractor={(item, index) => (item ? item.SKU : index.toString())}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={totalResults > 0 ? renderHeader : <></>}
            ListEmptyComponent={!loading ? renderMessageForNoProducts : undefined}
            onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}
          />
        </LoadingView>
      </MainContainer>
    </>
  );
};

export default SearchResultPageContainer;
