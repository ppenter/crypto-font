import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navbar";
import FontInfo from "./pages/font.js";
import Home from "./pages/home.js";
import Inventory from "./pages/inventory.js";
import Lands from "./pages/lands.js";
import Marketplace from "./pages/marketplace.js";
import Play from "./pages/play";
import { fetchData } from "./redux/data/dataActions";
import { fetchICO } from "./redux/ico/icoActions";
import { fetchMarket } from "./redux/marketData/marketDataActions";
import * as s from "./styles/global";
function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const market = useSelector((state) => state.market);
  const font = useSelector((state) => state.font);
  const ico = useSelector((state) => state.ico);
  // console.log(market);
  // console.log(data);
  // console.log(blockchain);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.cFont !== null) {
      dispatch(fetchData(blockchain.account));
      dispatch(fetchMarket());
      dispatch(fetchICO());
    }
    dispatch(fetchMarket());
    dispatch(fetchICO());
  }, [blockchain.cFont, dispatch, blockchain.account]);

  return (
    <s.Screen className="lexiBackground">
      <Navigation />
      <s.Container ai="center">
        <s.Container w="80%" style={{ minHeight: 1000 }}>
          <s.TextDescription>
            {blockchain.errorMsg !== "" ? blockchain.errorMsg : null}
          </s.TextDescription>

          <Outlet />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  blockchain={blockchain}
                  ico={ico}
                  market={market}
                  data={data}
                />
              }
            />
            <Route
              path="/inventory"
              element={
                <Inventory
                  blockchain={blockchain}
                  market={market}
                  data={data}
                />
              }
            />
            <Route path="/land" element={<Lands />} />
            <Route path="/metaverse" element={<Play />} />
            <Route
              path="/marketplace"
              element={
                <Marketplace
                  font={font}
                  blockchain={blockchain}
                  market={market}
                  data={useSelector((state) => state.data)}
                />
              }
            />
            <Route
              path="/font/:id"
              element={
                <FontInfo market={market} data={data} blockchain={blockchain} />
              }
            />
            <Route path="/play" element={<Play />} />
          </Routes>
          <s.SpacerLarge />
          <s.SpacerLarge />
          <s.SpacerLarge />
        </s.Container>
        <Footer />
      </s.Container>
    </s.Screen>
  );
}

export default App;
