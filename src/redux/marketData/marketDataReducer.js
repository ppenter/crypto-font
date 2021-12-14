const initialState = {
    loading: false,
    onsale: [],
    error: false,
    errorMsg: "",
  };
  
  const marketDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_Market_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CHECK_Market_SUCCESS":
        return {
          ...initialState,
          loading: false,
          onsale: action.payload.onsale,
        };
      case "CHECK_Market_FAILED":
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
  
  export default marketDataReducer;