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
    NavLogoCollapse,
    NavMenuCollapseContainer,
} from "../Navbar/NavbarElements";

const NavbarC = () => {
    return (
        <NavMenuCollapse>
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
        </NavMenuCollapse>
    );
};
export default NavbarC;