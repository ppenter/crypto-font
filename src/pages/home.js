import React from 'react';
import * as s from "../styles/global";
import Roadmap from '../components/Infomation/Roadmap';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchMarket } from '../redux/marketData/marketDataActions';
import { fetchData } from '../redux/data/dataActions';
import { useSelector } from 'react-redux';
import ICO from '../components/ICO/ICO';
import Teams from '../components/Infomation/Teams';
import lexi from "../assets/lexi40.png";
  
const Home = (props) => {
    
  return (

        <s.Container ai="center" >
            <s.SpacerLarge/>
            <s.SpacerLarge/>
            <ICO blockchain={props.blockchain} data={props.data} ico={props.ico}/>
            <s.Container ai="center" >
            <s.SpacerLarge/>
            <s.SpacerLarge/>
            <s.TextTitle>
                What is cFont ?
            </s.TextTitle>
            <s.TextDescription>
            &nbsp;&nbsp;&nbsp;cFont is NFT Staking that provide mining function for mining eBTC and also earning reward from others DeFi platform. cFont will provide more platform in DeFi, Marketplace and metaverse.
            </s.TextDescription>
            <s.SpacerLarge/>
            <s.SpacerLarge/>
            <s.TextTitle>
                Why eBTC ?
            </s.TextTitle>
            <s.TextDescription>
                &nbsp;&nbsp;&nbsp; We want to make a limited asset similar 
                to Bitcoin happen on EVM. This is because current Bitcoin 
                cannot be directly linked to the EVM protocol and requires 
                a bridge to connect. eBTC will resolve this issue to balance an
                EVM's supply and create a valuable asset for its accumulation. 
                eBTC will have a total supply of 10 million and will never 
                be created again. The insights detailed can be viewed here.
            </s.TextDescription>
            <s.TextDescription>
                {/* - Isaak Solovev - */}
            </s.TextDescription>
            <s.SpacerLarge/>
            <s.SpacerLarge/>
            <Roadmap></Roadmap>
            <s.SpacerLarge/>
            <s.SpacerLarge/>
            <s.TextTitle>
                Teams
            </s.TextTitle>
            <s.SpacerLarge/>
                <Teams></Teams>
                <s.SpacerLarge/>
                </s.Container>
            </s.Container>
  );
};
  
export default Home;