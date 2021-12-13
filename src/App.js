import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import * as s from "./styles/global";
import { fetchData } from "./redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
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
import Navigation from './components/Navbar';

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  console.log(blockchain);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.cFont !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.cFont,dispatch, blockchain.account]);

  console.log(data);

  return (
    <s.Screen>
      <Navigation/>
    <s.Container  ai="center">
    <s.TextDescription>{blockchain.errorMsg !== "" ? (blockchain.errorMsg) : (null)}</s.TextDescription>
    </s.Container>
      <Outlet />
        <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/inventory" element={<Inventory blockchain={blockchain} data={data} />} />
      <Route path="/land" element={<Lands/>} />
      <Route path="/marketplace" element={<Marketplace blockchain={blockchain} data={useSelector((state) => state.data)} />}/>
      <Route path="/font/:id" element={<FontInfo blockchain={blockchain}  />}/>
      {/* <Route path="/play" element={<Play />} /> */}
    </Routes>
  </s.Screen>
);
}

// function Home() {

//   const dispatch = useDispatch();

  

  

//   return (

    

export default App;
