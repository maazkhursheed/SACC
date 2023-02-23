import moment, { Moment } from "moment";
import * as R from "ramda";
import * as React from "react";
import { Platform } from "react-native";
import { isNilOrEmpty } from "~root/Lib/CommonHelper";

/**
 * Helper function to fetch the prop from db for the first instance of the table
 *
 * @param list Array list or collection
 * @param propName Prop name to select from the list item
 * @return Undefined if the lift is empty otherwise the prop value
 */

export const getPropFromList = R.curry((propName, list) => R.ifElse(isNilOrEmpty, R.always(undefined), R.compose(R.prop(propName), R.head))(list));

/**
 * Helper function to fetch the data from response if Api response is OK
 *
 * @param Api response
 * @return Undefined if the response is empty or null
 */

export const getDataIfResponseIsOK = (data: any) => R.ifElse(R.either(isNilOrEmpty, R.propEq("ok", false)), R.always(undefined), R.prop("data"))(data);

/**
 * Helper function returns network error response from api
 *
 * @return Undefined if the response is empty or null
 */

export const isResponseNetworkError = R.allPass([
  (data: any) => R.complement(isNilOrEmpty)(data),
  R.propEq("ok", false),
  R.compose(R.flip(R.includes)(["NETWORK_ERROR", "CONNECTION_ERROR"]), R.prop("problem")),
]);

/**
 * Helper function to shows to network error response
 *
 * @param Response object
 * @return Undefined if the response is empty or null
 */

export const isResponseOk = R.allPass([R.propEq("ok", true), R.complement(R.hasPath(["data", "error"])), R.complement(R.hasPath(["data", "errorMessage"]))]);

export const convertToPlaneJS = R.compose(JSON.parse, JSON.stringify);

export const isWeekend = (date: Moment) => {
  const weekday = moment.weekdays(date.day());
  return weekday === "Sunday" || weekday === "Saturday";
};

export const getRegionFromSelectedAddress = (selectedAddress: string | undefined) => {
  if (!selectedAddress) {
    return "";
  } else {
    const addressArray = selectedAddress.split(",");
    const region = addressArray[addressArray.length - 2];
    return region ? region.trim() : "";
  }
};

export const getPostalCodeFromSelectedAddress = (selectedAddress: string | undefined) => {
  if (!selectedAddress) {
    return "";
  } else {
    const addressArray = selectedAddress.split(",");
    const postalCode = addressArray[addressArray.length - 1];
    return postalCode ? postalCode.trim() : "";
  }
};

export function isValidURL(url: any | undefined) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return pattern.test(url);
}

export const accessibility = (id?: string) => {
  return Platform.OS === "android" ? { accessible: true, accessibilityLabel: id } : { accessible: false, testID: id };
};

export const getTruncatedItem = R.slice(0, 100);

// @ts-ignore
export const getTruncatedListNames = R.compose<string>(getTruncatedItem, R.join("|"), R.map(R.propOr("", "listName")));

// @ts-ignore
export const getTruncatedListItemsByProp = (prop: string, list?: any[]) => R.compose(getTruncatedItem, R.join("|"), R.map(R.prop(prop)))(list || []);

export const getFileNameWithoutExtension = (fileName: string) => {
  let indexOfDot = fileName.lastIndexOf(".");
  return fileName.substring(0, indexOfDot);
};
