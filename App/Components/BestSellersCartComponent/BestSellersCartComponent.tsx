import { t } from "i18next";
import * as React from "react";
import { FlatList, Text, TouchableOpacity, View, ViewProps } from "react-native";
import DownArrowIcon from "../../Images/downArrow/downArrow.svg";
import HeaderTitle from "../BestSellerHeader/BestSellerHeader";
import Divider from "../DividerWithCircle";
import BestSellersCartItemComponent from "./BestSellerCartComponentItem";
import styles from "./BestSellersCartComponentStyle";

interface OwnProps {
  data: any;
  headingTitle: string;
  direction: string;
  showMore: boolean;
  containerStyle?: ViewProps;
}

type Props = OwnProps;
const BestSellersCartComponent: React.FunctionComponent<Props> = ({ data, headingTitle, containerStyle, direction, showMore = false }: Props) => {
  const [isExpanded, setExpanded] = React.useState(false);
  let categories = data?.length > 0 ? (isExpanded || !showMore ? data : data?.slice(0, 2)) : [];
  return (
    <FlatList
      contentContainerStyle={[{ paddingHorizontal: 16 }, containerStyle]}
      data={categories}
      ListHeaderComponent={() => {
        return <View>{categories?.length > 0 && <HeaderTitle title={headingTitle} count={data?.length ?? 0} />}</View>;
      }}
      renderItem={({ item }) => {
        return <BestSellersCartItemComponent item={item} direction={direction} />;
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
