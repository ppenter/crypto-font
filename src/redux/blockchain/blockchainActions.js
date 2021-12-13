// constants
import Web3 from "web3";
import eBitcoin from "../../contracts/eBitcoin.json";
import cFont from "../../contracts/cryptoFont.json";
// log
import { fetchData } from "../data/dataActions";

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
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {

        await window.ethereum.send('eth_requestAccounts');

        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        const cFontNetworkData = await cFont.networks[networkId];
        const eBitcoinNetworkData = await eBitcoin.networks[networkId];
        
        if (cFontNetworkData && eBitcoinNetworkData) {
          const cFontContract = new web3.eth.Contract(
            cFont.abi,
            cFontNetworkData.address
          );
          const eBitcoinContract = new web3.eth.Contract(
            eBitcoin.abi,
            eBitcoinNetworkData.address
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              cFont: cFontContract,
              eBitcoin: eBitcoinContract,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to BSC Testnet."));
        }
      } catch (err) {
        dispatch(connectFailed(err));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};