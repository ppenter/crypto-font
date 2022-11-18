import React from "react";
import * as s from "../../styles/global";

const Price = (props) => {
  const { id, currency, list } = props;

  return (
    <s.TextDescription>
      {list.map((item, index) => {
        if (item.tokenId === id) {
          return (
            (parseFloat(item.price) / 10 ** 18).toFixed(4) + " " + currency
          );
        }
        return null
      })}
    </s.TextDescription>
  );
};
export default Price;
