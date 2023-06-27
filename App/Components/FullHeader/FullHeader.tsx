import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { CustomWebViewRedirection } from "../../Components";
import { getSelectedLanguage, isRTL, localizeImage } from "../../i18n";
import CloseButton from "../../Images/closeButton/CloseButton.svg";
import BurgerLogo from "../../Images/HeaderLogo/BurgerLogo.svg";
import { isAnonymousLogin } from "../../Lib/DataHelper";
import { imageUrl } from "../../Lib/StringHelper";
import { RootState } from "../../Reducers";
import { AuthAction } from "../../Reducers/AuthReducer";
import { CartAction } from "../../Reducers/CartReducer";
import { HomeScreenActions } from "../../Reducers/HomeReducers/index";
import { ProductActions } from "../../Reducers/ProductReducers";
import { SearchSuggestionsActions } from "../../Reducers/SearchReducers";
import { Images } from "../../Themes";
import styles from "./FullHeaderStyles";
interface OwnProps {
  children?: any;
  style?: any;
  isSearch?: boolean;
  isHam?: boolean;
  myRoute?: any;
}

interface StateProps {}

type Props = StateProps & OwnProps;

const FullHeader: React.SFC<Props> = ({ children, style, myRoute }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const route = useRoute();
  const [searchText, setSearchText] = useState("");
  const [refreshHomeApi, setRefreshHomeApi] = useState(false);
  const dispatch = useDispatch();
  const { cartCount } = useSelector((state: RootState) => ({
    cartCount: state?.cart?.cartData?.entries?.length ?? 0,
  }));
  const [webUrl, setUrl] = useState("");
  const [skuId, setSKUId] = useState("");
  const { loading, suggestions, productSuggest } = useSelector((state: RootState) => ({
    loading: state.search.fetching,
    suggestions: state.search.data,
    productSuggest: state.search.productData,
  }));

  const onNavigate = useCallback(() => {
    navigation.toggleDrawer();
  }, []);

  const resetSuggestions = () => {
    dispatch(SearchSuggestionsActions.resetFields());
    dispatch(SearchSuggestionsActions.setTerm(""));
  };

  const submit = text => {
    if (text.length > 0) {
      apiCall({ query: text, currentPage: "0" }, 1);
      clear();
      navigation.navigate("SearchPage", { searchText: text });
    }
  };

  const clear = () => {
    setSearchText("");
    resetSuggestions();
  };

  const apiCall = (param, callback) => {
    dispatch(ProductActions.requestSearchSolr(param, callback));
  };

  const autoSuggestionApiCall = text => {
    dispatch(SearchSuggestionsActions.requestProductSearchSuggestions(text));
    dispatch(SearchSuggestionsActions.requestSearchSuggestions(text));
    dispatch(SearchSuggestionsActions.setTerm(text));
  };

  const callPdp = sku => {
    setSKUId(sku);
  };

  const renderKeywordSuggestions = () => {
    return (
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={suggestions}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => submit(item?.name)}>
              <View style={styles.keywordSuggestion}>
                <Text style={styles.keywordText}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const renderProductSuggestions = () => {
    return (
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={productSuggest}
        renderItem={({ item }) => {
          const imgSource = item?.Image ? { uri: item?.Image } : { uri: imageUrl };
          return (
            <TouchableOpacity onPress={() => callPdp(item?.Sku)}>
              <View style={styles.productSuggestionContainer}>
                <View style={styles.imageWrapper}>
                  <FastImage source={imgSource} style={styles.imageProductSuggestion} resizeMode="cover" />
                </View>
                <View>
                  <Text numberOfLines={2} style={styles.productSuggestionText}>
                    {item?.QuoteName.replace(/<[^>]+>/g, "")}
                  </Text>
                  <Text style={styles.priceStyle}>{item?.Price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const callRefreshApi = () => {
    if (refreshHomeApi) {
      if (myRoute?.name == "ProductsListing") {
        dispatch(ProductActions.clearProductList());
        apiCall({ query: myRoute?.params?.categoryId, currentPage: "0" }, 1);
        dispatch(HomeScreenActions.requestHomeScreenData());
      } else {
        dispatch(HomeScreenActions.requestHomeScreenData());
      }
      setRefreshHomeApi(false);
    }
    setUrl("");
  };

  const onStatechanges = event => {
    if (event?.url.indexOf("/my-account/my-wishlist/remove/") > -1 || event?.url.indexOf("/my-account/my-wishlist/removeall") > -1) {
      setRefreshHomeApi(true);
    }
  };
  const handleCartClick = async () => {
    const isGuest = await isAnonymousLogin();
    if (isGuest) {
      dispatch(AuthAction.signOut());
    } else {
      navigation.navigate("CartScreen");
      dispatch(CartAction.checkCurrentCart());
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={[styles.container, style]}>
        <View style={[styles.titleIconContainer]}>
          <View style={{ flexDirection: "row" }}>
            {navigation?.toggleDrawer && route.name == "Home" ? (
              <TouchableOpacity {...accessibility("profileBtnTxt")} style={styles.profileBtn} onPress={onNavigate}>
                <BurgerLogo />
              </TouchableOpacity>
            ) : (
              <View style={styles.invisible} />
            )}

            <View style={styles.titleView}>
              <Image resizeMode={"contain"} style={styles.image} source={localizeImage("Logo")} />
            </View>
          </View>
          <View style={styles.cartWishIcon}>
            <TouchableOpacity {...accessibility("cart")} onPress={handleCartClick}>
              <View style={{ flexDirection: "row" }}>
                <Image resizeMode={"contain"} style={styles.imageLeft} source={localizeImage("CartHeader")} />
                {cartCount > 0 && (
                  <View style={styles.countContainer}>
                    <Text style={styles.counterText}>{cartCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartIcon}
              {...accessibility("searchBar")}
              onPress={async () => {
                const isGuest = await isAnonymousLogin();
                if (isGuest) {
                  dispatch(AuthAction.signOut());
                } else {
                  setUrl(`my-account/my-wishlist?source=Mobile&lang=${getSelectedLanguage()?.code}`);
                }
              }}
            >
              <Image resizeMode={"contain"} style={styles.imageLeft} source={Images.Wish} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.textInputWrapper, searchText?.length < 3 && { borderBottomWidth: 0 }]}>
          <TextInput
            style={[styles.textInput, isRTL() == "rtl" && { textAlign: "right" }]}
            placeholder={t("placeholderSearch")}
            placeholderTextColor={"#999999"}
            onSubmitEditing={() => submit(searchText)}
            onChangeText={text => {
              setSearchText(text);
              if (text.length > 2) {
                autoSuggestionApiCall(text);
              }
              if (text.length < 2) {
                resetSuggestions();
              }
            }}
            autoFocus={false}
            value={searchText}
          />
          {searchText?.length > 0 ? (
            <TouchableOpacity style={styles.cleareBtn} onPress={clear}>
              <CloseButton />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => submit(searchText)}>
            <Image resizeMode={"contain"} style={styles.search} source={Images.SearchBold} />
          </TouchableOpacity>
        </View>
        {searchText?.length > 2 ? (
          <View style={styles.suggestionWrapper}>
            {renderKeywordSuggestions()}
            {renderProductSuggestions()}
          </View>
        ) : (
          <></>
        )}
      </View>
      {isNotNilOrEmpty(children) && <View>{children}</View>}
      {skuId && (
        <CustomWebViewRedirection
          url={skuId ? `p/${skuId}?source=Mobile&lang=${getSelectedLanguage()?.code}` : ""}
          closeSheet={() => {
            callPdp("");
          }}
          onStatechanges={() => {}}
        />
      )}
      <CustomWebViewRedirection url={webUrl} closeSheet={() => callRefreshApi()} onStatechanges={onStatechanges} />
    </>
  );
};

export default FullHeader;
