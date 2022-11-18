import React from "react";
import * as s from "../styles/global.js";
import eBTCMarket from "../contracts/Market.json";

const Cfontinforenderer = ({ font = null, size = 500, style}) => {
  if (!font) {
    return "Font not found!";
  }
  
  const marketAddress = eBTCMarket.networks[process.env.REACT_APP_networkID].address.toLowerCase();

  return (
    <s.Container ai="center" jc="space-evenly">
      <s.TextSubTitle>Name: </s.TextSubTitle>
      <s.TextDescription>{font.name}</s.TextDescription>
      <s.TextSubTitle>Rarity: </s.TextSubTitle>
      <s.TextDescription>{font.rarity}</s.TextDescription>
      <s.TextSubTitle>Type: </s.TextSubTitle>
      <s.TextDescription>{font.power}</s.TextDescription>

      <s.TextSubTitle>Owner: </s.TextSubTitle>

      {font.owner === marketAddress ? (
        <s.TextDescription>Selling</s.TextDescription>
      ) : (
        <s.TextDescription className="text-collapse">{font.owner}</s.TextDescription>
      )}
    </s.Container>
  );
};

export default Cfontinforenderer;
