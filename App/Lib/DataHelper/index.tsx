import moment, { Moment } from "moment";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { Dimensions, Platform } from "react-native";
import { isNilOrEmpty, isTimberFlag, renameKeys } from "~root/Lib/CommonHelper";
import AppConfig from "../../Config/AppConfig";
import { getToken } from "../../utils";
import { returnBearer } from "../ProfileHelper";

const baseURL = AppConfig.BASE_URL;
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

export const inputs = {};

export const RfH = value => {
  const dim = Dimensions.get("window");
  return dim.height;
};

export const RfW = value => {
  const dim = Dimensions.get("window");
  return dim.width;
};

export const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};

export const deviceWidth = () => {
  const dim = Dimensions.get("window");
  return dim.width;
};

export const deviceHeight = () => {
  const dim = Dimensions.get("window");
  return dim.height;
};

export const homePageRotatingBanner1Items = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        title: val?.title,
        body: val?.content,
        Image: val?.media ? baseURL + val?.media?.mobile?.url : "",
        name: val?.message ?? "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};
export const mapBrandBannerItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        Image: val?.media ? baseURL + val?.media?.mobile?.url : "",
        name: val?.title ?? "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapBrandLogoItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        Image: val?.media ? baseURL + val?.media?.mobile?.url : "",
        name: val?.message ?? "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapCategoriesItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        categoryName: val?.message ?? "",
        Image: val?.media ? baseURL + val?.media?.url : "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
        name: val?.message,
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapSignatureCollectionrItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        title: val?.title,
        headline: val?.headline,
        Image: val?.media ? baseURL + val?.media?.url : "",
        message: val?.content,
        name: val?.title ?? "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

const mapGrandChildItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        title: R.pathOr("", ["entries", 0, "linkName"], val),
        children: [],
        url: R.takeLast(1, R.split("/", R.pathOr("", ["entries", 0, "url"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

const mapChildItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        title: R.pathOr("", ["entries", 0, "linkName"], val),
        children: val?.children?.length > 0 ? mapGrandChildItems(val?.children) : [],
        isExpanded: false,
        url: R.takeLast(1, R.split("/", R.pathOr("", ["entries", 0, "url"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapNavigationItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        title: R.pathOr("", ["entries", 0, "linkName"], val),
        children: val?.children?.length > 0 ? mapChildItems(val?.children) : [],
        isExpanded: false,
        url: R.takeLast(1, R.split("/", R.pathOr("", ["entries", 0, "url"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapBestSellerItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        SKU: val?.code,
        inWishlist: val?.inWishlist,
        Image: val?.images?.length > 0 ? baseURL + val?.images[0].url : "",
        ProductDescription: val?.name,
        Price: R.pathOr("0", ["price", "formattedValue"])(val),
        discountPrice: val?.discount?.discountPrice?.formattedValue ? R.pathOr("0", ["discount", "discountPrice", "formattedValue"])(val) : 0,
        percentage: val?.discount?.percentage ? Number(Number(R.pathOr("0", ["discount", "percentage"])(val)).toFixed(2)) : 0,
        savingPrice: val?.discount?.saving?.formattedValue ? R.pathOr("0", ["discount", "saving", "formattedValue"])(val) : 0,
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapTilesItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        Image: val?.media ? baseURL + val?.media?.url : "",
        title: val?.title ?? "",
        headline: val?.headline ?? "",
        body: val?.content ?? "",
        name: val?.title ?? "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mappromotionalItems = value => {
  const newArray = [];
  if (RA.isNotNilOrEmpty(value)) {
    value.map((val, index) => {
      const data = {
        Image: val?.media ? baseURL + val?.media?.url : "",
        title: val?.title ?? "",
        headline: val?.headline ?? "",
        content: val?.content ?? "",
        name: val?.title ?? "",
        categoryId: R.takeLast(1, R.split("/", R.pathOr("", ["urlLink"], val)))[0],
      };
      newArray.push(data);
    });
    return newArray;
  }
};

export const mapHomeData = data => {
  const newArray = {
    ourRecommendations: [],
    bestSellerRecommandedProduct: [],
    tilesData: [],
    signCollection: [],
    brandsBanner: [],
    homePageRotatingBanner1: [],
    promotionBanner: [],
    brandLogoBannerCarousel: [],
    featureCategories: [],
  };
  if (RA.isNotNilOrEmpty(data)) {
    data.map((val, index) => {
      if (val?.name == "Our Recommendation") {
        const localData = R.pathOr(0, ["components", "component", 0], val);
        const ourRecommendations = localData?.products ? mapBestSellerItems(localData?.products) : [];
        newArray.ourRecommendations = ourRecommendations?.length > 0 ? ourRecommendations : [];
      } else if (val?.name == "Recommended Product(for best seller)") {
        const localData = R.pathOr(0, ["components", "component", 0], val);
        const bestSellerRecommandedProduct = localData?.products ? mapBestSellerItems(localData?.products) : [];
        newArray.bestSellerRecommandedProduct = bestSellerRecommandedProduct?.length > 0 ? bestSellerRecommandedProduct : [];
      } else if (val?.name == "Tiles") {
        const tilesData = mapTilesItems(R.pathOr(0, ["components", "component"], val));
        newArray.tilesData = tilesData?.length > 0 ? tilesData : [];
      } else if (val?.name == "Signature Collection") {
        const signCollection = mapSignatureCollectionrItems(R.pathOr(0, ["components", "component"], val));
        newArray.signCollection = signCollection?.length > 0 ? signCollection : [];
      } else if (val?.name == "Brands Banner") {
        const brandsBanner = mapBrandBannerItems(R.pathOr(0, ["components", "component"], val));
        newArray.brandsBanner = brandsBanner?.length > 0 ? brandsBanner : [];
      } else if (val?.name == "Home Page Rotating Banner") {
        const homePageRotatingBanner1 = homePageRotatingBanner1Items(R.pathOr(0, ["components", "component"], val));
        newArray.homePageRotatingBanner1 = homePageRotatingBanner1?.length > 0 ? homePageRotatingBanner1 : [];
      } else if (val?.name == "Promotion Banner") {
        const promotionBanner = mappromotionalItems(R.pathOr(0, ["components", "component"], val));
        newArray.promotionBanner = promotionBanner?.length > 0 ? promotionBanner : [];
      } else if (val?.name == "Brand logo banner Carousel") {
        const brandLogoBannerCarousel = mapBrandLogoItems(R.pathOr(0, ["components", "component"], val));
        newArray.brandLogoBannerCarousel = brandLogoBannerCarousel?.length > 0 ? brandLogoBannerCarousel : [];
      } else if (val?.name == "Categories") {
        const CategoriesItems = mapCategoriesItems(R.pathOr(0, ["components", "component"], val));
        newArray.featureCategories = CategoriesItems?.length > 0 ? CategoriesItems : [];
      } else if (val?.name == "Navigation Bar") {
        const NavigationItems = mapNavigationItems(R.pathOr(0, ["components", "component", 0, "navigationNode", "children"], val));
        newArray.NavigationItems = NavigationItems?.length > 0 ? NavigationItems : [];
      }
    });
    return newArray;
  }
};

export const mapSanitizedItems = R.curry((state, value) => {
  const selectedMultiple = isTimberFlag(value) ? value.sellOrderMultiple.toString() : "0";
  const uniqueId = value.Sku + "-" + selectedMultiple;
  return {
    SKU: value?.Sku,
    inWishlist: value?.inWishlist,
    ProductDescription: value?.Description,
    UOM: value?.UnitOfMeasure || "",
    Availability: value?.Stock,
    Price: R.pathOr("0", ["price", "formattedValue"])(value),
    discountPrice: value?.discount?.discountPrice?.formattedValue ? R.pathOr("0", ["discount", "discountPrice", "formattedValue"])(value) : 0,
    savingPrice: value?.discount?.saving?.formattedValue ? R.pathOr("0", ["discount", "saving", "formattedValue"])(value) : 0,
    percentage: value?.discount?.percentage ? Number(Number(R.pathOr("0", ["discount", "percentage"])(value)).toFixed(2)) : 0,
    Image: value?.Image,
    Brand: value?.Brand,
    IsTimberProduct: value?.IsTimberProduct,
    SelectedMultiple: selectedMultiple,
    UniqueId: uniqueId,
    uomFormat: value?.uomFormat?.toString(),
    appUomFormat: value?.appUomFormat?.toString() || "",
    sellOrderMultiple: value?.sellOrderMultiple?.toString(),
    timberProductFlag: value?.IsTimberProduct,
    IsExpressOrder: value?.expressOrder || false,
    StockQuantity: value?.stock?.pmStockQuantity || "0",
    IsSpecial: value?.IsSpecial,
    PmExclusive: value?.pmExclusive,
    stock: value?.stock,
    RetailPrice: value?.retailPriceGstInclusive?.value,
    QuoteName: value?.QuoteName,
    QuoteDescription: value?.QuoteDescription,
    hasAlternateProducts: value?.hasAlternateProducts,
    hasRelatedProducts: value?.hasRelatedProducts,
    alternateProductCount: value?.alternateProductCount,
    relatedProductCount: value?.relatedProductCount,
    display: value?.display,
  };
});

export const sanitizeSolrSearchForDb = obj =>
  R.compose(
    R.mergeRight({
      Brand: R.propOr("", "manufacturer")(obj),
      Image: obj?.images?.length > 0 ? baseURL + R.pathOr("", ["images", "0", "url"])(obj) : "",
      Price: R.pathOr("0", ["price", "formattedValue"])(obj),
      Stock: "100",
      pmStockData: R.prop("stock")(obj),
      IsTimberProduct: R.propOr(false, "timberProductFlag")(obj),
      sellOrderMultiple: R.propOr(0, "sellOrderMultiple")(obj),
      SelectedMultiple: R.propOr(0, "sellOrderMultiple")(obj),
      uomFormat: R.propOr(0, "uomFormat")(obj),
      barcodesPM: R.propOr("", "barcodesPM")(obj),
      IsSpecial: obj?.specialProdWithAlphaSkuFlag === true || obj?.display === "SPECIAL",
      QuoteName: R.propOr("", "name")(obj),
      QuoteDescription: R.propOr("", "description")(obj),
      appUomFormat: R.propOr(0, "appUomFormat")(obj),
    }),
    renameKeys({
      code: "Sku",
      name: "Description",
      unitCode: "UnitOfMeasure",
    }),
  )(obj);

export const getPMCategoriesTileSlot = R.compose(
  R.pathOr([], ["components", "component"]),
  R.head,
  R.filter(R.propEq("slotId", "PMCategoryTilesSlot1")),
  R.pathOr([], ["contentSlots", "contentSlot"]),
);

export const getPMMoreCategoriesTileSlot = R.compose(
  R.pathOr([], ["components", "component"]),
  R.head,
  R.filter(R.propEq("slotId", "PMCategoryTilesSlot2")),
  R.pathOr([], ["contentSlots", "contentSlot"]),
);

export const getSanitizedListOfAllSuggestions = (data: any) => {
  const suggestions = R.map(obj => R.assoc("name", obj.value, obj))(R.slice(0, 4, R.propOr([], "suggestions")(data)));
  const assocList = (list: [any], assocKey: string, val: any) => list.map(R.assoc(assocKey, val));
  const category = R.propOr([], "category")(data);
  return R.flatten(R.prepend(assocList(suggestions, "isCategory", false), assocList(category, "isCategory", true)));
};

export const getSanitizedListOfSuggestions = (data: any) => {
  return R.map(obj => {
    obj = R.assoc("name", obj.value, obj);
    return R.assoc("isCategory", false, obj);
  })(R.propOr([], "suggestions")(data));
};

export const getUserParams = async () => {
  const authToken = await getToken();
  const obj = {
    username: authToken?.username,
    authToken: returnBearer(authToken?.password),
  };
  return obj;
};

export const isAnonymousLogin = async () => {
  const tokenResponse = await getToken();
  return tokenResponse?.username == "annonymous";
};
