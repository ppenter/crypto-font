import React from "react";
import { parts } from "../parts/partsName";
import * as s from "../styles/global.js";

const Cfontinforenderer = ({ font = null,size = 500, style, owner= "" }) => {
  if (!font) {
    return null;
  }

  let dnaStr = String(font.dna);


  return (
    <s.Container flex="1" ai="start" mnw={"400px"} m={"30px"}>
      <s.TextDescription>Name: {font.name}</s.TextDescription>
      <s.TextDescription>ID: {font.id}</s.TextDescription>
      <s.TextDescription>DNA: {dnaStr}</s.TextDescription>
      <s.TextDescription>Owner: {owner}</s.TextDescription>
      <s.TextDescription>Rarity: {font.rarity}</s.TextDescription>
    </s.Container>
  );
};

export default Cfontinforenderer;