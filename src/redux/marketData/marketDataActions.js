// log
import Web3 from "web3";
import cFont from "../../contracts/cryptoFont.json";
import Market from "../../contracts/Market.json";

const fetchMarketRequest = () => {
  return {
    type: "CHECK_Market_REQUEST",
  };
};

const fetchMarketSuccess = (payload) => {
  return {
    type: "CHECK_Market_SUCCESS",
    payload: payload,
  };
};

const fetchMarketFailed = (payload) => {
  return {
    type: "CHECK_Market_FAILED",
    payload: payload,
  };
};

export const fetchMarket = () => {
  return async (dispatch) => {
    dispatch(fetchMarketRequest());

    let web3 = new Web3(process.env.REACT_APP_RPC);
    try {
      const deployedNetwork = Market.networks[process.env.REACT_APP_networkID];
      const fontDeployed = cFont.networks[process.env.REACT_APP_networkID];
      const cFontContract = new web3.eth.Contract(
        cFont.abi,
        fontDeployed.address
      );
      const MarketContract = new web3.eth.Contract(
        Market.abi,
        deployedNetwork.address
      );
      const cFontAddres =
        cFont.networks[process.env.REACT_APP_networkID].address;
      let onsale = await MarketContract.methods
        .getOnsaleOfToken(cFontAddres)
        .call();
      let activeList = await MarketContract.methods
        .getActiveArrayOfContract(cFontAddres)
        .call();
      let allFont = await cFontContract.methods.getcFonts().call();
      let remainingeBTC = await cFontContract.methods.remainingeBTC().call();
      let remainingEthers = await cFontContract.methods
        .remainingEthers()
        .call();
      let feePool = await cFontContract.methods._feePool().call();
      let pastDistributed = await cFontContract.methods
        ._pastDistributedReward()
        .call();

      console.log(remainingEthers);

      dispatch(
        fetchMarketSuccess({
          onsale,
          activeList,
          allFont,
          remainingeBTC,
          remainingEthers,
          feePool,
          pastDistributed,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchMarketFailed("Could not load data from contract."));
    }
  };
};
