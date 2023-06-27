import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import BestSellersCartComponent from "~root/Components/BestSellersCartComponent/BestSellersCartComponent";
import CallOutBrandComponent from "~root/Components/callOutBrandComponent/callOutBrandComponent";
import LoadingView from "~root/Components/LoadingView";
import ShopByCategory from "~root/Components/ShopByCategory/ShopByCategory";
import SignatureCollectionComponent from "~root/Components/SignatureCollectionComponent/SignatureCollectionComponent";
import { AnimationProvider } from "~root/Provider/AnimationProvider";
import { BottomFixedButton } from "../../Components";
import Divider from "../../Components/DividerWithCircle";
import FullHeader from "../../Components/FullHeader/FullHeader";
import MarketingTileCarousel from "../../Components/MarketingTileCarouselComponent/MarketingTileCarousel";
import { isNotNilOrEmpty } from "../../Lib/CommonHelper";
import { isAnonymousLogin } from "../../Lib/DataHelper";
import { imageUrl } from "../../Lib/StringHelper";
import { RootState } from "../../Reducers";
import { CartAction } from "../../Reducers/CartReducer";
import { HomeScreenActions } from "../../Reducers/HomeReducers/index";
import style from "./HomeScreenStyles";
export interface DispatchProps {}

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sheetRef = React.useRef();
  const { homeData, signCollection, brandsBanner, homePageRotatingBanner1, brandLogoBannerCarousel, promotionBanner, tilesData, isLoading, shoByCategorydata } =
    useSelector((state: RootState) => ({
      homeData: state?.home?.data,
      bestSellerRecommandedProduct: state?.home?.bestSellerData ?? [],
      ourRecommendations: state?.home?.recommendationData ?? [],
      signCollection: state?.home?.data?.signCollection ?? [],
      brandsBanner: state?.home?.data?.brandsBanner ?? [],
      homePageRotatingBanner1: state?.home?.data?.homePageRotatingBanner1 ?? [],
      brandLogoBannerCarousel: state?.home?.data?.brandLogoBannerCarousel ?? [],
      promotionBanner: state?.home?.data?.promotionBanner ?? [],
      tilesData: state?.home?.data?.tilesData ?? [],
      shoByCategorydata: state?.home?.data?.featureCategories ?? [],
      isLoading: state?.home?.fetching,
      isCartLoading: state?.cart?.isLoading,
    }));
  const checkCartStatus = async () => {
    const isGuest = await isAnonymousLogin();
    if (!isGuest) {
      dispatch(CartAction.checkCurrentCart());
    }
  };

  React.useEffect(() => {
    checkCartStatus();
    dispatch(HomeScreenActions.requestHomeScreenData());
  }, []);

  const FlashSale = ({ data }) => {
    const { t } = useTranslation();
    const imgSource = data?.Image ? { uri: data?.Image } : { uri: imageUrl };
    return (
      <>
        <View style={style.flashSaleWrapper}>
          <View style={style.flashSaleTopWrapper}>
            <View style={style.flashSaleDiscountDetails}>
              {isNotNilOrEmpty(data?.title) && <Text style={style.flashText}>{data?.title}</Text>}
              {isNotNilOrEmpty(data?.headline) && <Text style={style.discountPercentage}>{data?.headline}</Text>}
              {isNotNilOrEmpty(data?.content) && <Text style={style.miniText}>{data?.content}</Text>}
            </View>
            <FastImage source={imgSource} style={style.flashImage} resizeMode={FastImage.resizeMode.contain} />
          </View>
          <BottomFixedButton
            onPress={() => {
              navigation.navigate("ProductsListing", {
                screen: "MainPLP",
                categoryId: `:relevance:category:${data?.categoryId}`,
                categoryName: data?.name ?? "",
                direction: "flashSale",
              });
            }}
            btnText={t("useCodeFlash10")}
            style={style.flashBtn}
            textStyle={style.flashSaletextStyle}
          />
        </View>
        <Divider />
      </>
    );
  };

  const BrandCrousel = () => {
    return (
      <FlatList
        contentContainerStyle={style.BrandCrouselWrapper}
        data={brandsBanner}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductsListing", {
                  screen: "MainPLP",
                  categoryId: `:relevance:brand:${item?.categoryId}`,
                  categoryName: item?.name ?? "",
                  direction: "brandLogos",
                });
              }}
            >
              <FastImage source={{ uri: item?.Image }} style={style.BrandCrouselImageStyle} resizeMode={FastImage.resizeMode.contain} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const LandingPageScrollView = React.useCallback(() => {
    const { t } = useTranslation();
    return (
      <LoadingView style={style.container} hideViewOnLoading={true} isLoading={isLoading && homeData?.length === 0}>
        <ScrollView style={style.container} bounces={false} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          {homePageRotatingBanner1?.length > 0 && <MarketingTileCarousel marketingTileInfo={homePageRotatingBanner1} direction={"mainBanner"} />}
          {shoByCategorydata?.length > 0 && (
            <>
              <ShopByCategory />
              <Divider />
            </>
          )}
          <BestSellersCartComponent sheetRef={sheetRef} showMore={true} direction={"bestSeller"} />
          {tilesData?.length > 0 && <MarketingTileCarousel marketingTileInfo={tilesData} direction={"tiles"} />}
          {brandLogoBannerCarousel.length > 0 && (
            <CallOutBrandComponent btnText={t("shopNow")} containerStyle={style.callOutBrandcontainerStyle} data={brandLogoBannerCarousel.slice(0, 4)} />
          )}
          {promotionBanner?.length > 0 && <FlashSale data={promotionBanner[0]} />}
          <BestSellersCartComponent sheetRef={sheetRef} headingTitle={t("ourRecommendations")} showMore={true} direction={"recommendate"} />
          <SignatureCollectionComponent
            btnText={t("shopNow")}
            numColumns={2}
            headingTitle={t("signatureCollections")}
            data={signCollection?.length > 2 ? signCollection.slice(0, 2) : signCollection}
          />
          {brandsBanner?.length > 0 && <BrandCrousel />}
        </ScrollView>
      </LoadingView>
    );
  }, [shoByCategorydata, tilesData, promotionBanner, brandsBanner, homeData]);

  return (
    <AnimationProvider>
      <FullHeader />
      <LandingPageScrollView />
    </AnimationProvider>
  );
};

export default HomeScreen;
