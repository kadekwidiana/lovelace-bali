import { usePage } from "@inertiajs/react";
import { Sidebar } from "flowbite-react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { HiChartPie } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
    MdContactPage,
    MdLibraryBooks,
    MdOutlineCategory,
    MdOutlineProductionQuantityLimits,
} from "react-icons/md";

export default function BackpageSidebar({ isVisible }) {
    const { auth } = usePage().props;

    return (
        <aside
            className={`fixed bottom-0 left-0 top-[57px] z-40 flex w-[224px] transform flex-col border-r shadow-md transition-transform ease-in-out ${
                isVisible
                    ? "-translate-x-full sm:translate-x-0"
                    : "translate-x-0 sm:-translate-x-full"
            }`}
        >
            <Sidebar
                aria-label="Sidebar with multi-level dropdown example"
                className="w-auto"
            >
                <Sidebar.Items>
                    {auth.user.role === "ADMIN" ? (
                        <Sidebar.ItemGroup>
                            <SidebarMenu
                                href="/dashboard"
                                label="Dashboard"
                                icon={HiChartPie}
                            />
                            <SidebarMenu
                                href="/categories"
                                label="Kategori"
                                icon={MdOutlineCategory}
                            />
                            <SidebarMenu
                                href="/products"
                                label="Produk"
                                icon={MdOutlineProductionQuantityLimits}
                            />
                            <SidebarMenu
                                href="/promotions"
                                label="Promosi"
                                icon={IoIosInformationCircleOutline}
                            />
                            <SidebarMenu
                                href="/product-ins"
                                label="Produk Masuk"
                                icon={BsArrowRightCircle}
                            />
                            <SidebarMenu
                                href="/product-outs"
                                label="Produk Keluar"
                                icon={BsArrowLeftCircle}
                            />
                            <SidebarMenu
                                href="/reports"
                                label="Laporan"
                                icon={MdLibraryBooks}
                            />
                            <SidebarMenu
                                href="/contacts"
                                label="Kontak"
                                icon={MdContactPage}
                            />
                        </Sidebar.ItemGroup>
                    ) : (
                        <Sidebar.ItemGroup>
                            <SidebarMenu
                                href="/dashboard"
                                label="Dashboard"
                                icon={HiChartPie}
                            />
                            <SidebarMenu
                                href="/product-ins"
                                label="Produk Masuk"
                                icon={BsArrowRightCircle}
                            />
                            <SidebarMenu
                                href="/product-outs"
                                label="Produk Keluar"
                                icon={BsArrowLeftCircle}
                            />
                        </Sidebar.ItemGroup>
                    )}
                </Sidebar.Items>
            </Sidebar>
        </aside>
    );
}

const SidebarMenu = ({ href, label, icon = "" }) => {
    const pathname = usePage().url;

    return (
        <Sidebar.Item
            href={href}
            icon={icon}
            className={`${pathname.startsWith(href) ? "bg-gray-100" : ""}`}
        >
            {label}
        </Sidebar.Item>
    );
};
