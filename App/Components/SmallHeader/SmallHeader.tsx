import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import { localizeImage } from "../../i18n";
import styles from "./SmallHeaderStyle";
interface OwnProps {
  titleStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  title?: string | React.ReactElement;
  subTitle?: string | React.ReactElement;
  actionItem?: React.ReactElement;
  onBackPress?: () => void;
  titleTextStyle?: any;
}

type Props = OwnProps;

const SmallHeader: React.SFC<Props> = ({ title, subTitle, titleStyle, onBackPress, actionItem, containerStyle, titleTextStyle }: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <AppThemeContext.Consumer>
        {value => (
          <View style={[styles.container, containerStyle]}>
            <TouchableOpacity onPress={onBackPress || navigation.goBack} style={styles.backIconContainer} {...accessibility("backIcon")}>
              <Image resizeMode={"contain"} style={{ width: 18, height: 18 }} source={localizeImage("BackIcon")} />
            </TouchableOpacity>
            <View style={[titleStyle, styles.titleContainer]}>
              {R.is(String, title) ? (
                <Text numberOfLines={1} style={[styles.title, { color: Colors.black }, titleTextStyle]}>
                  {title}
                </Text>
              ) : (
                { title }
              )}
            </View>
            {actionItem && <View style={styles.rightItem}>{actionItem}</View>}
          </View>
        )}
      </AppThemeContext.Consumer>
    </SafeAreaView>
  );
};

export default SmallHeader;
