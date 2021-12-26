import React from "react";
import * as s from "../../styles/global";
import { useState } from "react";
import Web3 from "web3";
import { fetchData } from "../../redux/data/dataActions";
import { fetchMarket } from "../../redux/marketData/marketDataActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchcFont } from "../../redux/cFontInfo/cFontInfoActions";

const TransferForm = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const market = useSelector((state) => state.market);

  const sell = (id) => {
    setLoading(true);
    props.blockchain.eBTCMarket.methods
      .listToken(props.blockchain.cFont._address, props.id, listingPrice)
      .send({
        from: props.blockchain.account,
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

  const approve = () => {
    setLoading(true);
    props.blockchain.cFont.methods
      .setApprovalForAll(props.blockchain.eBTCMarket._address, "true")
      .send({
        from: props.blockchain.account,
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
  };

  const [listingPrice, setListingPrice] = useState("0");
  if (market.onsale.indexOf(props.id) > -1) {
    return "This cFont is already listed!";
  } else {
    return (
      <s.Container>
        price
        <s.Input
          type="number"
          min="0"
          disabled={!props.data.cFontApproveToMarket ? 1 : 0}
          onChange={(e) =>
            setListingPrice(
              e.target.value !== ""
                ? Web3.utils.toWei(e.target.value.toString())
                : 0
            )
          }
        ></s.Input>
        <s.SpacerLarge></s.SpacerLarge>
        <s.Container flex="1" fd="row" jc="space-evenly" ai="center">
          {props.data.cFontApproveToMarket ? (
            <s.button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                sell(props.id);
              }}
            >
              SELL
            </s.button>
          ) : (
            <s.button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                approve();
              }}
            >
              APPROVE
            </s.button>
          )}
        </s.Container>
      </s.Container>
    );
  }
};
export default TransferForm;
