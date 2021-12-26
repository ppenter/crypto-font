// log
import Market from "../../contracts/Market.json";
import cFont from "../../contracts/cryptoFont.json";
import Web3 from "web3";

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
          fontDeployed.address,
        );
        const MarketContract = new web3.eth.Contract(
          Market.abi,
          deployedNetwork.address,
        );
        const cFontAddres = cFont.networks[process.env.REACT_APP_networkID].address;
        let onsale = await MarketContract.methods.getOnsaleOfToken(cFontAddres).call()
        let activeList = await MarketContract.methods.getActiveArrayOfContract(cFontAddres).call()
        let allFonts = await cFontContract.methods.getcFonts().call();
        let remainingeBTC = await cFontContract.methods.remainingeBTC().call();
        let remainingEthers = await cFontContract.methods.remainingEthers().call();
        let feePool = await cFontContract.methods._feePool().call();

        let allFont = allFonts.map((item,index) => {
          return(
            {
            name: item.name,
            id: item.id,
            rarity: item.rarity,
            burn: item.burn,
            dna: item.dna,
            power: item.power,
            price: "0",
            seller: "",
            size: item.size,
            }
          )
        });
    
        activeList.forEach((item) => {
          allFont[item.tokenId].price = item.price;
          allFont[item.tokenId].seller = item.seller.toLowerCase();
        })

      dispatch(
        fetchMarketSuccess({
          onsale,
          activeList,
          allFont,
          remainingeBTC,
          remainingEthers,
          feePool,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchMarketFailed("Could not load data from contract."));
    }
  };
};