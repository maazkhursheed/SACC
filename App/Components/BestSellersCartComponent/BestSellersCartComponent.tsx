import { t } from "i18next";
import * as React from "react";
import { FlatList, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DownArrowIcon from "../../Images/downArrow/downArrow.svg";
import { RootState } from "../../Reducers";
import { HomeScreenActions } from "../../Reducers/HomeReducers";
import HeaderTitle from "../BestSellerHeader/BestSellerHeader";
import Divider from "../DividerWithCircle";
import styles from "./BestSellersCartComponentStyle";
import HomeCartItemComponent from "./HomeCartItemComponent";
interface OwnProps {
  headingTitle: string;
  direction: string;
  showMore: boolean;
  containerStyle?: ViewProps;
  sheetRef?: any;
}

type Props = OwnProps;
const BestSellersCartComponent: React.FunctionComponent<Props> = ({ headingTitle, containerStyle, direction, showMore = false, sheetRef }: Props) => {
  const [isExpanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const { bestSellerRecommandedProduct, ourRecommendations } = useSelector((state: RootState) => ({
    bestSellerRecommandedProduct: state?.home?.bestSellerData ?? [],
    ourRecommendations: state?.home?.recommendationData ?? [],
  }));
  const data = direction == "bestSeller" ? bestSellerRecommandedProduct : direction == "recommendate" ? ourRecommendations : [];
  let categories = data?.length > 0 ? (isExpanded || !showMore ? data : data?.slice(0, 2)) : [];

  const onPressWishListItem = result => {
    const newData = [];
    data.map((val, index) => {
      if (val?.SKU == result?.code) {
        const temData = { ...val, inWishlist: result?.inWishlist };
        newData.push(temData);
      } else {
        newData.push(val);
      }
    });
    dispatch(HomeScreenActions.updatedHomeList({ newData, direction }));
  };

  return (
    <FlatList
      contentContainerStyle={[{ paddingHorizontal: 16 }, containerStyle]}
      data={categories?.length > 0 ? categories : []}
      ListHeaderComponent={() => {
        return <View>{categories?.length > 0 && <HeaderTitle title={headingTitle} count={data?.length ?? 0} />}</View>;
      }}
      renderItem={({ item }) => {
        return <HomeCartItemComponent sheetRef={sheetRef} onpressWishList={onPressWishListItem} item={item} direction={direction} />;
      }}
      ListFooterComponent={
        <>
          {showMore && categories?.length > 0 && data?.length > 2 ? (
            <TouchableOpacity style={styles.footerWrapper} onPress={() => setExpanded(!isExpanded)}>
              <Text style={styles.btnText}>{!isExpanded ? `${t("show")} ${data?.length - 2} ${t("more")}` : ` ${t("showLess")}`}</Text>
              <DownArrowIcon />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          {categories?.length > 0 && <Divider />}
        </>
      }
      // ListEmptyComponent={() => {
      //   return (
      //     <View>
      //       <Text>{direction == "recommendate" ? t("noRecommendedProduct") : t("noBestSellerProducts")}</Text>
      //       <Divider />
      //     </View>
      //   );
      // }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default BestSellersCartComponent;
