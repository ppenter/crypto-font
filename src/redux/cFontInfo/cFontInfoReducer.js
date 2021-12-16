const initialState = {
    loading: false,
    cFontOwner: "",
    cFontInfo: [],
    price: 0,
    error: false,
    errorMsg: "",
  };
  
  const cFontInfoReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHECK_cFont_REQUEST":
        return {
          ...initialState,
          loading: true,
        };
      case "CHECK_cFont_SUCCESS":
        return {
          ...initialState,
          loading: false,
          cFontOwner: action.payload.cFontOwner,
          cFontInfo: action.payload.cFontInfo,
          price: action.payload.price,
        };
      case "CHECK_cFont_FAILED":
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
  
  export default cFontInfoReducer;