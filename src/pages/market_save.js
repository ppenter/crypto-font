import React from 'react';
import { fetchData } from "../redux/data/dataActions";
import { fetchMarket } from '../redux/marketData/marketDataActions';
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import bigInt from 'big-integer';
import Price from '../components/Market/Price';
import Overall from '../components/Infomation/Overall';
import {
    NavLink,
} from "../components/Navbar/NavbarElements.js";
  
const Inventory = (props) => {

    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.blockchain.account !== "" && props.blockchain.cFont !== null) {
          dispatch(fetchData(props.blockchain.account));
        }
        dispatch(fetchMarket());
      }, [dispatch]);
    
      const allowToken = () => {
        setLoading(true);
        props.blockchain.eBitcoin.methods
          .approve(props.blockchain.cFont._address, "10000000000000000000000000000")
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
      const mint = () => {
        setLoading(true);
        props.blockchain.cFont.methods
          .createRandomcFont()
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
          });
      };

      const getReward = () => {
        setLoading(true);
        props.blockchain.cFont.methods
          .getAllReward()
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
          });
      };

      const getEthers = () => {
        setLoading(true);
        props.blockchain.cFont.methods
          .getAllEthers()
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
          });
      };

      const date = new Date(props.data.pastDistributedReward*100);
    

  return (
    <s.Container ai="center">
      <s.SpacerLarge/>
        <s.SpacerLarge/>
      <Overall market={props.market}/>
      <s.SpacerLarge/>
        <s.SpacerLarge/>
    {props.blockchain.account ? (
    <s.Container ai="center" jc="center" style={{ flexWrap: "wrap"}}>
        <s.Container jc="space-evenly" fd={"row"} style={{ flexWrap: "wrap"}}>
        {bigInt(props.data.tokenAllow) > bigInt(200 * 10**18) ? 
        (<s.button
          disabled={loading || (parseFloat(props.data.eBTCamount) / 10**18) < 200 ? 1 : 0}
          onClick={(e) => {
            e.preventDefault();
            mint();
          }}
        >
          Mint cFont (100 eBTC)
        </s.button>
          ) :  (<s.button
          disabled={loading || props.data.eBTCamount < 0  ? 1 : 0}
          onClick={(e) => {
            e.preventDefault();
            allowToken();
          }}
        >
          Allow eBTC
        </s.button>)}
        </s.Container>

        <s.SpacerMedium />
        <s.Container jc="space-evenly" fd={"row"} style={{ flexWrap: "wrap"}}>
        <s.button
          disabled={loading || (parseFloat(props.data.eBTCreward) / 10**18) <= 0 ? 1 : 0}
          onClick={(e) => {
            e.preventDefault();
            getReward();
          }}
        >
          WITHDRAW $eBTC
        </s.button>
        <s.button
          disabled={loading || (parseFloat(props.data.ETHreward) / 10**18) <= 0 ? 1 : 0}
          onClick={(e) => {
            e.preventDefault();
            getEthers();
          }}
        >
          WITHDRAW BNB
        </s.button>
        </s.Container>
        
        <s.SpacerMedium />
        <s.Container jc="space-evenly" fd={"row"} style={{ flexWrap: "wrap"}}>
        <s.TextDescription>eBTC reward: {(parseFloat(props.data.eBTCreward) /10**18).toFixed(2)}</s.TextDescription>
        <s.TextDescription>BNB reward: {(parseFloat(props.data.ETHreward) /10**18).toFixed(2)}</s.TextDescription>
        </s.Container>
        <s.SpacerMedium />
        {props.blockchain.account ? (
          <s.Container jc={"space-evenly"} fd={"row"} style={{ flexWrap: "wrap"}}>
            {props.market.allFont.map((item, index) => {
              if(props.data.MyFont.indexOf(item.id)>-1){
                return (
                <NavLink key={item.id} to={"/font/"+item.id}>
                  <s.Container className="Fontcard" key={index} style={{ padding: "15px" }}>
                      <Cfontrenderer font={item}/>
                    {/* <cFontRenderer className="phudImg" font={item} /> */}
                    <s.SpacerXSmall />
                    <s.Container>
                      <s.TextID>#{item.id}</s.TextID>
                      <s.TextDescription>NAME: {item.name}</s.TextDescription>
                      <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                      <s.Container fd={"row"}>
                      </s.Container>
                    </s.Container>
                  </s.Container>
                  </NavLink>
                );
              }
              <s.SpacerLarge/>
            })}

            {props.market.activeList.map((item, index) => {
              if(item.seller.toLowerCase() == props.blockchain.account.toLowerCase()){
                
                const list = props.market.allFont[item.tokenId];
                return(
                  <NavLink key={list.id} to={"/font/"+list.id}>
                  <s.Container className="Fontcard" key={list.id} style={{ padding: "15px" }}>
                      <Cfontrenderer font={list}/>
                    {/* <cFontRenderer className="phudImg" font={item} /> */}
                    <s.SpacerXSmall />
                    <s.Container>
                      <s.TextID>#{list.id}</s.TextID>
                      <s.TextDescription>NAME: {list.name}</s.TextDescription>
                      <s.TextDescription>RARITY: {list.rarity}</s.TextDescription>
                      {/* <s.TextDescription>Size: {(20 + (list.Size % 80)) + 'px'}</s.TextDescription> */}
                      <Price id={list.id} currency={"$eBTC"} list={props.market.activeList}/>
                      <s.Container fd={"row"}>
                      </s.Container>
                    </s.Container>
                  </s.Container>
                  </NavLink>
                )
              }
              <s.SpacerLarge/>
            })}
          
          </s.Container>
        ) : (null)}
          
          
      </s.Container>): (
        <s.Container jc="space-evenly" fd={"row"} style={{ flexWrap: "wrap"}}>
          <s.button disabled={1}>
          Please Login For minting
        </s.button>
        </s.Container>
      )}
      </s.Container>
  );
        }
  
export default Inventory;