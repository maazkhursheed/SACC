import { ApiResponse } from "apisauce";
import { Observable } from "rxjs";
import { AddToWishListRequestParams, IDeleteTokenRequestParams } from "../Types/AuthAPITypes";
import { ISearchSolrParams } from "../Types/SearchAPITypes";
import createHybrisAPI from "./CreateHybrisAPI";

export default {
  create: {
    hybris: createHybrisAPI(),
  },
};

export interface Api {
  hybris: HybrisAPI;
}

export interface HybrisAPI {
  authorization: (params: any) => Observable<ApiResponse<any>>;
  directAuthorization: (params: any) => Observable<ApiResponse<any>>;
  solrSearch: (query: ISearchSolrParams, params: any) => Observable<ApiResponse<any>>;
  getHomeScreen: (params: any) => Observable<ApiResponse<any>>;
  deleteAccountApi: (bodyParams: IDeleteTokenRequestParams) => Observable<ApiResponse<any>>;
  searchSuggestions: (term: string, params: any) => Observable<ApiResponse<any>>;
  searchSuggestionByProduct: (query: string, params: any) => Observable<ApiResponse<any>>;
  addItemToWishListApi: (bodyParams: AddToWishListRequestParams) => Observable<ApiResponse<any>>;
  removeItemFromWishListApi: (bodyParams: AddToWishListRequestParams) => Observable<ApiResponse<any>>;
  checkCartApi: (params: any) => Observable<ApiResponse<any>>;
  createCartApi: (params: any) => Observable<ApiResponse<any>>;
  addProductToCartApi: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
  updateProductToCartApi: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
  removeItemFromCartApi: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
  removeAllCartItemsApi: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
  getCartCoupons: (params: any) => Observable<ApiResponse<any>>;
  checkCartCoupon: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
  applyCartCoupon: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
  removeAppliedVoucherApi: (cartParams: any, params: any) => Observable<ApiResponse<any>>;
}
