// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
        
      let allFont = await store
        .getState()
        .blockchain.cFont.methods.getcFont()
        .call();
      let MyFont = await store
        .getState()
        .blockchain.cFont.methods.getIdsOfOwner(account)
        .call();
      let NFTaddress = await store
        .getState()
        .blockchain.cFont._address;
      let tokenAllow = await store
        .getState()
        .blockchain.eBitcoin.methods.allowance(account, NFTaddress)
        .call();
      dispatch(
        fetchDataSuccess({
          allFont,
          MyFont,
          tokenAllow,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};