import React, { useState } from "react";
import * as s from "../../styles/global";
import ConfirmDialong from "../ConfirmDialog";
import Decimal from "../Decimal";
import BuyIco from "./BuyIco";

const ICO = (props) => {
  const [openPopup, setOpenPopup] = useState(false);
  const { blockchain, data, ico } = props;

  return (
    <s.Container className="Fontcard" style={{ padding: 30 }}>
      <s.TextTitle>ICO - {ico.end > 0 ? "started" : "not started"}</s.TextTitle>
      <s.Container
        ai="center"
        jc="space-evenly"
        fd="row"
        style={{ flexWrap: "wrap" }}
      >
        <s.TextDescription style={{ flexWrap: "wrap" }}>
          Remaining eBTC{" "}
        </s.TextDescription>
        <s.TextDescription style={{ flexWrap: "wrap" }}>
          {parseFloat(ico.icoRemain) < 0 ? (
            "0"
          ) : (
            <Decimal number={parseFloat(ico.icoRemain)} currency={"eBTC"} />
          )}{" "}
          / 1000000.00 eBTC
        </s.TextDescription>
      </s.Container>
      <s.Container
        ai="center"
        jc="space-evenly"
        fd="row"
        style={{ flexWrap: "wrap" }}
      >
        <s.TextDescription style={{ flexWrap: "wrap" }}>
          PRICE: 1 ETH {"->"}{" "}
          <Decimal
            number={parseFloat(ico.icoPrice)}
            decimal={0}
            currency={"eBTC"}
          />
        </s.TextDescription>
        {blockchain.account ? (
          <s.button
            onClick={() => setOpenPopup(true)}
            disabled={ico.end > 0 ? 0 : 1}
          >
            BUY
          </s.button>
        ) : (
          <s.button disabled={1}>Please Login</s.button>
        )}
      </s.Container>
      <ConfirmDialong
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Buy eBTC"
      >
        <BuyIco
          data={data}
          font={props.font}
          blockchain={props.blockchain}
        ></BuyIco>
      </ConfirmDialong>
    </s.Container>
  );
};
export default ICO;
