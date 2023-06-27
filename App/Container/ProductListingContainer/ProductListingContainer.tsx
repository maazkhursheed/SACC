import { useIsFocused, useRoute } from "@react-navigation/native";
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
import SmallHeader from "../../Components/SmallHeader";
import { RootState } from "../../Reducers";
import { ProductActions } from "../../Reducers/ProductReducers";
import styles from "./ProductListingContainerStyle";

interface StateProps {
  data?: any;
  loading?: boolean;
  searchPageCount: number;
  navigation: any;
  route: any;
}

type Props = StateProps;

const ProductListingContainer: React.SFC<Props> = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const myRoute = useRoute();
  let onEndReachedCalledDuringMomentum = true;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedSortCode, setSelectedSortCode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const isFocused = useIsFocused();
  const { products, searchPageCount, totalResults, loading, facets, cartLoading, isWishListLoading } = useSelector((state: RootState) => ({
    products: state.product?.dataSearch ? state.product?.dataSearch?.products : state.product?.data ? state.product?.data?.products : [],
    searchPageCount: state.product?.dataSearch ? R.pathOr(0, ["product", "dataSearch", "pages"], state) : R.pathOr(0, ["product", "data", "pages"], state),
    totalResults: state.product?.dataSearch
      ? R.pathOr(0, ["product", "dataSearch", "totalResults"], state)
      : R.pathOr(0, ["product", "data", "totalResults"], state),
    loading: state.product?.fetching,
    cartLoading: state.cart.isLoading,
    facets: state.product.facets ?? [],
    isWishListLoading: state?.wishList?.fetching,
  }));
  const item = route?.params?.item;
  const params = route?.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCategoryId(params?.categoryId ?? "");
      callRootApi();
    });
    return unsubscribe;
  }, [navigation, isFocused]);

  useEffect(() => {
    callRootApi();
  }, [selectedSortCode]);

  const callRootApi = () => {
    const data = params?.categoryId;
    apiCall({ query: data, currentPage: "0", sort: selectedSortCode }, 1);
  };

  const apiCall = (param, callback) => {
    dispatch(ProductActions.requestSearchSolr(param, callback));
  };

  const handleMoreData = () => {
    if (currentPage < searchPageCount - 1) {
      let queryStr = "";
      if (categoryId?.length > 0) {
        queryStr = categoryId;
      }
      apiCall({ query: queryStr, currentPage: (currentPage + 1).toString() }, 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const onBackPress = () => {
    setSelectedSortCode("");
    dispatch(ProductActions.clearProductList());
    navigation.goBack();
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

  const renderHeader = () => {
    return (
      <View style={{ marginHorizontal: -16 }}>
        <Text style={styles.productCountStyle}>
          {totalResults} {t("products")}
        </Text>
      </View>
    );
  };

  const onPressWishListItem = result => {
    const data = [];
    products.map((val, index) => {
      if (val?.SKU == result?.code) {
        const temData = { ...val, inWishlist: result?.inWishlist };
        data.push(temData);
      } else {
        data.push(val);
      }
    });
    dispatch(ProductActions.updatedSearchList(data, ""));

    const item = params?.categoryId;
    apiCall({ query: item, currentPage: "0", sort: selectedSortCode }, 1);
  };

  const scrollY = new Animated.Value(0);
  function onSortSelection(sort: any) {
    setSelectedSortCode(sort);
  }

  return (
    <>
      <MainContainer>
        <FullHeader myRoute={myRoute} />
        {products?.length > 0 && <FilterComponent selectedSortCode={selectedSortCode} onSortingSelection={onSortSelection} params={params} />}
        <SmallHeader
          onBackPress={onBackPress}
          title={route.params?.categoryName ?? ""}
          subTitle={item?.title ?? ""}
          containerStyle={styles.smallHeaderContainer}
        />
        <LoadingView style={styles.container} isLoading={(loading && searchPageCount === 0) || cartLoading || isWishListLoading}>
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[totalResults > 0 && styles.listContainerStyle]}
            data={products}
            onEndReachedThreshold={0.02}
            numColumns={1}
            bounces={false}
            renderItem={({ item }) => {
              return <BestSellersCartItemComponent onpressWishList={onPressWishListItem} item={item} direction={"PLPList"} />;
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

export default ProductListingContainer;
