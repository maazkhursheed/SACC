export interface IAuthTokenRequestParam {
  grant_type?: string;
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  langCode: string;
}

export interface IDeleteTokenRequestParams {
  username: string;
  authToken: string;
  langCode: string;
}

export interface AddToWishListRequestParams {
  authToken: string;
  code: string;
  langCode: string;
}
