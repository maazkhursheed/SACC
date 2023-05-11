import * as React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View, ViewProps } from "react-native";
import HeaderTitle from "../BestSellerHeader/BestSellerHeader";
import styles from "./SignatureCollectionComponentStyle";
import SignatureCollectionItemComponent from "./SignatureCollectionItemComponent";

interface OwnProps {
  data: any;
  headingTitle: string;
  direction: string;
  containerStyle?: ViewProps;
}

type Props = OwnProps;
const SignatureCollectionComponent: React.FunctionComponent<Props> = ({ data, headingTitle, containerStyle, direction }: Props) => {
  const { t } = useTranslation();
  return (
    <FlatList
      data={data}
      contentContainerStyle={[styles.contentContainerStyle, containerStyle]}
      ListHeaderComponent={() => {
        return <View>{data?.length > 0 && <HeaderTitle title={headingTitle} count={data?.length ?? 0} />}</View>;
      }}
      renderItem={({ item }) => {
        return <SignatureCollectionItemComponent item={item} direction={direction} />;
      }}
      keyExtractor={(item, index) => index.toString()}
      // ListFooterComponent={data?.length > 0 && <Divider />}
      // ListEmptyComponent={() => {
      //   return (
      //     <View>
      //       <Text>{t("noSignatureProducts")}</Text>
      //       <Divider />
      //     </View>
      //   );
      // }}
    />
  );
};

export default SignatureCollectionComponent;
