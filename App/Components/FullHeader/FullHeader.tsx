import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { isRTL } from "../../i18n";
import CloseButton from "../../Images/closeButton/CloseButton.svg";
import BurgerLogo from "../../Images/HeaderLogo/BurgerLogo.svg";
import { ProductActions } from "../../Reducers/ProductReducers";
import { Images } from "../../Themes";
import styles from "./FullHeaderStyles";
interface OwnProps {
  onPressCart?: any;
  onPressWish?: any;
  children?: any;
  style?: any;
  isSearch?: boolean;
  isHam?: boolean;
}

interface StateProps {}

type Props = StateProps & OwnProps;

const FullHeader: React.SFC<Props> = ({ children, style, onPressCart, onPressWish }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const onNavigate = useCallback(() => {
    navigation.toggleDrawer();
  }, []);

  const submit = text => {
    if (text.length > 0) {
      apiCall({ query: text, currentPage: "0" }, 1);
      navigation.navigate("SearchPage", { searchText: text });
    }
  };

  const clear = () => {
    setSearchText("");
  };

  const apiCall = (param, callback) => {
    dispatch(ProductActions.requestSearchSolr(param, callback));
  };

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={[styles.container, style]}>
        <View style={[styles.titleIconContainer]}>
          <View style={{ flexDirection: "row" }}>
            {navigation?.toggleDrawer ? (
              <TouchableOpacity {...accessibility("profileBtnTxt")} style={styles.profileBtn} onPress={onNavigate}>
                <BurgerLogo />
              </TouchableOpacity>
            ) : (
              <View style={styles.invisible} />
            )}

            <View style={styles.titleView}>
              {/* <AppLogo/> */}
              {isRTL() != "rtl" ? (
                <Image resizeMode={"contain"} style={styles.image} source={Images.Logo} />
              ) : (
                <Image resizeMode={"contain"} style={styles.image} source={Images.LogoAr} />
              )}
            </View>
          </View>
          <View style={styles.cartWishIcon}>
            <TouchableOpacity {...accessibility("searchBar")} onPress={onPressCart}>
              <Image resizeMode={"contain"} style={styles.imageLeft} source={Images.CartHeader} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartIcon} {...accessibility("searchBar")} onPress={onPressWish}>
              <Image resizeMode={"contain"} style={styles.imageLeft} source={Images.Wish} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={[styles.textInput, isRTL() == "rtl" && { textAlign: "right" }]}
            placeholder={t("placeholderSearch")}
            placeholderTextColor={"#999999"}
            onSubmitEditing={() => submit(searchText)}
            onChangeText={text => {
              setSearchText(text);
            }}
            autoFocus={true}
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
      </View>
      {isNotNilOrEmpty(children) && <View>{children}</View>}
    </>
  );
};

export default FullHeader;
