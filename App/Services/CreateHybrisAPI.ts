// a library to wrap and simplify api calls
import { create as apicreate } from "apisauce";
import R from "ramda";
import { from } from "rxjs";
import { HybrisAPI } from "~root/Services/Api";
import { generateURIfromObject } from "../Lib/CommonHelper";
import { IAuthTokenRequestParam } from "../Types/AuthAPITypes";
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
    baseURL: "https://api.c1ydyig1w-saudiairl1-d1-public.model-t.cc.commerce.ondemand.com/",
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
      ),
    );
  };
  const getHomeScreen = () => {
    return from(api.get(FB_PATH + "/cms/pages/mobileLandingPage?fields=FULL"));
  };
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  const authorization = (bodyParams: IAuthTokenRequestParam) => {
    return from(
      api.post(
        `https://api.c1ydyig1w-saudiairl1-d1-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token?client_id=${bodyParams.client_id}&client_secret=${bodyParams.client_secret}&grant_type=${bodyParams.grant_type}&username=${bodyParams.username}&password=${bodyParams.password}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      ),
    );
  };

  return {
    // a list of the API functions from step 2
    solrSearch,
    authorization,
    getHomeScreen,
  };
};
