import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyle";
import eBTCMarket from "../../contracts/Market.json";
import eBTC from "../../contracts/eBTC.json";
import cFont from "../../contracts/cryptoFont.json";
import ICO from "../../contracts/ICO.json";
import { SocialIcon } from 'react-social-icons';
  
const Footer = () => {
  return (
      
    <Box>
        <hr  style={{
    color: '#ffffff',
    backgroundColor: '#ffffff',
    height: 1,
    borderColor : '#ffffff'
}}/>
      <Container style={{padding: 30}}>
      
        <Row jc="space-evenly" style={{flexWrap: "wrap"}}>
            <Column className="text-collapse">
            <Heading>Contract Addresses</Heading>
            <p>cFont: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ cFont.networks[process.env.REACT_APP_networkID].address}>{cFont.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>eBTC: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ eBTC.networks[process.env.REACT_APP_networkID].address}>{eBTC.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>Market: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ eBTCMarket.networks[process.env.REACT_APP_networkID].address}>{eBTCMarket.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>ICO: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ ICO.networks[process.env.REACT_APP_networkID].address}>{ICO.networks[process.env.REACT_APP_networkID].address}</FooterLink>
          </Column>
          <Column fd="row" jc="space-evenly">
            <SocialIcon url="https://twitter.com/crypto_font" target="_blank" bgColor="#fff" fgColor="#000000"/>
            <SocialIcon url="https://discord.gg/TVEqbECMUt" target="_blank" bgColor="#fff" fgColor="#000000"/>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;