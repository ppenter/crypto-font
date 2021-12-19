import React from 'react';
import * as s from "../styles/global";
import Roadmap from '../components/Infomation/Roadmap';
  
const Home = (props) => {

  return (

    <s.Screen>
        <s.Container ai="center">
            <s.Container w="80%" ai="center">
            <s.SpacerLarge/>
            <s.SpacerLarge/>
            <s.TextTitle>
                What is cFont ?
            </s.TextTitle>
            <s.TextDescription>
                cFont is ERC721 that provide mining function for mining eBTC
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

            </s.Container>
            </s.Container>
    </s.Screen>
  );
};
  
export default Home;