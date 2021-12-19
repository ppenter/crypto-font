import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import React, { useEffect } from "react";
import { fetchData } from "../../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import { connect, clearCache } from "../../redux/blockchain/blockchainActions";
import {LinkContainer} from 'react-router-bootstrap';
import * as s from "../../styles/global";
import "../../App.css";

const Navigation = () => {

    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.cFont !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.cFont, blockchain.account, dispatch]);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >cFont</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/inventory">
                <Nav.Link>Inventory</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/marketplace">
                <Nav.Link>Marketplace</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/land">
                <Nav.Link>Land</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Resources" id="collasible-nav-dropdown">
                    <NavDropdown.Item>Whitepaper</NavDropdown.Item>
                    <NavDropdown.Item>About us</NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action/3.3"></NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <LinkContainer to="/metaverse">
                    <NavDropdown.Item>Metaverse</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
                </Nav>
                <Nav>
                <Nav.Link>Buy $eBTC</Nav.Link>
                <Nav.Link>
                    {(parseFloat(data.eBTCamount).toFixed(2) / parseFloat(10**18)).toFixed(2) + " eBTC"}
                </Nav.Link>
                </Nav>
                <s.Container ai="center">
                {blockchain.account == null || blockchain.cFont == null ? (
          <s.button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}>
          CONNECT
        </s.button>
    ) : (
      <s.button className= "address text-collapse"  onClick={(e) => {
        e.preventDefault();
        dispatch(clearCache());
      }}>{blockchain.account}</s.button>
    )}</s.Container>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
};
export default Navigation;