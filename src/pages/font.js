import React, { useEffect } from 'react';
import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import Cfontinforenderer from '../components/cFontInfoRenderer';
import { useDispatch, useSelector } from "react-redux";
import { fetchcFont } from "../redux/cFontInfo/cFontInfoActions";
import { useParams } from 'react-router';
  
const FontInfo = (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const font = useSelector((state) => state.font);

    useEffect(() => {
        dispatch(fetchcFont(id));
      }, [id,dispatch]);
    
    
    console.log(font.cFontInfo);
  return (
      <s.Screen>
          <s.SpacerLarge/>
          <s.SpacerLarge/>
          <s.Container ai="center">
            <s.Container flex="1" fd="row" jc="center" ai="center" mxw="980px" mxh="980px" style={{ flexWrap: "wrap"}}>
            <s.Container>
                <Cfontrenderer font={font.cFontInfo}></Cfontrenderer>
                </s.Container>
                <s.Container >
                <Cfontinforenderer font={font.cFontInfo} owner={font.cFontOwner}></Cfontinforenderer>
                </s.Container>
            </s.Container>
            </s.Container>
        </s.Screen>
        );
};
  
export default FontInfo;