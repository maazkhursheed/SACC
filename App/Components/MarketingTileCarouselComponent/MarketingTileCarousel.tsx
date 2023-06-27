import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Metrics } from "~root/Themes";
import { localizeImage } from "../../i18n";
import { isNotNilOrEmpty } from "../../Lib/CommonHelper";
import styles from "./MarketingTileCarouselStyle";
interface Props {
  marketingTileInfo: any;
  direction: string;
}

const RenderItem = data => {
  const { item, t, direction, setHeight, onpress } = data;
  const objItem = item?.item;
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <ImageBackground source={{ uri: objItem?.Image }} style={styles.imageBackgroundStyle} onLayout={e => setHeight(e.nativeEvent.layout.height)} />
        <View style={styles.mainTile}>
          {isNotNilOrEmpty(objItem?.title) && <Text style={styles.mainTitleText}>{objItem?.body}</Text>}
          {isNotNilOrEmpty(objItem?.body) && <Text style={styles.mainBodyText}>{objItem?.title}</Text>}
          {direction != "tiles" ? (
            <TouchableOpacity style={styles.buttonLightBackground} onPress={() => onpress(objItem)}>
              <Text style={styles.buttonTextLightBackground}>{t("shopNow")}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{}} onPress={() => onpress(objItem)}>
              <Text style={styles.shopnowBtn}>{t("shopNow")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const MarketingTileCarousel: React.FC<Props> = ({ marketingTileInfo, direction }: Props) => {
  const [active, setActive] = React.useState(0);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const data = marketingTileInfo;
  let isCrousel = React.useRef();
  const [height, setHeight] = React.useState(0);

  const gotoNextPic = () => {
    isCrousel.snapToNext();
  };
  const gotoPrevPic = () => {
    isCrousel.snapToPrev();
  };

  const onPress = item => {
    navigation.navigate("ProductsListing", {
      screen: "MainPLP",
      categoryId: direction != "tiles" ? `:relevance:category:${item?.categoryId}` : `:relevance:brand:${item?.categoryId}`,
      categoryName: item?.name ?? "",
      direction: "homePageRotatingBanner1",
    });
    // if (item.promoType?.toUpperCase() === "OTHER" && isNotNilOrEmpty(item.ctaAction)) {
    //   Linking.openURL("https://" + item.ctaAction);
    // } else if (item.promoType?.toUpperCase() === "COLLECTION" && isNotNilOrEmpty(item.ctaAction)) {
    //   NavigationService.navigate("OrderProduct", {
    //     categoryId: ":Sort By:category:" + item.ctaAction,
    //     categoryName: item?.name,
    //   });
    // } else if (item.promoType?.toUpperCase() === "PRODUCT" && isNotNilOrEmpty(item.ctaAction)) {
    //   NavigationService.navigate("ProductDetails", {
    //     screen: "MainPDP",
    //     params: { [KEY_PARAM_SKU]: item.ctaAction },
    //   });
    // }
  };

  return (
    <View style={styles.mainBackground}>
      <Carousel
        useRef={true}
        ref={c => {
          isCrousel = c;
        }}
        data={data}
        renderItem={item => <RenderItem item={item} ref={isCrousel} t={t} direction={direction} setHeight={setHeight} onpress={onPress} />}
        sliderWidth={Metrics.screenWidth}
        itemWidth={Metrics.screenWidth}
        useScrollView={true}
        loop={true}
        autoplayDelay={6}
        autoplay={true}
        inactiveSlideScale={1}
        swipeThreshold={80}
        onSnapToItem={setActive}
        decelerationRate={1.1}
        autoplayInterval={6000}
      />
      {direction == "tiles" && (
        <View style={[styles.nextPrevWrapper, { top: height - 10 }]}>
          <View style={styles.innerNextPrevWrapper}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.nextBtncontainer} onPress={gotoPrevPic}>
                <Image resizeMode={"contain"} source={localizeImage("CarosalBackIcon")} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[styles.nextBtncontainer, { alignSelf: "flex-end" }]} onPress={gotoNextPic}>
                <Image resizeMode={"contain"} source={localizeImage("NextIcon")} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Pagination
        dotsLength={data.length}
        activeDotIndex={active}
        containerStyle={styles.containerStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default MarketingTileCarousel;
