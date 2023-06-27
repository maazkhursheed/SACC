// a library to wrap and simplify api calls
import { create as apicreate } from "apisauce";
import R from "ramda";
import { from } from "rxjs";
import { HybrisAPI } from "~root/Services/Api";
import AppConfig from "../Config/AppConfig";
import { generateURIfromObject } from "../Lib/CommonHelper";
import { IAuthTokenRequestParam, IDeleteTokenRequestParams } from "../Types/AuthAPITypes";
import { ISearchSolrParams } from "../Types/SearchAPITypes";

const FB_PATH = "occ/v2/skysales-sa";

// our "constructor"
export default (): HybrisAPI => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apicreate({
    baseURL: AppConfig.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 20000,
  });
  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const solrSearch = (query: ISearchSolrParams, params: any) => {
    return from(
      api.get(
        FB_PATH +
          "/products/search?" +
          generateURIfromObject({
            query: R.compose(R.ifElse(R.isNil, R.identity, R.compose(encodeURIComponent, R.replace(/[+]/g, " "), decodeURIComponent, R.prop("query"))))(query),
            currentPage: query && query.currentPage,
            sort: (query && query?.sort) ?? "relevance",
            fields: "FULL",
          }),
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: params?.authToken?.authToken,
          },
        },
      ),
    );
  };
  const getHomeScreen = (params: any) => {
    return from(
      api.get(
        FB_PATH + "/cms/pages/mobileLandingPage?fields=FULL",
        { lang: params?.langCode ?? "en" },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const authorization = (bodyParams: IAuthTokenRequestParam) => {
    return from(
      api.post(
        `authorizationserver/oauth/token?client_id=${bodyParams.client_id}&client_secret=${bodyParams.client_secret}&grant_type=${
          bodyParams.grant_type
        }&username=${encodeURIComponent(bodyParams.username)}&password=${bodyParams.password}&lang=${bodyParams?.langCode ?? "en"}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );
  };

  const directAuthorization = (bodyParams: IAuthTokenRequestParam) => {
    return from(
      api.post(
        `authorizationserver/oauth/token?client_id=${bodyParams.client_id}&client_secret=${bodyParams.client_secret}&grant_type=${bodyParams.grant_type}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );
  };

  const deleteAccountApi = (bodyParams: IDeleteTokenRequestParams) => {
    return from(
      api.delete(
        FB_PATH + `/users/${encodeURIComponent(bodyParams.username)}?lang=${bodyParams?.langCode ?? "en"}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: bodyParams.authToken,
          },
        },
      ),
    );
  };

  const searchSuggestions = (term: string, params: any) =>
    from(api.get(FB_PATH + `/products/suggestions?fields=FULL&max=2&lang=${params?.lang ?? "en"}`, { term }));

  const searchSuggestionByProduct = (query: string, params: any) => {
    return from(
      api.get(
        FB_PATH +
          "/products/search?" +
          generateURIfromObject({
            query: query,
            currentPage: 0,
            sort: "relevance",
            fields: "FULL",
            pageSize: 2,
            lang: params?.lang ?? "en",
          }),
      ),
    );
  };

  const checkCartApi = (params: any) => {
    return from(
      api.get(
        FB_PATH + `/users/${encodeURIComponent(params.username)}/carts/current`,
        {
          fields: "FULL",
          lang: params?.langCode ?? "en",
        },
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const addItemToWishListApi = (bodyParams: any) => {
    return from(
      api.get(
        FB_PATH + `/users/current/wishlist/add-product-to-wishlist?code=${bodyParams.code}&lang=${bodyParams?.langCode ?? "en"}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: bodyParams?.authToken?.authToken,
          },
        },
      ),
    );
  };
  const createCartApi = (params: any) => {
    return from(
      api.post(
        FB_PATH + `/users/${encodeURIComponent(params.username)}/carts`,
        {
          fields: "FULL",
          lang: params?.langCode ?? "en",
        },
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const removeItemFromWishListApi = (bodyParams: any) => {
    return from(
      api.get(
        FB_PATH + `/users/current/wishlist/remove-product-from-wishlist?code=${bodyParams.code}&lang=${bodyParams?.langCode ?? "en"}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: bodyParams?.authToken?.authToken,
          },
        },
      ),
    );
  };

  const addProductToCartApi = (cartParams, params: any) => {
    return from(
      api.post(
        FB_PATH + `/users/${encodeURIComponent(params.username)}/carts/${cartParams?.cartId}/entries?fields=FULL&lang=${params?.langCode ?? "en"}`,
        cartParams.productDetail,
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };
  const updateProductToCartApi = (cartParams, params: any) => {
    return from(
      api.put(
        FB_PATH +
          `/users/${encodeURIComponent(params.username)}/carts/${cartParams?.cartId}/entries/${cartParams?.entryNumber}?fields=FULL&lang=${
            params?.langCode ?? "en"
          }`,
        cartParams.productDetail,
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const removeItemFromCartApi = (cartParams, params: any) => {
    return from(
      api.delete(
        FB_PATH +
          `/users/${encodeURIComponent(params.username)}/carts/${cartParams?.cartId}/entries/${cartParams?.entryNumber}?fields=FULL&lang=${
            params?.langCode ?? "en"
          }`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const removeAllCartItemsApi = (cartId, params: any) => {
    return from(
      api.delete(
        FB_PATH + `/users/${encodeURIComponent(params.username)}/carts/${cartId}/removeAll`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const getCartCoupons = (params: any) => {
    return from(
      api.get(
        FB_PATH + "/carts/coupons?fields=FULL",
        { lang: params?.langCode ?? "en" },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const checkCartCoupon = (couponId: string, params: any) => {
    return from(
      api.get(
        FB_PATH + `/carts/check/${couponId}?fields=BASIC`,
        { lang: params?.langCode ?? "en" },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const applyCartCoupon = (cartParams, params: any) => {
    return from(
      api.post(
        FB_PATH + `/users/${encodeURIComponent(params.username)}/carts/${cartParams.cartId}/vouchers?voucherId=${cartParams.couponId}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  const removeAppliedVoucherApi = (cartParams, params: any) => {
    return from(
      api.delete(
        FB_PATH + `/users/${encodeURIComponent(params.username)}/carts/${cartParams.cartId}/vouchers/${cartParams.couponId}`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: params.authToken,
          },
        },
      ),
    );
  };

  return {
    solrSearch,
    authorization,
    directAuthorization,
    getHomeScreen,
    deleteAccountApi,
    searchSuggestions,
    addItemToWishListApi,
    removeItemFromWishListApi,
    checkCartApi,
    createCartApi,
    addProductToCartApi,
    updateProductToCartApi,
    removeItemFromCartApi,
    removeAllCartItemsApi,
    searchSuggestionByProduct,
    getCartCoupons,
    checkCartCoupon,
    applyCartCoupon,
    removeAppliedVoucherApi,
  };
};
