import React from 'react';
import * as s from "../styles/global";
  
const Marketplace = (props) => {
    console.log(props.data)
  return (
    // <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
    //         {props.data.allPhudles.map((item, index) => {
    //             return (
    //               <s.Container className="card m-5" key={index} style={{ padding: "15px" }}>
    //                 <PhudleRenderer className="phudImg" phudle={item} />
    //                 <s.SpacerXSmall />
    //                 <s.Container>
    //                   <s.TextID>#{item.id}</s.TextID>
    //                   <s.TextDescription>Seller: {}</s.TextDescription>
    //                   <s.TextDescription>NAME: {item.name}</s.TextDescription>
    //                   <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
    //                   <s.Container fd={"row"}>
                      
    //                   </s.Container>
    //                 </s.Container>
    //               </s.Container>
    //             );
    //         })}
    //       </s.Container>
    null
  );
};
  
export default Marketplace;