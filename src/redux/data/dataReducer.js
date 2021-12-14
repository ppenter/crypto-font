const initialState = {
    loading: false,
    allFont: [],
    MyFont: [],
    eBTCamount: 0,
    tokenAllow: 0,
    eBTCApproveToMarket: 0,
    cFontApproveToMarket: false,
    error: false,
    errorMsg: "",
  };
  
  const dataReducer = (state = initialState, action) => {
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
          allFont: action.payload.allFont,
          MyFont: action.payload.MyFont,
          tokenAllow: action.payload.tokenAllow,
          eBTCamount: action.payload.eBTCamount,
          eBTCApproveToMarket: action.payload.eBTCApproveToMarket,
          cFontApproveToMarket: action.payload.cFontApproveToMarket,
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
  
  export default dataReducer;