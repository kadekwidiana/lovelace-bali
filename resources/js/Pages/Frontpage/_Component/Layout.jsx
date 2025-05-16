import React from "react";
import FrontpageNavbar from "./Navbar";
import FrontpageFooter from "./Footer";
import { Head, usePage } from "@inertiajs/react";

export default function FrontpageLayout({ children }) {
    const { title, description } = usePage().props;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <FrontpageNavbar />
            <div className="min-h-[65dvh] mb-8">{children}</div>
            <FrontpageFooter />
        </>
    );
}
