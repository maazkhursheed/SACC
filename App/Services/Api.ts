import { ApiResponse } from "apisauce";
import { Observable } from "rxjs";
import { IDeleteTokenRequestParams } from "../Types/AuthAPITypes";
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
  solrSearch: (query: ISearchSolrParams, params: any) => Observable<ApiResponse<any>>;
  getHomeScreen: () => Observable<ApiResponse<any>>;
  deleteAccountApi: (bodyParams: IDeleteTokenRequestParams) => Observable<ApiResponse<any>>;
}
