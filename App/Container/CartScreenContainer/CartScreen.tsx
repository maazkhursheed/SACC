import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderTitle from "../../Components/BestSellerHeader/BestSellerHeader";
import Divider from "../../Components/Divider";
import FullHeader from "../../Components/FullHeader/FullHeader";
import LoadingView from "../../Components/LoadingView";
import MainContainer from "../../Components/MainContainer";
import SmallHeader from "../../Components/SmallHeader";
import styles from "../CartScreenContainer/CartScreenStyle";
import SortByComponent from "../../Components/SortByComponent/SortByComponent";
import CartCheckoutDetailSheet from "../../Components/CartCheckoutDetailSheet/CartCheckoutDetailSheet";

interface StateProps {}

type Props = StateProps;

const CartScreen: React.SFC<Props> = ({}: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const cartDetailsSheet = useRef();
  const itemsCount = 4;

  const removeAllCartItems = () => {};

  return (
    <>
      <FullHeader />
      <MainContainer>
        <SmallHeader onBackPress={navigation.goBack} title={"Cart"} containerStyle={styles.smallHeaderContainer} titleTextStyle={styles.titleText} />
        <Divider />
        {/*<HeaderTitle*/}
        {/*  title={itemsCount + " " + t("cart.itemsInCart")}*/}
        {/*  count={0}*/}
        {/*  onPress={() => removeAllCartItems()}*/}
        {/*  rightText={t("cart.removeAll")}*/}
        {/*  containerStyle={styles.containerStyle}*/}
        {/*/>*/}
        <LoadingView style={styles.container} isLoading={false}>
          {/*<Animated.FlatList*/}
          {/*  showsVerticalScrollIndicator={false}*/}
          {/*  contentContainerStyle={[totalResults > 0 && styles.listContainerStyle]}*/}
          {/*  data={products}*/}
          {/*  onEndReachedThreshold={0.02}*/}
          {/*  numColumns={1}*/}
          {/*  bounces={false}*/}
          {/*  renderItem={({ item }) => {*/}
          {/*    return <BestSellersCartItemComponent item={item} direction={"PLPList"} />;*/}
          {/*  }}*/}
          {/*  onTouchStart={() => {*/}
          {/*    onEndReachedCalledDuringMomentum = false;*/}
          {/*  }}*/}
          {/*  onEndReached={() => {*/}
          {/*    if (!onEndReachedCalledDuringMomentum) {*/}
          {/*      handleMoreData();*/}
          {/*      onEndReachedCalledDuringMomentum = true;*/}
          {/*    }*/}
          {/*  }}*/}
          {/*  {...accessibility("PLPFlatList")}*/}
          {/*  keyExtractor={(item, index) => (item ? item.SKU : index.toString())}*/}
          {/*  ListFooterComponent={renderFooter}*/}
          {/*  ListHeaderComponent={totalResults > 0 ? renderHeader : <></>}*/}
          {/*  ListEmptyComponent={!loading ? renderMessageForNoProducts : undefined}*/}
          {/*  onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}*/}
          {/*/>*/}
        </LoadingView>
        <View style={styles.fixedContainer}>
          <View style={styles.refineContainer}>
            <TouchableOpacity onPress={() => cartDetailsSheet.current.open()}>
              <Text style={styles.viewMoreStyle}>{t("cart.viewDetails")}</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>{t("cart.subtotal")}</Text>
            <Text style={styles.total}>{"SAR 645.10"}</Text>
          </View>
          <TouchableOpacity style={styles.refineButton}>
            <Text style={styles.text}>{t("cart.checkout").toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </MainContainer>
      <RBSheet
        ref={cartDetailsSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={350}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000080",
          },
        }}
      >
        <CartCheckoutDetailSheet onBackPress={() => cartDetailsSheet.current.close()} />
      </RBSheet>
    </>
  );
};

export default CartScreen;
