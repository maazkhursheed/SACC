import { ApiResponse } from "apisauce";
import { Observable } from "rxjs";
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
  getProductDetails: (sku: string, params: any) => Observable<ApiResponse<any>>;
}
