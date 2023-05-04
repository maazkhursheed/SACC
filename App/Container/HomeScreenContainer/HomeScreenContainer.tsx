import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, ScrollView, Text, View } from "react-native";
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
import { imageUrl } from "../../Lib/StringHelper";
import { RootState } from "../../Reducers";
import { HomeScreenActions } from "../../Reducers/HomeReducers/index";
import { getPassword, getToken } from "./../../utils";
import style from "./HomeScreenStyles";
export interface DispatchProps {}

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    homeData,
    bestSellerRecommandedProduct,
    ourRecommendations,
    signCollection,
    brandsBanner,
    homePageRotatingBanner1,
    brandLogoBannerCarousel,
    promotionBanner,
    tilesData,
    isLoading,
    shoByCategorydata,
  } = useSelector((state: RootState) => ({
    homeData: state?.home?.data,
    bestSellerRecommandedProduct: state?.home?.data?.bestSellerRecommandedProduct ?? [],
    ourRecommendations: state?.home?.data?.ourRecommendations ?? [],
    signCollection: state?.home?.data?.signCollection ?? [],
    brandsBanner: state?.home?.data?.brandsBanner ?? [],
    homePageRotatingBanner1: state?.home?.data?.homePageRotatingBanner1 ?? [],
    brandLogoBannerCarousel: state?.home?.data?.brandLogoBannerCarousel ?? [],
    promotionBanner: state?.home?.data?.promotionBanner ?? [],
    tilesData: state?.home?.data?.tilesData ?? [],
    isLoading: state?.home?.fetching,
    shoByCategorydata: state?.home?.data?.featureCategories ?? [],
  }));

  React.useEffect(() => {
    dispatch(HomeScreenActions.requestHomeScreenData());
    getTokenValue();
  }, []);

  const getTokenValue = async () => {
    const tokenval = await getToken();
    const passwordVal = await getPassword();
  };

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
          <BottomFixedButton onPress={() => {}} btnText={t("useCodeFlash10")} style={style.flashBtn} textStyle={style.flashSaletextStyle} />
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
          return <FastImage source={{ uri: item?.Image }} style={style.BrandCrouselImageStyle} resizeMode={FastImage.resizeMode.contain} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const LandingPageScrollView = () => {
    const { t } = useTranslation();
    return (
      <ScrollView bounces={false} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <LoadingView isLoading={isLoading && homeData.length === 0}>
          <View style={style.marketingTileView}>
            {homePageRotatingBanner1.length > 0 && <MarketingTileCarousel marketingTileInfo={homePageRotatingBanner1} direction={"mainBanner"} />}
            {shoByCategorydata?.length > 0 && (
              <>
                <ShopByCategory />
                <Divider />
              </>
            )}
            <BestSellersCartComponent data={bestSellerRecommandedProduct} showMore={true} direction={"bestSeller"} />
            {homePageRotatingBanner1.length > 0 && <MarketingTileCarousel marketingTileInfo={tilesData} direction={"tiles"} />}
            {tilesData.length > 0 && (
              <CallOutBrandComponent btnText={t("shopNow")} containerStyle={style.callOutBrandcontainerStyle} data={brandLogoBannerCarousel.slice(0, 4)} />
            )}
            {promotionBanner.length > 0 && <FlashSale data={promotionBanner[0]} />}
            <BestSellersCartComponent data={ourRecommendations} headingTitle={t("ourRecommendations")} showMore={true} direction={"recommendate"} />
            <SignatureCollectionComponent
              btnText={t("shopNow")}
              numColumns={2}
              headingTitle={t("signatureCollections")}
              data={signCollection?.length > 2 ? signCollection.slice(0, 2) : signCollection}
            />
            {brandsBanner.length > 0 && <BrandCrousel />}
          </View>
        </LoadingView>
      </ScrollView>
    );
  };

  return (
    <AnimationProvider>
      <FullHeader />
      <LandingPageScrollView />
    </AnimationProvider>
  );
};

export default HomeScreen;
