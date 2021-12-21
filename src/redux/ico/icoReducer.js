const initialState = {
    loading: false,
    icoReamin: -1,
    icoPrice: -1,
    minPurchase: -1,
    maxPurchase: -1,
    end: 0,
    error: false,
    errorMsg: "",
  };
  
  const icoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_DATA_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CHECK_DATA_SUCCESS":
        return {
          ...initialState,
          loading: false,
          icoReamin: action.payload.icoReamin,
          icoPrice: action.payload.icoPrice,
          minPurchase: action.payload.minPurchase,
          maxPurchase: action.payload.maxPurchase,
          end: action.payload.end,
        };
      case "CHECK_DATA_FAILED":
        return {
          ...initialState,
          loading: false,
          error: true,
          errorMsg: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default icoReducer;