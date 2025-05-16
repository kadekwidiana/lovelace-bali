import { Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowRight, HiShoppingCart } from "react-icons/hi";

export default function FrontpageNavbar() {
    const { auth } = usePage().props;
    const pathname = usePage().url;

    const menuRef = React.useRef(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <header ref={menuRef}>
            <nav className="bg-white fixed w-full border-gray-200 px-4 lg:px-6 py-4 z-20">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
                    <a href="/" className="flex items-center">
                        <img
                            src="/assets/images/logo-love-lace.jpg"
                            className="h-6 mr-3 sm:h-9 rounded-full"
                            alt=" Love Lace Bali Logo"
                        />
                        <span className="self-center text-xl font-semibold whitespace-nowrap">
                            Love Lace Bali
                        </span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        {auth.user ? (
                            // <a
                            //     href="/dashboard"
                            //     className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 mr-2 focus:outline-none"
                            // >
                            //     Dashboard
                            // </a>
                            <Button size="xs" as={Link} href="/dashboard">
                                Dashboard
                                <HiOutlineArrowRight className="ml-2 size-4" />
                            </Button>
                        ) : (
                            <Button size="xs" as={Link} href="/login">
                                Login
                                <HiOutlineArrowRight className="ml-2 size-4" />
                            </Button>
                        )}
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
                            showMenu ? "block" : "hidden"
                        }`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a
                                    href="/"
                                    className={`block py-2 pl-3 pr-4 rounded-sm lg:p-0 ${
                                        route().current("frontpage.home")
                                            ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                                            : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:bg-transparent lg:hover:text-cyan-700"
                                    }`}
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className={`block py-2 pl-3 pr-4 rounded-sm lg:p-0 ${
                                        route().current("frontpage.about")
                                            ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                                            : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:bg-transparent lg:hover:text-cyan-700"
                                    }`}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/product"
                                    className={`block py-2 pl-3 pr-4 rounded-sm lg:p-0 ${
                                        route().current("frontpage.product")
                                            ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                                            : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:bg-transparent lg:hover:text-cyan-700"
                                    }`}
                                >
                                    Produk
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/promotion"
                                    className={`block py-2 pl-3 pr-4 rounded-sm lg:p-0 ${
                                        route().current(
                                            "frontpage.promotion"
                                        ) ||
                                        route().current(
                                            "frontpage.promotion-detail"
                                        )
                                            ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                                            : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:bg-transparent lg:hover:text-cyan-700"
                                    }`}
                                >
                                    Promo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className={`block py-2 pl-3 pr-4 rounded-sm lg:p-0 ${
                                        route().current("frontpage.contact")
                                            ? "text-white bg-cyan-700 lg:bg-transparent lg:text-cyan-700"
                                            : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:border-0 lg:hover:bg-transparent lg:hover:text-cyan-700"
                                    }`}
                                >
                                    Kontak
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
