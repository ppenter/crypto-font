// log
import cFont from "../../contracts/cryptoFont.json";
import Market from "../../contracts/Market.json";
import Web3 from "web3";

const fetchcFontRequest = () => {
  return {
    type: "CHECK_cFont_REQUEST",
  };
};

const fetchcFontSuccess = (payload) => {
  return {
    type: "CHECK_cFont_SUCCESS",
    payload: payload,
  };
};

const fetchcFontFailed = (payload) => {
  return {
    type: "CHECK_cFont_FAILED",
    payload: payload,
  };
};

export const fetchcFont = (id) => {
  return async (dispatch) => {
    dispatch(fetchcFontRequest());

    console.log(process.env.REACT_APP_networkID);
    let web3 = new Web3(process.env.REACT_APP_RPC);
    try {
        const deployedNetwork = cFont.networks[process.env.REACT_APP_networkID];
        const marketDeployed = Market.networks[process.env.REACT_APP_networkID];

        const marketContract = new web3.eth.Contract(
          Market.abi,
          marketDeployed.address,
      );
        const cFontContract = new web3.eth.Contract(
            cFont.abi,
            deployedNetwork.address,
        );
        let cFontOwner = await cFontContract.methods.ownerOf(id).call()
        let cFontInfo = await cFontContract.methods.cFonts(id).call()
        let price = await marketContract.methods.getPriceOfId(cFontContract._address,id).call()
        console.log(price);
        let activeList = await marketContract.methods.getActiveArrayOfContract(cFontContract._address).call()
      dispatch(
        fetchcFontSuccess({
            cFontOwner,
            cFontInfo,
            price,
            activeList,

        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchcFontFailed("Could not load data from contract."));
    }
  };
};