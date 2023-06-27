import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducers";
import styles from "../CouponComponent/CouponComponentStyle";

interface OwnProps {
  coupon?: any;
  selectedCouponCode?: string;
  onCouponSelection: (code: string) => void;
}
type Props = OwnProps;
const CouponComponent: React.FunctionComponent<Props> = ({ coupon, selectedCouponCode, onCouponSelection }: Props) => {
  const { preAppliedVouchers } = useSelector((state: RootState) => ({
    preAppliedVouchers: state?.cart?.cartData?.appliedVouchers,
  }));
  const [appliedVouchers, setAppliedVouchers] = useState<[]>([]);

  useEffect(() => {
    setAppliedVouchers(preAppliedVouchers);
  }, []);

  const couponCodes = appliedVouchers.map(coupon => coupon.code);
  const isCodeIncluded = couponCodes.includes(coupon.code);

  const handleCouponSelect = code => {
    onCouponSelection(code);
  };
  return (
    <TouchableOpacity
      key={coupon.code}
      style={styles.container}
      onPress={() => {
        handleCouponSelect(coupon.code);
      }}
    >
      {selectedCouponCode === coupon.code || isCodeIncluded ? (
        <View>
          <View style={styles.dottedBorderSelected}>
            <Text style={styles.textSelected}>{coupon.name}</Text>
          </View>
          <Text style={styles.textDesc}>{coupon.description}</Text>
        </View>
      ) : (
        <View>
          <View style={styles.dottedBorder}>
            <Text style={styles.text}>{coupon.name}</Text>
          </View>
          <Text style={styles.textDesc}>{coupon.description}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.radioCircle}
        onPress={() => {
          handleCouponSelect(coupon.code);
        }}
      >
        {(selectedCouponCode === coupon.code || isCodeIncluded) && <View style={styles.selectedRb} />}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default CouponComponent;
