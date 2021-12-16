import React from 'react';
import { fetchMarket } from "../redux/marketData/marketDataActions"
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import bigInt from 'big-integer';
import Price from '../components/Market/Price';
import {
    NavLink,
} from "../components/Navbar/NavbarElements.js";
  
const Marketplace = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
          dispatch(fetchMarket());
      }, [dispatch]);

      console.log(props.market.activeList)
    
  return (
    <s.Screen>
      <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
            {props.market.allFont.map((item, index) => {
              if(props.market.onsale.indexOf(item.id)>-1){
                return (
                    <NavLink key={item.id} to={"/font/"+item.id}>
                  <s.Container className="Fontcard" key={index} style={{ padding: "15px" }}>
                      <Cfontrenderer font={item}/>
                    <s.SpacerXSmall />
                    <s.Container>
                      <s.TextID>#{item.id}</s.TextID>
                      <s.TextDescription>NAME: {item.name}</s.TextDescription>
                      <s.TextDescription>POWER: {item.Power}</s.TextDescription>
                      <s.TextDescription>Size: {(20 + (item.Size % 80)) + 'px'}</s.TextDescription>
                      <Price id={item.id} currency={"$eBTC"} list={props.market.activeList}/>
                      <s.Container fd={"row"}>
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