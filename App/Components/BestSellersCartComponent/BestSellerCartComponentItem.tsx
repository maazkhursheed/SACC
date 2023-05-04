import * as React from "react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import RBSheet from "react-native-raw-bottom-sheet";
import PriceComponent from "~root/Components/PriceComponent";
import { accessibility } from "~root/Lib/DataHelper";
import { imageUrl } from "~root/Lib/StringHelper";
import CartIcon from "../../Images/cartIcon/cartIcon.svg";
import EmptyHeartIcon from "../../Images/heartIcon/emptyHeartIcon.svg";
import HeartIcon from "../../Images/heartIcon/HeartIcon.svg";
import AddToCartComponent from "../AddToCartComponent/AddToCartComponent";
import styles from "./BestSellersCartComponentStyle";
interface OwnProps {
  item: any;
  containerStyle?: ViewProps;
  direction: any;
}

type Props = OwnProps;
const BestSellersCartItemComponent: React.FunctionComponent<Props> = ({ item, direction, containerStyle }: Props) => {
  const { t } = useTranslation();
  const refRBSheet = useRef();
  const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };

  return (
    <View style={[styles.listView, containerStyle]} {...accessibility("cartList")}>
      <View>
        <View style={styles.leftwrapper}>
          <View style={styles.leftWrapper}>
            <View style={styles.leftWrapperImage}>{item?.inWishlist ? <HeartIcon /> : <EmptyHeartIcon />}</View>
          </View>
        </View>
        <View style={styles.productImageWrapper}>
          <FastImage source={imgSource} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
        </View>
      </View>
      <View style={[styles.rowView]}>
        <Text numberOfLines={3} style={[styles.productDescription]} {...accessibility("productDetailsLabel")}>
          {item?.ProductDescription ?? item?.product?.ProductDescription}
        </Text>
        <View style={[styles.qtyView]}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <PriceComponent style={styles.viewQtyValue} value={item?.Price} />
            {item?.discountPrice && (
              <View style={styles.discountValueWrapper}>
                <View style={{ flex: 1 }}>
                  <PriceComponent style={[styles.discountValue, { textDecorationLine: "line-through" }]} value={270} />
                  <View style={styles.discountText}>
                    <Text style={[styles.discountValue]} {...accessibility("productDetailsLabel")}>
                      {t("save")}{" "}
                    </Text>
                    <PriceComponent style={[styles.discountValue]} value={133} />
                    <Text style={[styles.discountValue]} {...accessibility("productDetailsLabel")}>
                      {" "}
                      (43%)
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.cartIconBtn} onPress={() => refRBSheet.current.open()}>
            <CartIcon />
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000080",
          },
        }}
      >
        <AddToCartComponent item={item} onBackPress={() => refRBSheet.current.close()} />
      </RBSheet>
    </View>
  );
};

export default BestSellersCartItemComponent;
