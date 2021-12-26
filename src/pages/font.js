import * as s from "../styles/global";
import Cfontrenderer from "../components/cFontRenderer";
import Cfontinforenderer from "../components/cFontInfoRenderer";
import ListingForm from "../components/Market/ListingForm";
import SellingInfo from "../components/Market/SellingInfo";
import ConfirmDialong from "../components/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarket } from "../redux/marketData/marketDataActions";
import { useEffect, useState } from "react";
import { fetchcFont } from "../redux/cFontInfo/cFontInfoActions";
import { useParams } from "react-router";

const FontInfo = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const market = useSelector((state) => state.market);
  const data = useSelector((state) => state.data);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchMarket());
  }, [id, dispatch]);
  
  let font = market.allFont[id];
  console.log(font)

  return (
    <s.Screen>
      <s.SpacerLarge />
      <s.SpacerLarge />
      <s.Container
        className="Fontcard"
        ai="center"
        jc={"space-evenly"}
        fd={"column"}
        style={{ flexWrap: "wrap", padding: 50 }}
      >
        <s.Container ai="center" jc="center">
          <Cfontrenderer font={font}></Cfontrenderer>
          <Cfontinforenderer font={font}/>
        </s.Container>
        
        <s.Container>
          <s.SpacerLarge />

          {data.MyFont.indexOf(id) > -1 ? (
            <s.Container
              fd="row"
              jc="space-evenly"
              ai="center"
              style={{ flexWrap: "wrap" }}
            >
              <s.button onClick={() => setOpenPopup(true)}>Sell</s.button>
              <s.button disabled={1}>Not implemented</s.button>
            </s.Container>
          ) : null}
        </s.Container>
      </s.Container>
      <s.SpacerLarge />
      <s.Container flex="1" fd="column" jc="center" ai="center" style={{}}>
        {market.onsale.indexOf(id) > -1 ? (
          "OnSale"
        ) : (null)}
      </s.Container>
      <s.Container></s.Container>

      <ConfirmDialong
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Selling"
      >
        <ListingForm
          data={data}
          font={font}
          blockchain={props.blockchain}
          id={id}
        ></ListingForm>
      </ConfirmDialong>
    </s.Screen>
  );
};

export default FontInfo;
