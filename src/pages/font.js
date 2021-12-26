import * as s from "../styles/global";
import Cfontrenderer from '../components/cFontRenderer';
import Cfontinforenderer from '../components/cFontInfoRenderer';
import ListingForm from '../components/Market/ListingForm';
import SellingInfo from '../components/Market/SellingInfo';
import ConfirmDialong from "../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarket } from "../redux/marketData/marketDataActions";
import { useEffect, useState } from "react";
import { fetchcFont } from "../redux/cFontInfo/cFontInfoActions";
import { useParams } from 'react-router';
import eBTCMarket from "../contracts/Market.json";

  
const FontInfo = (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const market = useSelector((state) => state.market);
    const font = useSelector((state) => state.font);
    const data = useSelector((state) => state.data);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {
        dispatch(fetchcFont(id));
        dispatch(fetchMarket());
      }, [id,dispatch]);
    
      const marketAddress = eBTCMarket.networks[process.env.REACT_APP_networkID].address;
      let fontowner = font.cFontOwner;
      let o = fontowner.toLowerCase();
      let account = props.blockchain.account ? (props.blockchain.account.toLowerCase()) : ("0x");
      
      const list = {
        id: "",
        seller: "",
        price: "",
        time: "",
        tokenId: "",
      }

      market.activeList.map(function(item, i){
        if(item.tokenId === id){
          list.id = item.listingId;
          list.seller = item.seller;
          list.price = item.price;
          list.time = item.timestamp;
          list.tokenId = item.tokenId;
        }
      })

    
  return (
      <s.Screen>
          <s.SpacerLarge/>
          <s.SpacerLarge/>
            <s.Container className="Fontcard" ai="center" jc={"space-evenly"} fd={"column"} style={{ flexWrap: "wrap", padding:50}}>
                <s.Container ai="center" jc="center">
                <Cfontrenderer font={font.cFontInfo}></Cfontrenderer>
                </s.Container>
                <Cfontinforenderer font={font.cFontInfo} owner={o === marketAddress.toLowerCase() ? ("Selling") : (font.cFontOwner)}></Cfontinforenderer>
            <s.Container>
            <s.SpacerLarge/>
            
            {account === o ? (
                  <s.Container fd="row" jc="space-evenly" ai="center"style={{ flexWrap: "wrap"}}>
                    <s.button
                    
                      onClick = {() => setOpenPopup(true)}
                    >Sell</s.button>
                    <s.button disabled={1}>Not implemented</s.button>
                  </s.Container>
                ) : (
                  null
                )}
            </s.Container>
            </s.Container>
            <s.SpacerLarge/>
            <s.Container flex="1" fd="column" jc="center" ai="center" style={{}}>
            {market.onsale.indexOf(id) > -1 ? (<SellingInfo id = {id} blockchain={props.blockchain} data={props.data} list = {list}></SellingInfo>):(null)}
            </s.Container>
            <s.Container>
              
            </s.Container>
          
          <ConfirmDialong
          openPopup = {openPopup}
          setOpenPopup = {setOpenPopup}
          title = "Selling"
          >
          <ListingForm data={data} font={props.font} blockchain = {props.blockchain} id = {id}></ListingForm>
          </ConfirmDialong>
          
        </s.Screen>
        );
};
  
export default FontInfo;