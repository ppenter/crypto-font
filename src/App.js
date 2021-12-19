import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as s from "./styles/global";
import { fetchData } from "./redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarket } from "./redux/marketData/marketDataActions";
import {
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import Home from "./pages/home.js"
import Lands from "./pages/lands.js"
import Inventory from "./pages/inventory.js"
import Marketplace from "./pages/marketplace.js"
import FontInfo from "./pages/font.js"
import Play from "./pages/play";
import Navigation from './components/Navbar';
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const market = useSelector((state) => state.market);
  const font = useSelector((state) => state.font);
  console.log(market);
  console.log(data);
  console.log(blockchain);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.cFont !== null) {
      dispatch(fetchData(blockchain.account));
      dispatch(fetchMarket());
    }
  }, [blockchain.cFont,dispatch, blockchain.account]);



  return (
    <s.Screen>
      <Navigation/>
    <s.Container  ai="center">
      <s.Container w="80%">
    <s.TextDescription>{blockchain.errorMsg !== "" ? (blockchain.errorMsg) : (null)}</s.TextDescription>
    
      <Outlet />
        <Routes>
      <Route path="/" element={<Home blockchain={blockchain} market={market} data={data}/>} />
      <Route path="/inventory" element={<Inventory blockchain={blockchain} market={market} data={data} />} />
      <Route path="/land" element={<Lands/>} />
      <Route path="/metaverse" element={<Play/>} />
      <Route path="/marketplace" element={<Marketplace font={font} blockchain={blockchain} market={market} data={useSelector((state) => state.data)} />}/>
      <Route path="/font/:id" element={<FontInfo market={market} data={data} blockchain={blockchain}  />}/>
      {/* <Route path="/play" element={<Play />} /> */}
    </Routes>
    <s.SpacerLarge/>
    <s.SpacerLarge/>
    <s.SpacerLarge/>
    <Footer/>
    </s.Container>
    </s.Container>
  </s.Screen>
  
);
}

// function Home() {

//   const dispatch = useDispatch();

  

  

//   return (

    

export default App;
