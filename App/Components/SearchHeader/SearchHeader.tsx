import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import { localizeImage } from "../../i18n";
import styles from "./SearchHeaderStyle";
interface OwnProps {
  titleStyle: ViewStyle;
  title?: string | React.ReactElement;
  subTitle?: string | React.ReactElement;
  actionItem?: React.ReactElement;
  onBackPress?: () => void;
}

type Props = OwnProps;

const SearchHeader: React.SFC<Props> = ({ title, subTitle, titleStyle, onBackPress, actionItem }: Props) => {
  const navigation = useNavigation();
  return (
    <AppThemeContext.Consumer>
      {value => (
        <View style={styles.container}>
          <TouchableOpacity onPress={onBackPress || navigation.goBack} style={styles.backIconContainer} {...accessibility("backIcon")}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20 }} source={localizeImage("BackIcon")} />
          </TouchableOpacity>
          <View style={[titleStyle, styles.titleContainer]}>
            {R.is(String, title) ? (
              <Text numberOfLines={1} style={[styles.title, { color: Colors.h1 }]}>
                {title}
              </Text>
            ) : (
              { title }
            )}
            <Text numberOfLines={1} style={[styles.title, { color: Colors.h1 }]}>
              {` "${subTitle}"`}
            </Text>
          </View>
          {actionItem && <View style={styles.rightItem}>{actionItem}</View>}
        </View>
      )}
    </AppThemeContext.Consumer>
  );
};

export default SearchHeader;
