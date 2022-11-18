import React from "react";
import * as s from "../styles/global.js";

export default function ActionButton(props) {
  const { title, onClick } = props;

  return <s.button onClick={onClick}>{title}</s.button>;
}
