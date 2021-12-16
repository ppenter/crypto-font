import React from "react";
import * as s from "../../styles/global";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch} from "react-redux";

const Price = (props) => {

    const {id, currency, list} = props;

    return (
        <s.TextDescription>
        {list.map((item, index) => {
              if(item.tokenId == id){
                return (
                    (parseFloat(item.price) /10**18).toFixed(4) + " " + currency
                );
              }
            })}
        </s.TextDescription>
    );
};
export default Price;