import React from "react";

const Cfontrenderer = ({ font = null, size = 200, style }) => {
  if (!font || font.length <= 0) {
    return null;
  }

  let dnaStr = String(font.dna);

  //   while (dnaStr.length < 10) dnaStr = "0" + dnaStr;

  // let phudleDetail = {
  //   // body: dnaStr.substring(0, 2) % 3,
  //   // eyes: dnaStr.substring(2, 4) % 4,
  //   // head: dnaStr.substring(4, 6) % 7,
  //   // shirt: dnaStr.substring(6, 8) % 7,
  //   // accessory: dnaStr.substring(8, 10) % 7,
  //   // name: phudle.name,
  // };

  let first = dnaStr.substring(0, 3) % 256;
  let second = dnaStr.substring(3, 6) % 256;
  let third = dnaStr.substring(6, 9) % 256;
  // let fouth = dnaStr.substring(9, 12) % 256;
  let str = ("0000" + font.power).substring(font.power.toString().length);
  let c =
    first.toString() +
    "," +
    second.toString() +
    "," +
    third.toString() +
    "," +
    "1";

  let unicode = eval('"\\u' + str + '"');

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20 + (font.size % 80) + "px",
        color: "white",
        textShadow: `0px 0px 20px rgb(${c})`,
        ...style,
      }}
    >
      {unicode}
    </div>
  );
};

export default Cfontrenderer;
