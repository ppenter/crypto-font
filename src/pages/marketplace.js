import React from 'react';
import { fetchMarket } from "../redux/marketData/marketDataActions"
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import bigInt from 'big-integer';
import Price from '../components/Market/Price';
import { Dropdown } from 'react-bootstrap';
import {
    NavLink,
} from "../components/Navbar/NavbarElements.js";
  
const Marketplace = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
          dispatch(fetchMarket());
      }, [dispatch]);

    
    const [marketIndex, setmarketIndex] = useState(-1);

    const setMarket = (e) => {
      dispatch(fetchMarket());
      setmarketIndex(e);
    };

    
  return (
    <s.Screen>
      <s.SpacerMedium />
      <s.Container jc="space-evenly" ai="center">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => {setMarket(-1)}}>On sale</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {setMarket(-2)}}>All Fonts</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <s.SpacerLarge/>
      </s.Container>
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
            {props.market.allFont.map((item, index) => {
              if(props.market.onsale.indexOf(item.id)>marketIndex){
                return (
                    <NavLink key={item.id} to={"/font/"+item.id}>
                  <s.Container className="Fontcard" key={index} style={{ padding: "15px" }}>
                      <Cfontrenderer font={item}/>
                    <s.SpacerXSmall />
                    <s.Container>
                      <s.TextID>#{item.id}</s.TextID>
                      <s.TextDescription>NAME: {item.name}</s.TextDescription>
                      <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                      {/* <s.TextDescription>Size: {(20 + (item.Size % 80)) + 'px'}</s.TextDescription> */}
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