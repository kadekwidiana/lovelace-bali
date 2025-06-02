import React from "react";
import FrontpageNavbar from "../Components/Navbar/FrontpageNavbar";
import FrontpageFooter from "../Components/Footer/FrontpageFooter";
import { Head, usePage } from "@inertiajs/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function FrontpageLayout({ children }) {
    const { title, description } = usePage().props;

    return (
        <QueryClientProvider client={queryClient}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <FrontpageNavbar />
            <div className="min-h-[65dvh] mb-8">{children}</div>
            <FrontpageFooter />
        </QueryClientProvider>
    );
}
