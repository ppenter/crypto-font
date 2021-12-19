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
import eBitcoin from "../../contracts/eBitcoin.json";
import cFont from "../../contracts/cryptoFont.json";
  
const Footer = () => {
  return (
      
    <Box>
        <hr  style={{
    color: '#ffffff',
    backgroundColor: '#ffffff',
    height: 1,
    borderColor : '#ffffff'
}}/>
      <Container>
      <Heading>Contract Addresses</Heading>
        <Row jc="space-evenly">
            <Column className="text-collapse">
            <p>cFont: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ cFont.networks[process.env.REACT_APP_networkID].address}>{cFont.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>eBTC: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ eBitcoin.networks[process.env.REACT_APP_networkID].address}>{eBitcoin.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>Market: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ eBTCMarket.networks[process.env.REACT_APP_networkID].address}>{eBTCMarket.networks[process.env.REACT_APP_networkID].address}</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;