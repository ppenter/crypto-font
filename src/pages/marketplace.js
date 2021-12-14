import React from 'react';
import { fetchMarket } from "../redux/marketData/marketDataActions"
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import bigInt from 'big-integer';
import {
    NavLink,
} from "../components/Navbar/NavbarElements.js";
  
const Marketplace = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
          dispatch(fetchMarket());
      }, [dispatch]);
    
  return (
    <s.Screen>
      <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
            {props.data.allFont.map((item, index) => {
              if(props.market.onsale.indexOf(item.id)>-1){
                return (
                    <NavLink key={item.id} to={"/font/"+item.id}>
                  <s.Container className="Fontcard m-5" key={index} style={{ padding: "15px" }}>
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
    </s.Screen>
  );
};
  
export default Marketplace;