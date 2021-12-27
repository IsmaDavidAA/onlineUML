//import React from "react";
import { LogoHeader, UserHeader, Nav } from "./HeaderG.styles";

const Navbar = (props) => {
    return (
        <>
            <Nav>
                <LogoHeader theme="logo">GoUML</LogoHeader>
                <UserHeader theme={props.theme} style="text-aling:center;">{props.title}</UserHeader>
            </Nav>
        </>
    );
};


export default Navbar;