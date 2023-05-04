import * as React from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Metrics } from "~root/Themes";
import { isNotNilOrEmpty } from "../../Lib/CommonHelper";
import styles from "./MarketingTileCarouselStyle";

interface Props {
  marketingTileInfo: any;
  direction: string;
}

const onPress = item => {
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

const RenderItem = data => {
  const { item, t, direction } = data;
  const objItem = item?.item;
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <ImageBackground source={{ uri: objItem?.Image }} style={styles.imageBackgroundStyle} />
        <View style={styles.mainTile}>
          {isNotNilOrEmpty(objItem?.title) && <Text style={styles.mainTitleText}>{objItem?.body}</Text>}
          {isNotNilOrEmpty(objItem?.body) && <Text style={styles.mainBodyText}>{objItem?.title}</Text>}
          {direction != "tiles" ? (
            <TouchableOpacity style={styles.buttonLightBackground} onPress={() => onPress(objItem)}>
              <Text style={styles.buttonTextLightBackground}>{t("shopNow")}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.shopnowBtn}>{t("shopNow")}</Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MarketingTileCarousel: React.FC<Props> = ({ marketingTileInfo, direction }: Props) => {
  const [active, setActive] = React.useState(0);
  const { t } = useTranslation();
  const data = marketingTileInfo;

  return (
    <View style={styles.mainBackground}>
      <Carousel
        useRef={true}
        data={data}
        renderItem={item => <RenderItem item={item} t={t} direction={direction} />}
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
