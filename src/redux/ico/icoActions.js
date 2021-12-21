// log
import store from "../store";
import ICO from "../../contracts/ICO.json";

const fetchICORequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchICOSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchICOFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchICO = () => {
  return async (dispatch) => {
    dispatch(fetchICORequest());
    let web3 = new Web3(process.env.REACT_APP_RPC);
    try {
        const deployedNetwork = ICO.networks[process.env.REACT_APP_networkID];
        const ICOContract = new web3.eth.Contract(
          ICO.abi,
          deployedNetwork.address,
        );
        const ICOAddress = ICO.networks[process.env.REACT_APP_networkID].address;
        let onsale = await MarketContract.methods.getOnsaleOfToken(cFontAddres).call();
        let icoReamin = await ICOContract.methods.availableTokens().call();
        let icoPrice = await ICOContract.methods.price().call();
        let minPurchase = await ICOContract.methods.minPurchase().call();
        let maxPurchase = await ICOContract.methods.maxPurchase().call();
        let end = await ICOContract.methods.end().call();

      dispatch(
        fetchMarketSuccess({
          icoReamin,
          icoPrice,
          minPurchase,
          maxPurchase,
          end,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchMarketFailed("Could not load data from contract."));
    }
  };
};