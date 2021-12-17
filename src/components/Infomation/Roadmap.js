import React from "react";
import * as s from "../../styles/global";

const Roadmap = (props) => {
    return(
        <s.Container jc = 'center' ai="center" fd='column' style={{ flexWrap: "wrap" }}>
            <s.TextTitle >Q1 - 2022</s.TextTitle>
            <s.Container jc="center" ai="center">
                <div>
                <s.TextDescription>• ICO</s.TextDescription>
                <s.TextDescription>• Alpha test</s.TextDescription>
                <s.TextDescription>• Built-in Marketplace</s.TextDescription>
                </div>
            </s.Container>
            <s.TextTitle >↓</s.TextTitle>
            <s.TextTitle >Q2 - 2022</s.TextTitle>
            <s.Container jc="center" ai="center">
                <div>
                <s.TextDescription>• Land Sale</s.TextDescription>
                <s.TextDescription>• Initialize DeFi Ecosystem</s.TextDescription>
                <s.TextDescription>• NFT Marketplace</s.TextDescription>
                </div>
            </s.Container>
            <s.TextTitle >↓</s.TextTitle>
            <s.TextTitle >Q3 - 2022</s.TextTitle>
            <s.Container jc="center" ai="center">
                <div>
                <s.TextDescription>• Metaverse Development</s.TextDescription>
                </div>
            </s.Container>
            <s.TextTitle >↓</s.TextTitle>
            <s.TextTitle >Q4 - 2022</s.TextTitle>
            <s.Container jc="center" ai="center">
                <div>
                <s.TextDescription>• Launch Final Version</s.TextDescription>
                <s.TextDescription>• Become opensource platform</s.TextDescription>
                <s.TextDescription>• Provided full decentralize Earning</s.TextDescription>
                </div>
            </s.Container>
        </s.Container>
    );
};
export default Roadmap;