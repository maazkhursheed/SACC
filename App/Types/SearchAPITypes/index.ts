export interface IListRequestParam {
  userID?: string;
  listName: string;
}

export interface IItemListRequestParam extends IListRequestParam {
  skuList: string[];
}

export interface ISearchSolrParams {
  sort: string;
  query: string;
  currentPage?: string;
  auth?: string;
}

export interface IConfirmOrderRequestBody {
  transactionId?: string;
  sourceTransactionId?: string;
  transactionSource?: "YardAppSTC";
  parentBranchId?: string;
  fulfilmentBranchId?: string;
  accountCode?: string;
  orderId?: string;
  orderType?: string;
  state?: string;
}
