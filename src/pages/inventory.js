import React from 'react';
import { fetchData } from "../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import { faTrash,faDrumstickBite } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bigInt from 'big-integer';
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "../components/Navbar/NavbarElements.js";
  
const Inventory = (props) => {

    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.blockchain.account !== "" && props.blockchain.cFont !== null) {
          dispatch(fetchData(props.blockchain.account));
        }
      }, [props.blockchain.cFont]);
      console.log(props.data);
    const reverseSwap = (id) => {
        setLoading(true);
        props.blockchain.cFont.methods
          .reverseSwap(id)
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
          });
      };
    
      

  return (
    <s.Container ai={"center"} style={{ }}>
        <s.SpacerSmall />
        {bigInt(props.data.tokenAllow) > bigInt(200 * 10**18) ? 
        (<button className= "button button2"
          disabled={loading ? 1 : 0}
          onClick={(e) => {
            e.preventDefault();
            mint();
          }}
        >
          Mint cFont (1 eBTC)
        </button>) :  (<button className= "button button2"
          disabled={loading || props.blockchain.eBitcoin == null  ? 1 : 0}
          onClick={(e) => {
            e.preventDefault();
            allowToken();
          }}
        >
          Allow Token
        </button>)}
        
        <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
            {props.data.allFont.map((item, index) => {
              if(props.data.MyFont.indexOf(item.id)>-1){
                return (
                    <NavLink key={item.id} to={"/font/"+item.id}>
                  <s.Container className="card m-5" key={index} style={{ padding: "15px" }}>
                      <Cfontrenderer font={item}/>
                    {/* <cFontRenderer className="phudImg" font={item} /> */}
                    <s.SpacerXSmall />
                    <s.Container>
                      <s.TextID>#{item.id}</s.TextID>
                      <s.TextDescription>NAME: {item.name}</s.TextDescription>
                      <s.TextDescription>POWER: {item.Power}</s.TextDescription>
                      <s.TextDescription>Size: {(20 + (item.Size % 80)) + 'px'}</s.TextDescription>
                      <s.Container fd={"row"}>
                      {/* <button className="button-s button2 feed" onClick={(e) => {
                      e.preventDefault();
                      allowToken();
                      }}>
                        <FontAwesomeIcon 
                       icon={faDrumstickBite} /> </button>
                       <button 
                       value={item.id}
                       className="button-s button2 trash" 
                       onClick={(e) => {
                      e.preventDefault();
                      reverseSwap(item.id);
                      }}>
                        <FontAwesomeIcon value={item.id} icon={faTrash} /> 
                        </button> */}
                      </s.Container>
                    </s.Container>
                  </s.Container>
                  </NavLink>
                );
              }
            })}
          </s.Container>
          
      </s.Container>

  );
        }
  
export default Inventory;