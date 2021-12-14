import React from "react";
import * as s from "../styles/global.js";

const Cfontinforenderer = ({ font = null,size = 500, style, owner= "" }) => {
  if (!font) {
    return null;
  }

  let dnaStr = String(font.dna);


  return (
    <s.Screen>
        <s.Container ai="center">
            <s.Container w="80%" ai="center">
            <s.TextDescription>Name: {font.name}</s.TextDescription>
      <s.TextDescription>ID: {font.id}</s.TextDescription>
      <s.TextDescription>DNA: {dnaStr}</s.TextDescription>
      <s.TextDescription >Owner: {owner}</s.TextDescription>
      <s.TextDescription>Rarity: {font.rarity}</s.TextDescription>
    </s.Container>
    </s.Container>
    </s.Screen>
  );
};

export default Cfontinforenderer;