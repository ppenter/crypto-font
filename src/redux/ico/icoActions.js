// log
import store from "../store";
import ICO from "../../contracts/ICO.json";
import Web3 from "web3";

const fetchICORequest = () => {
  return {
    type: "CHECK_ICO_REQUEST",
  };
};

const fetchICOSuccess = (payload) => {
  return {
    type: "CHECK_ICO_SUCCESS",
    payload: payload,
  };
};

const fetchICOFailed = (payload) => {
  return {
    type: "CHECK_ICO_FAILED",
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
        deployedNetwork.address
      );
      let icoRemain = await ICOContract.methods.availableTokens().call();
      let icoPrice = await ICOContract.methods.price().call();
      let minPurchase = await ICOContract.methods.minPurchase().call();
      let maxPurchase = await ICOContract.methods.maxPurchase().call();
      let end = await ICOContract.methods.end().call();

      dispatch(
        fetchICOSuccess({
          icoRemain,
          icoPrice,
          minPurchase,
          maxPurchase,
          end,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchICOFailed("Could not load data from contract."));
    }
  };
};
