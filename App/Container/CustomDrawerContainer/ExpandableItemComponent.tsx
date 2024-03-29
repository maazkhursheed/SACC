import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DownArrowIcon from "../../Images/downArrow/DownArrowWhite.svg";
import styles from "./CustomDrawerStyles";
interface Props {
  item: any;
  onClickFunction: () => void;
  onChildClickFunction: (items, index) => void;
  onGrandChildClickFunction: (grandItem) => void;
}

const ExpandableItemComponent: React.SFC<Props> = ({ item, onClickFunction, onChildClickFunction, onGrandChildClickFunction }: Props) => {
  const [layoutHeight, setlayoutHeight] = React.useState(0);
  const [subLayoutHeight, setSubLayoutHeight] = React.useState(0);

  React.useEffect(() => {
    if (item.isExpanded && item?.children?.length > 0) {
      setlayoutHeight(item?.children?.length * 55);
    } else {
      setlayoutHeight(0);
    }
  }, [item.isExpanded]);

  const onSubItemClick = (item, key, subItem) => {
    onChildClickFunction(item.children, key);
    if (subItem?.isExpanded && subItem?.children) {
      const subHeight = subItem?.children.length * 55;
      setlayoutHeight(item?.children?.length * 55 + subHeight);
      setSubLayoutHeight(subHeight);
    } else {
      setlayoutHeight(item?.children?.length * 55);
      setSubLayoutHeight(0);
    }
  };

  const ArrowDownButton = (...args: any) => {
    const { onDropClick } = args[0];
    return (
      <TouchableOpacity style={styles.arrowDownContainer} onPress={() => onDropClick()}>
        <DownArrowIcon style={styles.arrowDown} />
      </TouchableOpacity>
    );
  };

  const ChildArrowDownButton = (...args: any) => {
    const { onDropClick, index, item, subItem } = args[0];
    return (
      <TouchableOpacity style={styles.arrowDownContainer} onPress={() => onDropClick(item, index, subItem)}>
        <DownArrowIcon style={styles.arrowDown} />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={() => onGrandChildClickFunction(item)} style={styles.menuContainer}>
        <Text style={styles.menuText}>{item.title}</Text>
        {item?.children?.length > 0 && <ArrowDownButton onDropClick={onClickFunction} />}
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        {item?.children?.length > 0 &&
          item?.children?.map((subItem, key) => {
            return (
              <View>
                <TouchableOpacity onPress={() => onGrandChildClickFunction(subItem)} style={styles.childMenuItem} key={key}>
                  <Text style={styles.subMenuText}>{subItem.title}</Text>
                  {subItem?.children?.length > 0 && <ChildArrowDownButton onDropClick={onSubItemClick} item={item} index={key} subItem={subItem} />}
                </TouchableOpacity>
                <View style={{ height: subItem.isExpanded ? subLayoutHeight : 0, overflow: "hidden" }}>
                  {subItem?.children?.length > 0 &&
                    subItem?.children?.map((grandChild, grandChildIndex) => {
                      return (
                        <View>
                          <TouchableOpacity onPress={() => onGrandChildClickFunction(grandChild)} style={styles.grandChildMenuItem} key={grandChildIndex}>
                            <Text style={styles.grandMenuText}>{grandChild.title}</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default ExpandableItemComponent;
