import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import { fetchData } from "../../redux/data/dataActions";
import { fetchICO } from "../../redux/ico/icoActions";
import * as s from "../../styles/global";
const BuyIco = (props) => {
  const [loading, setLoading] = useState(false);
  const [listingPrice, setListingPrice] = useState("0");
  const dispatch = useDispatch();

  console.log(listingPrice);

  const buyico = (id) => {
    setLoading(true);
    props.blockchain.ICO.methods
      .buy()
      .send({
        from: props.blockchain.account,
        value: listingPrice,
      })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(props.blockchain.account));
        dispatch(fetchICO());
      });
  };

  return (
    <s.Container>
      price
      <s.Input
        type="number"
        min="0"
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
        <s.button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            buyico();
          }}
        >
          BUY
        </s.button>
      </s.Container>
    </s.Container>
  );
};
export default BuyIco;
