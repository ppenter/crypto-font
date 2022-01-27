const initialState = {
  loading: false,
  onsale: [],
  activeList: [],
  allFont: [],
  remainingeBTC: -1,
  remainingEthers: -1,
  feePool: -1,
  pastDistributed: 0,
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
        activeList: action.payload.activeList,
        allFont: action.payload.allFont,
        remainingeBTC: action.payload.remainingeBTC,
        remainingEthers: action.payload.remainingEthers,
        feePool: action.payload.feePool,
        pastDistributed: action.payload.pastDistributed,
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
