import bigInt from "big-integer";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import CardRenderer from "../components/CardRenderer";
import Overall from "../components/Infomation/Overall";
import { fetchData } from "../redux/data/dataActions";
import { fetchMarket } from "../redux/marketData/marketDataActions";
import * as s from "../styles/global";

const Inventory = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dateDis = parseFloat(props.market.pastDistributed + "000");
  console.log(dateDis);

  let allFonts = props.market.allFont.map((item, index) => {
    return {
      name: item.name,
      id: item.id,
      rarity: item.rarity,
      burn: item.burn,
      dna: item.dna,
      power: item.power,
      price: "0",
      seller: "",
      size: item.size,
    };
  });

  props.market.activeList.forEach((item) => {
    allFonts[item.tokenId].price = item.price;
    allFonts[item.tokenId].seller = item.seller;
  });

  const allowToken = () => {
    setLoading(true);
    props.blockchain.eBitcoin.methods
      .approve(props.blockchain.cFont._address, "10000000000000000000000000000")
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
  const mint = () => {
    setLoading(true);
    props.blockchain.cFont.methods
      .createRandomcFont()
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
      });
  };

  const getReward = () => {
    setLoading(true);
    props.blockchain.cFont.methods
      .getAllReward()
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
      });
  };

  const getEthers = () => {
    setLoading(true);
    props.blockchain.cFont.methods
      .getAllEthers()
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
      });
  };

  return (
    <s.Container ai="center" mw={1000}>
      <s.SpacerLarge />
      <Overall market={props.market} />
      <s.SpacerLarge />
      <s.SpacerLarge />
      {props.blockchain.account ? (
        <s.Container ai="center" jc="center" style={{ flexWrap: "wrap" }}>
          <s.Container
            jc="space-evenly"
            fd={"row"}
            style={{ flexWrap: "wrap" }}
          >
            {bigInt(props.data.tokenAllow) > bigInt(200 * 10 ** 18) ? (
              <s.button
                disabled={
                  loading || parseFloat(props.data.eBTCamount) / 10 ** 18 < 200
                    ? 1
                    : 0
                }
                onClick={(e) => {
                  e.preventDefault();
                  mint();
                }}
              >
                Mint cFont (100 eBTC)
              </s.button>
            ) : (
              <s.button
                disabled={loading || props.data.eBTCamount < 0 ? 1 : 0}
                onClick={(e) => {
                  e.preventDefault();
                  allowToken();
                }}
              >
                Allow eBTC
              </s.button>
            )}
          </s.Container>
          <s.SpacerMedium />
          Next reward will drop in :{" "}
          <Countdown date={dateDis + 604800000}></Countdown>
          <s.SpacerMedium />
          <s.Container
            jc="space-evenly"
            fd={"row"}
            style={{ flexWrap: "wrap" }}
          >
            <s.button
              disabled={
                loading || parseFloat(props.data.eBTCreward) / 10 ** 18 <= 0
                  ? 1
                  : 0
              }
              onClick={(e) => {
                e.preventDefault();
                getReward();
              }}
            >
              WITHDRAW $eBTC
            </s.button>
            <s.SpacerLarge />
            <s.button
              disabled={
                loading || parseFloat(props.data.ETHreward) / 10 ** 18 <= 0
                  ? 1
                  : 0
              }
              onClick={(e) => {
                e.preventDefault();
                getEthers();
              }}
            >
              WITHDRAW {process.env.REACT_APP_Native}
            </s.button>
          </s.Container>
          <s.SpacerLarge />
          <s.SpacerMedium />
          <s.Container
            jc="space-evenly"
            fd={"row"}
            style={{ flexWrap: "wrap" }}
          >
            <s.TextDescription>
              eBTC reward:{" "}
              {(parseFloat(props.data.eBTCreward) / 10 ** 18).toFixed(2)}
            </s.TextDescription>
            <s.TextDescription>
              {process.env.REACT_APP_Native} reward:{" "}
              {(parseFloat(props.data.ETHreward) / 10 ** 18).toFixed(2)}
            </s.TextDescription>
          </s.Container>
          <s.SpacerMedium />
          {props.blockchain.account ? (
            <s.Container
              jc={"space-evenly"}
              fd={"row"}
              style={{ flexWrap: "wrap" }}
            >
              {allFonts.map((item, index) => {
                if (
                  props.data.MyFont.indexOf(item.id) > -1 ||
                  item.seller.toLowerCase() ==
                    props.blockchain.account.toLowerCase()
                ) {
                  return (
                    <div key={index}>
                      <CardRenderer item={item} />
                      <s.SpacerLarge />
                    </div>
                  );
                }
              })}
            </s.Container>
          ) : null}
        </s.Container>
      ) : (
        <s.Container jc="space-evenly" fd={"row"} style={{ flexWrap: "wrap" }}>
          <s.button disabled={1}>Please Login For minting</s.button>
        </s.Container>
      )}
    </s.Container>
  );
};

export default Inventory;
