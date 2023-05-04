import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Image, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { isRTL } from "../../i18n";
import BurgerLogo from "../../Images/HeaderLogo/BurgerLogo.svg";
import Images from "../../Themes/Images";
import styles from "./FullHeaderStyles";
interface OwnProps {
  onPressSearch?: any;
  onPressCart?: any;
  onPressWish?: any;
  children?: any;
  style?: any;
  isSearch?: boolean;
  isHam?: boolean;
  parentNavigation?: any;
}

interface StateProps {}

type Props = StateProps & OwnProps;

const FullHeader: React.SFC<Props> = ({ onPressSearch, children, style, onPressCart, onPressWish, parentNavigation }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const onNavigate = useCallback(() => {
    // navigation.navigate("MyProfileContainer", {
    //   screen: "MyProfileSelection",
    // });
    navigation.toggleDrawer();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={[styles.container, style]}>
        <View style={[styles.titleIconContainer]}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity {...accessibility("profileBtnTxt")} style={styles.profileBtn} onPress={onNavigate}>
              <BurgerLogo />
            </TouchableOpacity>
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
          />
          <TouchableOpacity style={styles.touchableOpacity} onPress={onPressSearch}>
            <Image resizeMode={"contain"} style={styles.search} source={Images.SearchBold} />
          </TouchableOpacity>
        </View>
      </View>
      {isNotNilOrEmpty(children) && <View>{children}</View>}
    </>
  );
};

export default FullHeader;
