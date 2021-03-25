const init = {
  stocksData: [],
  stockSelected: "",
  singleStock: []
};

const stocks = (state = init, action) => {

  switch (action.type) {
    case "ALL_STOCK":
      return {
        ...state,
        stocksData: [...action.payload],
      };
    case "ONE_STOCK":
      return {
        ...state,
        singleStock: [...action.payload.result],
        stockSelected: action.payload.name
      };
    default:
      return state;
  }
};

export default stocks;
