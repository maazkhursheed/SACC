import { t } from "i18next";
import * as React from "react";
import { forwardRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Divider from "../Divider";
import RefineFilterItemComponent from "../RadioButton/RefineFilterItemComponent";
import styles from "./RefineFacetsComponentStyle";

interface OwnProps {
  facets: any;
  showMore: boolean;
  onFacetTapped: (queryStr: string) => void;
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface RefineFacetsRef {
  handleResetClick: () => void;
}

type Props = OwnProps;
const RefineFacetsComponent: React.FunctionComponent<Props> = forwardRef<RefineFacetsRef, Props>(
  ({ facets, onFacetTapped, selectedValues, setSelectedValues }: Props, ref) => {
    const [isShowMore, setShowMore] = React.useState(true);
    const [showMoreBtn, setShowMoreBtn] = React.useState(facets?.values?.length > 5);

    React.useEffect(() => {
      setShowMoreBtn(facets?.values?.length > 5);
    }, [facets]);

    return (
      <View style={{ flexGrow: 1 }}>
        {facets.name !== "Price" && (
          <>
            <Text style={styles.titleBrand}>{t(facets?.name)}</Text>
            <Divider style={styles.divider} />
          </>
        )}
        {facets.name !== "Price" && (
          <FlatList
            data={isShowMore ? facets.values?.slice(0, 5) : facets.values}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <RefineFilterItemComponent
                data={item}
                onFacetTap={(queryStr: string) => onFacetTapped(queryStr)}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
        {showMoreBtn && facets.name !== "Price" && (
          <TouchableOpacity onPress={() => setShowMore(!isShowMore)}>
            <Text style={styles.moreText}>{isShowMore ? `+ ${facets.values.length - 5} ${t("more")}` : ` ${t("showLess")}`}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default RefineFacetsComponent;
