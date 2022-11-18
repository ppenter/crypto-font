import React from "react";
import * as s from "../styles/global";

const Lands = (props) => {
  return (
    <s.Container>
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
        <s.TextTitle>Coming soon...</s.TextTitle>
      </s.Container>
    </s.Container>
  );
};

export default Lands;
