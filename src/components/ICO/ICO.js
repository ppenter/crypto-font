import React from "react";
import * as s from "../../styles/global";
import Decimal from "../Decimal";
import { useState } from "react";
import BuyIco from "./BuyIco";
import ConfirmDialong from "../ConfirmDialog";

const ICO = (props) => {

    const [openPopup, setOpenPopup] = useState(false);

    const {blockchain, data, ico} = props;
    return(
        <s.Container className="Fontcard" style={{padding: 30}}>
            <s.TextTitle>ICO - {ico.end > 0 ? ("started"): ("not started")}</s.TextTitle>
        <s.Container ai="center" jc="space-evenly" fd="row" style={{flexWrap: "wrap"}}>
            <s.TextDescription style={{flexWrap: "wrap"}}>Remaining eBTC </s.TextDescription>
            <s.TextDescription style={{flexWrap: "wrap"}}>{ico.icoReamin < 0 ? ("0"):(<Decimal number={ico.icoRemain} currency={"eBTC"}/>)} / 1,000,000 eBTC</s.TextDescription>
        </s.Container>
        <s.Container ai="center" jc="space-evenly" fd="row" style={{flexWrap: "wrap"}}>
            <s.TextDescription style={{flexWrap: "wrap"}}>PRICE:  1 BNB {"->"} <Decimal number={ico.icoPrice} currency={"eBTC"}/></s.TextDescription>
            {blockchain.account ? (<s.button
            onClick = {() => setOpenPopup(true)}
            disabled = {data.icoWhitelist ? (0):(1)}
            >BUY</s.button>) : (<s.button
            disabled ={1}>Please Login</s.button>)}
        </s.Container>
        <ConfirmDialong
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
          title = "Buy eBTC"
          >
          <BuyIco data={data} font={props.font} blockchain = {props.blockchain}></BuyIco>
          </ConfirmDialong>
        </s.Container>
    )
};
export default ICO;