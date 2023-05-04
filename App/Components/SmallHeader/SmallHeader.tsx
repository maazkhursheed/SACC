import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import * as React from "react";
import { Image, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { accessibility } from "~root/Lib/DataHelper";
import { Colors } from "~root/Themes";
import AppThemeContext from "~root/Themes/AppThemeContext";
import Images from "../../Themes/Images";
import styles from "./SmallHeaderStyle";

interface OwnProps {
  titleStyle: ViewStyle;
  containerStyle?: ViewStyle;
  title?: string | React.ReactElement;
  subTitle?: string | React.ReactElement;
  actionItem?: React.ReactElement;
  onBackPress?: () => void;
}

type Props = OwnProps;

const SmallHeader: React.SFC<Props> = ({ title, subTitle, titleStyle, onBackPress, actionItem, containerStyle }: Props) => {
  const navigation = useNavigation();
  return (
    <AppThemeContext.Consumer>
      {value => (
        <View style={[styles.container, containerStyle]}>
          <TouchableOpacity onPress={onBackPress || navigation.goBack} style={styles.backIconContainer} {...accessibility("backIcon")}>
            <Image resizeMode={"contain"} style={{ width: 20, height: 20 }} source={Images.BackIcon} />
          </TouchableOpacity>
          <View style={[titleStyle, styles.titleContainer]}>
            {R.is(String, title) ? (
              <Text numberOfLines={1} style={[styles.title, { color: Colors.black }]}>
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
  );
};

export default SmallHeader;
