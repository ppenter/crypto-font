// constants
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import eBTCMarket from "../../contracts/Market.json";
import eBitcoin from "../../contracts/eBitcoin.json";
import cFont from "../../contracts/cryptoFont.json";
// log
import { fetchData } from "../data/dataActions";
import { fetchMarket } from "../marketData/marketDataActions";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "fc1094913ebd41a3853b32571ebe6bbb",
    }
  },
};

const web3Modal = new Web3Modal({
  network: process.env.REACT_APP_modalNetwork, // optional
  cacheProvider: true, // optional
  providerOptions // required
});



const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
      await web3Modal.clearCachedProvider();
      const provider = await web3Modal.connect();
      let web3 = new Web3(provider);
      const networkId = process.env.REACT_APP_networkID;
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      const cFontNetworkData = await cFont.networks[networkId];
      const eBitcoinNetworkData = await eBitcoin.networks[networkId];
      const eBTCMarketNetworkData = await eBTCMarket.networks[networkId];
    
      if (cFontNetworkData && eBitcoinNetworkData && eBTCMarketNetworkData && networkId == chainId) {
        const cFontContract = new web3.eth.Contract(
          cFont.abi,
          cFontNetworkData.address
        );
        const eBitcoinContract = new web3.eth.Contract(
          eBitcoin.abi,
          eBitcoinNetworkData.address
        );
        const eBTCMarketContract = new web3.eth.Contract(
          eBTCMarket.abi,
          eBTCMarketNetworkData.address
        );
        dispatch(
          connectSuccess({
            account: accounts[0],
            cFont: cFontContract,
            eBitcoin: eBitcoinContract,
            eBTCMarket: eBTCMarketContract,
            web3: web3,
          })
        );
        // Add listeners start
        provider.on("accountsChanged", (accounts) => {
          dispatch(updateAccount(accounts[0]));
        });
        provider.on("chainChanged", () => {
          window.location.reload();
        });
        // Add listeners end
      } else {
        dispatch(connectFailed("Change network to BSC Testnet."));
      }
  };
};

export const clearCache = () => {
  return async (dispatch) => {
    await web3Modal.clearCachedProvider();
    window.location.reload();
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
    dispatch(fetchMarket());
  };
};