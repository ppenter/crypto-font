import React from 'react';
import { fetchMarket } from "../redux/marketData/marketDataActions"
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import Price from '../components/Market/Price';
import { Dropdown } from 'react-bootstrap';
import Overall from '../components/Infomation/Overall';
import Decimal from '../components/Decimal';
import Web3 from 'web3';
import CardRenderer from '../components/CardRenderer';
import {
    NavLink,
} from "../components/Navbar/NavbarElements.js";
  
const Marketplace = (props) => {

    const dispatch = useDispatch();
    const [sortType, setSortType] = useState('price');
    const [MarketType, setMarket] = useState(0);
    

    useEffect(() => {
          dispatch(fetchMarket());
          setSortType("price");
      }, [dispatch]);

    
    const [rarityIndex, setRarityIndex] = useState(0);
    let [data, setData] = useState([]);

    let allFonts = props.market.allFont.map((item,index) => {
      return(
        {
        name: item.name,
        id: item.id,
        rarity: item.rarity,
        burn: item.burn,
        dna: item.dna,
        power: item.power,
        price: "0",
        seller: "",
        size: item.size,
        }
      )
    });

    props.market.activeList.forEach((item) => {
      allFonts[item.tokenId].price = item.price;
    })
 
    useEffect(() => {
      let active = allFonts;
      const sortArray = type => {
        const types = {
          tokenId: 'id',
          price: 'price',
          tokenIdh: 'id',
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

    const renderMarket = (e) => {
      switch(e) {

        case (1): return "On Sale";

        default:      return  "All Fonts";
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
      <s.SpacerLarge></s.SpacerLarge>
      <s.SpacerMedium />
      <s.Container className="Fontcard" jc="center" fd="row" ai="center" style={{padding: 50, flexWrap: "wrap"}}>
      <s.TextTitle>Filter</s.TextTitle>
          <s.SpacerLarge/>
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
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          {renderMarket(MarketType)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item value={0} onClick={(e) => setMarket(0)}>All Fonts</Dropdown.Item>
            <Dropdown.Item value={1} onClick={(e) => setMarket(1)}>On sale</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <s.SpacerLarge/>
      </s.Container>
      <s.SpacerLarge/>
      <s.SpacerLarge/>
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
            

            {data.map((item,index) => {
              if(rarityIndex == item.rarity || rarityIndex == 0){
                if(item.price !== "0" || MarketType == 0){
                  return(
                    <div key={index} >
                  <CardRenderer item={item}/>
                  <s.SpacerLarge/>
                  </div>
                  )
                }
              }
              // return(<CardRenderer item={item}/>)
            })}
          </s.Container>
    </s.Screen>
  );
};
  
export default Marketplace;