import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoadingView from "../../Components/LoadingView";
import { isRTL } from "../../i18n";
import CloseButton from "../../Images/closeButton/CloseButton.svg";
import RemoveVoucher from "../../Images/ItemCloseIcon/Icon-close-circle.svg";
import Multiply from "../../Images/MultiplyIcon/multiply-line.svg";
import { accessibility } from "../../Lib/DataHelper";
import { RootState } from "../../Reducers";
import { CartAction } from "../../Reducers/CartReducer";
import styles from "../CartApplyCouponSheet/CartApplyCouponSheetStyle";
import CouponComponent from "../CouponComponent/CouponComponent";

interface OwnProps {
  onBackPress?: () => void;
}

type Props = OwnProps;

const CartApplyCouponSheet: React.FunctionComponent<Props> = ({ onBackPress }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [finalCoupon, setFinalCoupon] = useState("");
  const { coupons, isCartLoading, cartId, preAppliedVouchers } = useSelector((state: RootState) => ({
    coupons: state?.cart?.cartCoupons,
    isCartLoading: state?.cart?.isLoading,
    cartId: state?.cart?.cartData?.code,
    preAppliedVouchers: state?.cart?.cartData?.appliedVouchers,
  }));
  const [selectedCoupon, setSelectedCoupon] = useState("");

  useEffect(() => {
    dispatch(CartAction.checkCurrentCart());
  }, []);

  const handleInputChange = text => {
    setCouponCode(text);
  };

  const isButtonDisabled = finalCoupon.length === 0;

  const clear = () => {
    setCouponCode("");
    setMessage("");
    setCouponStatus(false);
  };

  const submit = text => {
    if (text.length > 0) {
      dispatch(
        CartAction.checkCartCoupon(text, {
          onSuccess: data => {
            if (data !== undefined && data) {
              setMessage(`${t("cart.validCodeMessagePartA")}`);
              setCouponStatus(true);
              setFinalCoupon(text);
            } else {
              setMessage(t("cart.invalidCodeMessage"));
              setCouponStatus(false);
              setFinalCoupon("");
            }
          },
        }),
      );
    } else if (text.length === 0) {
      setMessage("");
    }
  };
  const onCouponSelection = code => {
    setCouponCode(code);
    setFinalCoupon(code);
    setSelectedCoupon(code);
  };
  const applyCoupon = () => {
    const cartParams = {
      cartId: cartId,
      couponId: finalCoupon,
    };
    dispatch(
      CartAction.applyCartCoupon(cartParams, {
        onSuccess: () => {
          if (onBackPress !== undefined) {
            onBackPress();
          }
        },
        onFailure: () => {
          Alert.alert(t("login.errorTitle"), t("cart.couponExpired"), [{ text: t("Ok") }]);
        },
      }),
    );
  };
  const removeVoucher = voucherCode => {
    const cartParams = {
      cartId: cartId,
      couponId: voucherCode,
    };
    dispatch(
      CartAction.removeAppliedVoucher(cartParams, {
        onSuccess: () => {
          if (onBackPress !== undefined) {
            onBackPress();
          }
        },
        onFailure: () => {},
      }),
    );
  };
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
      <Text style={{ marginRight: 5 }}>{item.code}</Text>
      <TouchableOpacity onPress={() => removeVoucher(item.code)}>
        <RemoveVoucher />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.containerMain}>
      <View style={styles.content}>
        <View style={styles.subContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {t("cart.coupon")}
          </Text>
          <TouchableOpacity onPress={onBackPress} {...accessibility("crossIcon")}>
            <Multiply style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.couponTag}>{t("cart.enterCoupon")}</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
            style={[styles.textInput, isRTL() == "rtl" && { textAlign: "right" }]}
            placeholder={t("cart.couponCode")}
            placeholderTextColor={"#999999"}
            onSubmitEditing={() => submit(couponCode)}
            onChangeText={handleInputChange}
            autoFocus={false}
            value={couponCode}
          />
          {couponCode?.length > 0 ? (
            <TouchableOpacity style={styles.cleareBtn} onPress={clear}>
              <CloseButton />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => submit(couponCode)}>
            <Text style={styles.couponCheck}>{t("cart.check")}</Text>
          </TouchableOpacity>
        </View>
        <LoadingView isLoading={isCartLoading}>
          {couponStatus ? <Text style={styles.approvedCode}>{message}</Text> : <Text style={styles.unApprovedCode}>{message}</Text>}
        </LoadingView>
        {preAppliedVouchers.length > 0 && (
          <View style={styles.voucherContainer}>
            <Text style={styles.appliedCoupon}>{t("cart.couponApplied")}</Text>
            <FlatList
              data={preAppliedVouchers}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.code.toString()}
              renderItem={renderItem}
            />
          </View>
        )}
        <View style={styles.container}>
          <View style={styles.line} />
          <Text style={styles.word}>{t("cart.orUse")}</Text>
          <View style={styles.line} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={coupons}
          renderItem={({ item }) => {
            return <CouponComponent coupon={item} onCouponSelection={onCouponSelection} selectedCouponCode={selectedCoupon} />;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity style={[styles.button, isButtonDisabled && styles.buttonDisabled]} onPress={applyCoupon} disabled={isButtonDisabled}>
        <Text style={styles.buttonText}>{t("cart.apply")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartApplyCouponSheet;
