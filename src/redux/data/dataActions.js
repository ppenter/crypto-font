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
        
      let MyFont = await store
        .getState()
        .blockchain.cFont.methods.getIdsOfOwner(account)
        .call();

      let NFTaddress = await store
        .getState()
        .blockchain.cFont._address;
      let Marketaddress = await store
        .getState()
        .blockchain.eBTCMarket._address;

      let tokenAllow = await store
        .getState()
        .blockchain.eBitcoin.methods.allowance(account, NFTaddress)
        .call();

      let eBTCamount = await store
        .getState()
        .blockchain.eBitcoin.methods.balanceOf(account)
        .call();
      let eBTCApproveToMarket = await store
        .getState()
        .blockchain.eBitcoin.methods.allowance(account, Marketaddress)
        .call();

      let cFontApproveToMarket = await store
        .getState()
        .blockchain.cFont.methods.isApprovedForAll(account, Marketaddress)
        .call();

      // let eBTCreward = 0;
      // let ETHreward = 0;
      console.log(account);
      const eBTCreward = await store
        .getState()
        .blockchain.cFont.methods.showReward(account)
        .call();
      const ETHreward = await store
        .getState()
        .blockchain.cFont.methods.showEthers("0xd78958ef33f82cfad358f2a855a06c059542598f")
        .call();  
      let pastDistributedReward = await store
        .getState()
        .blockchain.cFont.methods.pastDistributedReward()
        .call();  
      dispatch(
        fetchDataSuccess({
          MyFont,
          tokenAllow,
          eBTCamount,
          eBTCApproveToMarket,
          cFontApproveToMarket,
          eBTCreward,
          ETHreward,
          pastDistributedReward,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};