import React from "react";
import * as s from "../../styles/global";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch} from "react-redux";

const ListingForm = (props) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    console.log(props.id);

    const sell = (id) => {
        setLoading(true);
        props.blockchain.eBTCMarket.methods
          .listToken(props.blockchain.cFont._address, id, listingPrice)
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
      };

      const [listingPrice, setListingPrice] = useState('0')
      console.log(listingPrice);

    return (
    <s.Container>
    price
    <s.Input type="number" min="0"
    onChange={ 
        (e) => setListingPrice(e.target.value != "" ? (
            Web3.utils.toWei((e.target.value).toString())
        ) : (
            0
        ))
    }
    ></s.Input>
    <s.SpacerLarge></s.SpacerLarge>
    <s.Container flex="1" fd="row" jc="space-evenly" ai="center">
    <s.button onClick={(e) => { 
        e.preventDefault();
        sell(props.id);
    }}>SELL</s.button>
    </s.Container>
    </s.Container>
    );
};
export default ListingForm;