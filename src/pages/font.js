import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import Cfontinforenderer from '../components/cFontInfoRenderer';
import ListingForm from '../components/Market/ListingForm';
import SellingInfo from '../components/Market/SellingInfo';
import ConfirmDialong from "../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import { useEffect, useState } from "react";
import { fetchcFont } from "../redux/cFontInfo/cFontInfoActions";
import { useParams } from 'react-router';
import eBTCMarket from "../contracts/Market.json";

  
const FontInfo = (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const font = useSelector((state) => state.font);
    const [loading, setLoading] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchcFont(id));
      }, [id,dispatch]);
    
      const marketAddress = eBTCMarket.networks[process.env.REACT_APP_networkID].address;
      let fontowner = font.cFontOwner;
      let o = fontowner.toLowerCase();

      console.log(font.activeList);
    
  return (
      <s.Screen>
          <s.SpacerLarge/>
          <s.SpacerLarge/>
            <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap"}}>
                <Cfontrenderer font={font.cFontInfo}></Cfontrenderer>
            <s.Container>

            <Cfontinforenderer font={font.cFontInfo} owner={o == marketAddress.toLowerCase() ? ("Selling") : (font.cFontOwner)}></Cfontinforenderer>
            {props.blockchain.account == o ? (
                  <s.Container flex="1" fd="column" jc="space-evenly" ai="center"style={{ }}>
                    {}
                    <s.button
                      onClick = {() => setOpenPopup(true)}
                    >Sell</s.button>
                    <s.button>Transfer</s.button>
                  </s.Container>
                ) : (
                  null
                )}
            </s.Container>
            </s.Container>
            <s.Container flex="1" fd="column" jc="center" ai="center" mxw="980px" mxh="980px" style={{}}>
            <SellingInfo id = {id} list = {font.activeList}></SellingInfo>
            </s.Container>
            <s.Container>
              
            </s.Container>

          <ConfirmDialong
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
          title = "Selling"
          >
          <ListingForm blockchain = {props.blockchain} id = {id}></ListingForm>
          </ConfirmDialong>
          
        </s.Screen>
        );
};
  
export default FontInfo;