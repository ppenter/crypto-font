import React from "react";
import Cfontrenderer from "./cFontRenderer";
import * as s from "../styles/global.js";
import { NavLink } from "../components/Navbar/NavbarElements.js";
import Web3 from "web3";

const CardRenderer = ({
  item = null,
  size = 200,
  style,
  id = null,
  name = 1,
  rarity = 1,
  csize = null,
  seller = null,
  price = 1,
  dna = null,
  power = null,
}) => {
  if (!item || item.length <= 0) {
    return null;
  }
  return (
    <NavLink to={"/font/" + item.id}>
      <s.Container
        className="Fontcard"
        key={item.id}
        style={{ padding: "15px" }}
      >
        <Cfontrenderer font={item} />
        <s.SpacerXSmall />
        <s.Container>
          <s.TextID>#{item.id}</s.TextID>
          <s.TextDescription
            className="text-collapse"
            style={{ maxWidth: size, textAlign: "left" }}
          >
            {name ? "NAME: " + item.name : null}
          </s.TextDescription>
          <s.TextDescription
            className="text-collapse"
            style={{ maxWidth: size, textAlign: "left" }}
          >
            {power ? "POWER: " + item.power : null}
          </s.TextDescription>
          <s.TextDescription
            className="text-collapse"
            style={{ maxWidth: size, textAlign: "left" }}
          >
            {rarity ? "RARITY: " + item.rarity : null}
          </s.TextDescription>
          {/* <s.TextDescription>Size: {(20 + (item.Size % 80)) + 'px'}</s.TextDescription> */}
          <s.TextDescription
            className="text-collapse"
            style={{ maxWidth: size, textAlign: "left" }}
          >
            {csize ? "SIZE: " + item.size : null}
          </s.TextDescription>
          <s.TextDescription
            className="text-collapse"
            style={{ maxWidth: size, textAlign: "left" }}
          >
            {seller ? "OWNER: " + item.seller : null}
          </s.TextDescription>
          <s.TextDescription
            className="text-collapse"
            style={{ maxWidth: size }}
          >
            {price && item.price !== "0"
              ? Web3.utils.fromWei(item.price) + " eBTC"
              : "‎"}
          </s.TextDescription>
          <s.Container fd={"row"}></s.Container>
        </s.Container>
      </s.Container>
    </NavLink>
  );
};

export default CardRenderer;
