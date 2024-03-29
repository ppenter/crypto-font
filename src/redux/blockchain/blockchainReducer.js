const initialState = {
  loading: false,
  account: null,
  cFont: null,
  eBitcoin: null,
  eBTCMarket: null,
  ICO: null,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        cFont: action.payload.cFont,
        eBitcoin: action.payload.eBitcoin,
        eBTCMarket: action.payload.eBTCMarket,
        ICO: action.payload.ICO,
        web3: action.payload.web3,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
