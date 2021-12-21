const initialState = {
    loading: false,
    MyFont: [],
    eBTCamount: -1,
    tokenAllow: -1,
    eBTCApproveToMarket: -1,
    cFontApproveToMarket: false,
    eBTCreward: 0,
    ETHreward: 0,
    pastDistributedReward: 0,
    icoWhitelist: false,
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
          MyFont: action.payload.MyFont,
          tokenAllow: action.payload.tokenAllow,
          eBTCamount: action.payload.eBTCamount,
          eBTCApproveToMarket: action.payload.eBTCApproveToMarket,
          cFontApproveToMarket: action.payload.cFontApproveToMarket,
          pastDistributedReward: action.payload.pastDistributedReward,
          eBTCreward: action.payload.eBTCreward,
          ETHreward: action.payload.ETHreward,
          icoWhitelist: action.payload.icoWhitelist,
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