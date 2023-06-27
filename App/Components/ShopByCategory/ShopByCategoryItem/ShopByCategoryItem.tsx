import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import LoadingView from "~root/Components/LoadingView";
import { IAlertCallbacks } from "~root/Lib/AlertsHelper";
import { imageUrl } from "../../../Lib/StringHelper";
// import { SubCategoriesActions } from "~root/Reducers/SubCategoriesReducers";
import style from "./ShopByCategoryItemStyle";
interface OwnProps {
  item: any;
  isEnd: boolean;
}

interface StateProps {
  loading: boolean;
}

interface DispatchProps {
  requestSubCategories: (catId: string, meta: IAlertCallbacks) => void;
}

type Props = DispatchProps & OwnProps & StateProps;

const ShopByCategoryItem: React.SFC<Props> = ({ item, isEnd = false, loading = false }: Props) => {
  const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };
  const navigation = useNavigation();

  return (
    <LoadingView isLoading={loading} style={[style.container, isEnd && { marginBottom: 0 }]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductsListing", {
            screen: "MainPLP",
            categoryId: `:relevance:category:${item?.categoryId}`,
            categoryName: item?.name,
            direction: "homePage",
          });
        }}
        disabled={loading}
        style={style.categoryItemWrapper}
      >
        <FastImage source={imgSource} style={style.imageStyle} resizeMode={FastImage.resizeMode.cover} />
        <Text style={style.textStyle}>{item?.categoryName || item?.name || ""}</Text>
      </TouchableOpacity>
    </LoadingView>
  );
};

// const mapDispatchToProps = (dispatch: any): DispatchProps => ({
//   requestSubCategories: (catId: string, meta: IAlertCallbacks) => dispatch(SubCategoriesActions.requestSubCategories(catId, meta)),
// });

// const mapStateToProps = (state: RootState, ownProps: Props): StateProps => ({
//   loading: state.subCategories.fetching,
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ShopByCategoryItem);
export default ShopByCategoryItem;
