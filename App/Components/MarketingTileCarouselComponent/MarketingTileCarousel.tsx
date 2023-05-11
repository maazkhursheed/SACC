import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Metrics } from "~root/Themes";
import { isNotNilOrEmpty } from "../../Lib/CommonHelper";
import Images from "../../Themes/Images";
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
  const { item, t, direction, setHeight } = data;
  const objItem = item?.item;
  return (
    <TouchableWithoutFeedback>
      <View style={styles.mainContainer}>
        <ImageBackground source={{ uri: objItem?.Image }} style={styles.imageBackgroundStyle} onLayout={e => setHeight(e.nativeEvent.layout.height)} />
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
  let isCrousel = React.useRef();
  const [height, setHeight] = React.useState(0);

  const gotoNextPic = () => {
    isCrousel.snapToNext();
  };
  const gotoPrevPic = () => {
    isCrousel.snapToPrev();
  };
  return (
    <View style={styles.mainBackground}>
      <Carousel
        useRef={true}
        ref={c => {
          isCrousel = c;
        }}
        data={data}
        renderItem={item => <RenderItem item={item} ref={isCrousel} t={t} direction={direction} setHeight={setHeight} />}
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
                <Image resizeMode={"contain"} source={Images.CarosalBackIcon} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={[styles.nextBtncontainer, { alignSelf: "flex-end" }]} onPress={gotoNextPic}>
                <Image resizeMode={"contain"} source={Images.NextIcon} />
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
