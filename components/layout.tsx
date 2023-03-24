import React from "react";
import Footer from "./footer";
import Nav from "./nav"

export default function Layout({children}:React.PropsWithChildren) {
    return (
        <>
            <Nav />
            <main>{children}</main>
            <Footer />
        </>
    )
}