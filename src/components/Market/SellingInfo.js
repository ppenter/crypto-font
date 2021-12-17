import React from "react";
import * as s from "../../styles/global";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import { fetchData } from "../../redux/data/dataActions";
import { fetchMarket } from "../../redux/marketData/marketDataActions";
import { useDispatch, useSelector} from "react-redux";
import { fetchcFont } from "../../redux/cFontInfo/cFontInfoActions"
import bigInt from "big-integer";

const SellingInfo = (props) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const [listingPrice, setListingPrice] = useState('0')

    const approveEBTCToMarket = () => {
        setLoading(true);
        props.blockchain.eBitcoin.methods
          .approve(props.blockchain.eBTCMarket._address, "10000000000000000000000000000000000000")
          .send({
            from: props.blockchain.account
          })
          .once("error", (err) => {
            setLoading(false);
            console.log(err);
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(props.blockchain.account));
          });
      }

    const buy = (listingId) => {
        setLoading(true);
        props.blockchain.eBTCMarket.methods
          .buyToken(listingId)
          .send({
            from: props.blockchain.account
          })
          .once("error", (err) => {
            setLoading(false);
            console.log(err);
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(props.blockchain.account));
            dispatch(fetchMarket());
            dispatch(fetchcFont(props.id));
          });
      };

      const cancel = (listingId) => {
        setLoading(true);
        props.blockchain.eBTCMarket.methods
          .cancel(listingId)
          .send({
            from: props.blockchain.account
          })
          .once("error", (err) => {
            setLoading(false);
            console.log(err);
          })
          .then((receipt) => {
            setLoading(false);
            console.log(receipt);
            dispatch(fetchData(props.blockchain.account));
            dispatch(fetchMarket());
            dispatch(fetchcFont(props.id));
          });
      };

      console.log(props.list)

      const seller = props.list.seller.toLowerCase()

    return (
    <s.Container>
    <s.SpacerLarge></s.SpacerLarge>
                    <s.Container>
                        <s.Container jc="space-evenly" ai="center">
                            <s.TextDescription className="text-collapse">SELLER: {seller}</s.TextDescription>
                            
                        </s.Container>
                        <s.Container fd="row" jc="space-evenly" ai="center">
                            <s.TextDescription>PRICE: {parseFloat(props.list.price / 10**18).toFixed(4)} $eBTC</s.TextDescription>
                            
                        </s.Container>
                        <s.Container fd="row" jc="space-evenly" ai="center">
                            {bigInt(props.data.eBTCApproveToMarket) >= bigInt(props.list.price) ? (
                                <s.button onClick={(e) => { 
                                    e.preventDefault();
                                    approveEBTCToMarket();
                                }}>APPROVE</s.button>
                            ) : (
                                null
                            )}
                            {props.blockchain.account != null && props.blockchain.account != seller ? (
                                <s.button onClick={(e) => { 
                                    e.preventDefault();
                                    buy();
                                }}>BUY</s.button>
                            ):(
                                null
                            )}
                            {props.blockchain.account != null && props.blockchain.account == seller ? (
                                <s.button onClick={(e) => { 
                                    e.preventDefault();
                                    cancel(props.list.id);
                                }}>CANCEL</s.button>
                            ):(
                                null
                            )}
                            
                        </s.Container>
                    </s.Container>
    </s.Container>
    );
};
export default SellingInfo;