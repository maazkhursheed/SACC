import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { isNotNilOrEmpty } from "~root/Lib/CommonHelper";
import { accessibility } from "~root/Lib/DataHelper";
import { localizeImage } from "../../i18n";
import BurgerLogo from "../../Images/HeaderLogo/BurgerLogo.svg";
import SearchIcon from "../../Images/searchIcon/searchIcon.svg";
import styles from "./MainHeaderStyle";
interface OwnProps {
  onPressSearch?: any;
  children?: any;
  style?: any;
  isSearch?: boolean;
  isHam?: boolean;
}

interface StateProps {}

type Props = StateProps & OwnProps;

const MainHeader: React.SFC<Props> = ({ onPressSearch, children, style, isHam, isSearch }: Props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const onNavigate = useCallback(() => {
    if (route.name == "My Profile") {
      navigation.toggleDrawer();
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container} />
      <View style={[styles.container, style]}>
        <View style={[styles.titleIconContainer]}>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity {...accessibility("profileBtnTxt")} style={styles.profileBtn} onPress={onNavigate}>
              {isHam === true ? <BurgerLogo /> : <></>}
            </TouchableOpacity>
          </View>
          <View style={styles.titleView}>
            <Image resizeMode={"contain"} style={styles.image} source={localizeImage("Logo")} />
          </View>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.touchableOpacityStyle} {...accessibility("searchBar")} onPress={onPressSearch}>
              {isSearch === true ? <SearchIcon /> : <></>}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isNotNilOrEmpty(children) && <View>{children}</View>}
    </>
  );
};

export default MainHeader;
