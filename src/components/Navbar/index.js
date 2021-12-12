import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
    NavMenuCollapse,
    NavMenuCollapseContainer,
} from "./NavbarElements";

const Navbar = () => {
    return (
        <Nav>
            <NavLogo to="/">
                    cFont
            </NavLogo>
   
    
            <NavMenu>
                <NavLink to="/inventory">
                    Inventory
                </NavLink>
                <NavLink to="/lands">
                    Lands
                </NavLink>
                <NavLink to="/marketplace">
                    Marketplace
                </NavLink>
                <NavLink to="/play">
                    Metaverse
                </NavLink>
            </NavMenu> 
           </Nav> 
    );
};
export default Navbar;