import { useIsFocused } from "@react-navigation/native";
import { t } from "i18next";
import * as React from "react";
import { LayoutAnimation, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CloseDrawer from "./../../Images/closeButton/CloseDrawer.svg";
import styles from "./CustomDrawerStyles";
import { menuData } from "./DrawerUtils";
import ExpandableItemComponent from "./ExpandableItemComponent";

const CustomDrawerContainer = ({ navigation }) => {
  const [children, setChildren] = React.useState([]);
  const [parentIndex, setParentIndex] = React.useState(-1);
  const [listDataSource, setListDataSource] = React.useState([...menuData]);
  const isFocused = useIsFocused();
  if (!isFocused) {
    navigation.closeDrawer();
  }
  const updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    array.map((value, placeindex) => {
      if (placeindex === index) {
        array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"];
      } else {
        array[placeindex]["isExpanded"] = false;
      }
      setListDataSource(array);
    });
    if (!array[index]?.children) {
      navigation.navigate("ProductsListing", { item: array[index] });
    }
  };

  const resetChildLayout = items => {
    const array = [...items];
    array.map((value, placeindex) => {
      return (array[placeindex]["isExpanded"] = false);
    });
    const parentArray = [...listDataSource];
    parentArray[parentIndex]["children"] = array;
    setListDataSource(parentArray);
  };
  const updateChildLayout = (items, index, parentIndex) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...items];
    array.map((value, placeindex) => {
      return placeindex === index ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"]) : (array[placeindex]["isExpanded"] = false);
    });
    const parentArray = [...listDataSource];
    parentArray[parentIndex]["children"] = array;
    if (!array[index]?.children) {
      navigation.navigate("ProductsListing", { item: array[index] });
    }
    setListDataSource(parentArray);
  };
  return (
    <View>
      <View style={styles.welcomeContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.welcomeSubContainer}>
          <Text style={styles.menuHeaderText}>{t("welcome")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <CloseDrawer />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {listDataSource.map((item, key) => (
          <ExpandableItemComponent
            key={item.title}
            onClickFunction={() => {
              if (children.length > 0) {
                resetChildLayout(children);
              }
              updateLayout(key);
            }}
            onChildClickFunction={(items, childIndex) => {
              setChildren(items);
              setParentIndex(key);
              updateChildLayout(items, childIndex, key);
            }}
            onGrandChildClickFunction={grandItem => {
              navigation.navigate("ProductsListing", { item: grandItem });
            }}
            item={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};
export default CustomDrawerContainer;
