import React from 'react';
import { fetchMarket } from "../redux/marketData/marketDataActions"
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import Price from '../components/Market/Price';
import { Dropdown } from 'react-bootstrap';
import {
    NavLink,
} from "../components/Navbar/NavbarElements.js";
  
const Marketplace = (props) => {

    const dispatch = useDispatch();
    const [sortType, setSortType] = useState('price');
    

    useEffect(() => {
          dispatch(fetchMarket());
          setSortType("price");
      }, [dispatch]);

    
    const [rarityIndex, setRarityIndex] = useState(0);
    let [data, setData] = useState([]);

    
 
    useEffect(() => {
      let active = props.market.activeList;
      const sortArray = type => {
        const types = {
          tokenId: 'tokenId',
          price: 'price',
          tokenIdh: 'tokenId',
          priceh: 'price',
        };
        const sortProperty = types[type];
        let sorted = [...active].sort((a, b) => a[sortProperty] - b[sortProperty]);;
        if(type === "tokenIdh" || type === "priceh"){
          sorted = [...active].sort((a, b) => b[sortProperty] - a[sortProperty]);
        }else{
          sorted = [...active].sort((a, b) => a[sortProperty] - b[sortProperty]);
        }
        
        setData(sorted);
      };
      sortArray(sortType);
      
    }, [sortType,props.market.activeList]); 
  

    const setRarity = (e) => {
      setRarityIndex(e);
    };

    const filterFont = (e) => {
      switch(e) {

        case (0): return "All rarity";

        case (e):   return e;

        default:      return  "All rarity";
      }
    }

    const renderSort = (e) => {
      switch(e) {

        case "price": return "Lowest Price";

        case "priceh":   return "Higest Price";

        case "tokenId":   return "Lowest ID";

        case "tokenIdh":   return "Higest ID";

        default:      return  "Lowest Price";
      }
    }

    let list = props.market.allFont;

    if(rarityIndex > 0){
      list = props.market.allFont.filter(f => f.rarity === rarityIndex);
    }else{
      list = props.market.allFont;
    }

  return (
    <s.Screen>
      <s.SpacerMedium />
      <s.Container jc="space-evenly" fd="row" ai="center">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filterFont(rarityIndex)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => {setRarity(0)}}>All rarity</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {setRarity(1)}}>1</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {setRarity(2)}}>2</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {setRarity(3)}}>3</Dropdown.Item>
            <Dropdown.Item onClick={(e) => {setRarity(4)}}>4</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          {renderSort(sortType)}
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item value="price" onClick={(e) => setSortType("price")}>Lowest Price</Dropdown.Item>
            <Dropdown.Item value="priceh" onClick={(e) => setSortType("priceh")}>Highest Price</Dropdown.Item>
            <Dropdown.Item value="tokenId" onClick={(e) => setSortType("tokenId")}>Lowest ID</Dropdown.Item>
            <Dropdown.Item value="tokenIdh" onClick={(e) => setSortType("tokenIdh")}>Highest ID</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <s.SpacerLarge/>
      </s.Container>
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
            

            {data.map((i,j) => {
              return (
                <div key={j}>
                {
                  list.map((item,key) => {
                    if(i.tokenId === item.id){
                      return(
                        <NavLink key={item.id} to={"/font/"+item.id}>
                  <s.Container className="Fontcard" key={key} style={{ padding: "15px" }}>
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
                      )
                    }
                  })
                }
                </div>
              )
            })}
          </s.Container>
    </s.Screen>
  );
};
  
export default Marketplace;