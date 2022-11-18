import React from "react";
import * as s from "../styles/global";

const Play = (props) => {
  return (
    <s.Screen>
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
        <s.TextTitle>Coming soon...</s.TextTitle>
      </s.Container>
    </s.Screen>
  );
};

export default Play;
