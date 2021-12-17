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
      <Container>
        <Row jc="space-evenly">
            <Heading>Contract Addresses</Heading>
            <Column>
            <p>cFont: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ cFont.networks[process.env.REACT_APP_networkID].address}>{cFont.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>eBTC: </p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ eBitcoin.networks[process.env.REACT_APP_networkID].address}>{eBitcoin.networks[process.env.REACT_APP_networkID].address}</FooterLink>
            <p>Market</p><FooterLink target="_blank" href={process.env.REACT_APP_Explorer +"address/"+ eBTCMarket.networks[process.env.REACT_APP_networkID].address}>{eBTCMarket.networks[process.env.REACT_APP_networkID].address}</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;