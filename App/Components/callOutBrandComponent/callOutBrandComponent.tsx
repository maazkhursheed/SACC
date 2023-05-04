import * as React from "react";
import { FlatList, ViewProps } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import HeaderTitle from "../BestSellerHeader/BestSellerHeader";
import styles from "./callOutBrandComponentStyle";
import CallOutBrandItemComponent from "./callOutBrandItemComponent";
interface OwnProps {
  data: any;
  headingTitle: string;
  direction: string;
  containerStyle?: ViewProps;
}

type Props = OwnProps;
const callOutBrandComponent: React.FunctionComponent<Props> = ({ data, headingTitle, containerStyle, direction }: Props) => {
  return (
    <FlatList
      data={data}
      contentContainerStyle={[styles.contentContainerStyle, containerStyle]}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      ListHeaderComponent={headingTitle ? <HeaderTitle title={headingTitle} count={data?.length ?? 0} /> : <></>}
      renderItem={({ item }) => {
        return <CallOutBrandItemComponent item={item} direction={direction} />;
      }}
      {...accessibility("calloutShopButton")}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default callOutBrandComponent;
