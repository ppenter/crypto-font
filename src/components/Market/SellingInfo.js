import React from "react";
import * as s from "../../styles/global";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { BigNumber } from "bignumber.js";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch} from "react-redux";

const SellingInfo = (props) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


      const [listingPrice, setListingPrice] = useState('0')

    return (
    <s.Container>
    <s.SpacerLarge></s.SpacerLarge>
    {props.list ? (
        props.list.map((item, index) => {
            if(item.tokenId == props.id){
                return(
                    <s.Container>
                        <s.Container flex="1" fd="row" jc="space-between" ai="center">
                            <s.TextDescription>PRICE: {parseFloat(item.price / 10**18).toFixed(4)} $eBTC</s.TextDescription>
                            <s.button>BUY</s.button>
                        </s.Container>
                        <s.Container flex="1" fd="row" jc="space-between" ai="center">
                            <s.TextDescription>SELLER: {item.seller} $eBTC</s.TextDescription>
                            
                        </s.Container>
                    </s.Container>
                );
            }else{
                
            }
    }
    )) : (
        null
        )}
    </s.Container>
    );
};
export default SellingInfo;