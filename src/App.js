import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';
import * as s from "./styles/global";
import { fetchData } from "./redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Home from "./pages/home.js"
import Lands from "./pages/lands.js"
import Inventory from "./pages/inventory.js"
import Marketplace from "./pages/marketplace.js"
import FontInfo from "./pages/font.js"
import Navbar from './components/Navbar';
import NavbarC from './components/NavBarCollapse';
import { Bars } from './components/Navbar/NavbarElements.js';

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [menuBar, setMenuBar] = React.useState("none");

  const toggle = () => {
    setMenuBar(menuBar == "none" ? ("flex") : ("none"));
  };

  console.log(blockchain);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.phudleNFT !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.phudleNFT]);

  

  return (
    <s.Screen>
      <s.Container  display={menuBar}>
        <NavbarC/>
      </s.Container>
      <div onClick={(e) => {
            e.preventDefault();
            toggle();
          }}><Bars m={menuBar=="none" ? ("none") : ("20%")}/>
      </div>
      <s.Container>
        <s.Container flex="1" fd={"row"} jc='space-between'>
          <s.Container flex="1" fd="row">
        <Navbar/>
            <s.Container flex={"1"} jc={"end"} ai="end" fd={"row"}>
        {blockchain.account == null || blockchain.cFont == null ? (
        <button className= "login button button2"
          onClick={(e) => {
            e.preventDefault();
            dispatch(connect());
          }}
        >
          CONNECT
        </button>
    ) : (
      <button className= "login address button button2">{blockchain.account}</button>
    )}
            </s.Container>
          </s.Container>
        </s.Container>
    <s.Container  ai="center">
    <s.TextDescription>{blockchain.errorMsg != "" ? (blockchain.errorMsg) : (null)}</s.TextDescription>
    </s.Container>
      <Outlet />
        <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/inventory" element={<Inventory blockchain={blockchain} data={data} />} />
      <Route path="/lands" element={<Lands/>} />
      <Route path="/marketplace" element={<Marketplace blockchain={blockchain} data={useSelector((state) => state.data)} />}/>
      <Route path="/font/:id" element={<FontInfo blockchain={blockchain}  />}/>
      {/* <Route path="/play" element={<Play />} /> */}
    </Routes>
    </s.Container>
  </s.Screen>
);
}

// function Home() {

//   const dispatch = useDispatch();

  

  

//   return (

    

export default App;
