import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from "./blockchain/blockchainReducer";
import dataReducer from "./data/dataReducer";
import marketReducer from "./marketData/marketDataReducer";
import cFontInfoReducer from "./cFontInfo/cFontInfoReducer";
import icoReducer from "./ico/icoReducer";


const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
  font: cFontInfoReducer,
  market: marketReducer,
  ico: icoReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;