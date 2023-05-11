export const SORT = {
  RELEVANCE: "relevance",
  TOP_RATED: "topRated",
  PRICE_ASC: "price-asc",
  PRICE_DSC: "price-desc",
  NAME_ASC: "name-asc",
  NAME_DSC: "name-desc",
};

export const sortByPrice = (products: any, sortBy: string) => {
  let result: string[] = [];
  switch (sortBy) {
    case SORT.RELEVANCE:
      result = [...products].sort((a, b) => parseInt(a.Price, 10) - parseInt(b.Price, 10));
      break;
    case SORT.TOP_RATED:
      result = [...products].sort((a, b) => parseInt(a.Price, 10) - parseInt(b.Price, 10));
      break;
    case SORT.PRICE_ASC:
      result = [...products].sort((a, b) => parseInt(a.Price, 10) - parseInt(b.Price, 10));
      break;
    case SORT.PRICE_DSC:
      result = [...products].sort((a, b) => parseInt(b.Price, 10) - parseInt(a.Price, 10));
      break;
    case SORT.NAME_ASC:
      result = [...products].sort((a, b) => (a.QuoteName < b.QuoteName ? -1 : 1));
      break;
    case SORT.NAME_DSC:
      result = [...products].sort((a, b) => (a.QuoteName < b.QuoteName ? 1 : -1));
      break;
  }
  return result;
};
