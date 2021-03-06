import React from "react";
import * as s from "../styles/global.js";

const Cfontinforenderer = ({ font = null,size = 500, style, owner= "" }) => {
  if (!font) {
    return null;
  }

  return (
      <s.Container ai="center" jc="space-evenly">
        <s.TextSubTitle>Name: </s.TextSubTitle><s.TextDescription>{font.name}</s.TextDescription>
        <s.TextSubTitle>Rarity: </s.TextSubTitle><s.TextDescription>{font.rarity}</s.TextDescription>
        <s.TextSubTitle>Type: </s.TextSubTitle><s.TextDescription>{font.power}</s.TextDescription>
        
        <s.TextSubTitle>Owner: </s.TextSubTitle>
        
        {owner === "Selling" ? (
          <s.TextDescription>{owner}</s.TextDescription>
        ):(
          <s.TextDescription className="text-collapse">{owner}</s.TextDescription>
        )}
      </s.Container>
  );
};

export default Cfontinforenderer;