import React from "react";
import * as s from "../../styles/global";
import { useState } from "react";
import { fetchData } from "../../redux/data/dataActions";
import { fetchMarket } from "../../redux/marketData/marketDataActions";
import { useDispatch } from "react-redux";
import { fetchcFont } from "../../redux/cFontInfo/cFontInfoActions";
import bigInt from "big-integer";

const SellingInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const approveEBTCToMarket = () => {
    setLoading(true);
    props.blockchain.eBitcoin.methods
      .approve(
        props.blockchain.eBTCMarket._address,
        "10000000000000000000000000000000000000"
      )
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

  const buy = (listingId) => {
    setLoading(true);
    props.blockchain.eBTCMarket.methods
      .buyToken(listingId)
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

  const cancel = (listingId) => {
    setLoading(true);
    props.blockchain.eBTCMarket.methods
      .cancel(listingId)
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

  const isApprove =
    bigInt(props.data.eBTCApproveToMarket) > bigInt(props.list.price);

  const seller = props.list.seller.toLowerCase();

  return (
    <s.Container className="Fontcard">
      <s.SpacerLarge />
      <s.Container>
        <s.Container jc="space-evenly" ai="center">
          <s.TextDescription className="text-collapse">
            SELLER: {seller}
          </s.TextDescription>
        </s.Container>
        <s.Container fd="row" jc="space-evenly" ai="center">
          <s.TextDescription>
            PRICE: {parseFloat(props.list.price / 10 ** 18).toFixed(4)} $eBTC
          </s.TextDescription>
        </s.Container>
        <s.SpacerLarge />
        {props.blockchain.account != null ? (
          <s.Container fd="row" jc="space-evenly" ai="center">
            {!isApprove &&
            props.blockchain.account !== null &&
            props.blockchain.account.toLowerCase() !== seller ? (
              <s.button
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  approveEBTCToMarket();
                }}
              >
                APPROVE
              </s.button>
            ) : null}
            {isApprove &&
            props.blockchain.account !== null &&
            props.blockchain.account.toLowerCase() !== seller ? (
              <s.button
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  buy(props.list.id);
                }}
              >
                BUY
              </s.button>
            ) : null}
            {props.blockchain.account !== null &&
            props.blockchain.account.toLowerCase() === seller ? (
              <s.button
                onClick={(e) => {
                  e.preventDefault();
                  cancel(props.list.id);
                }}
              >
                CANCEL
              </s.button>
            ) : null}
          </s.Container>
        ) : null}
        <s.SpacerLarge />
      </s.Container>
    </s.Container>
  );
};
export default SellingInfo;
