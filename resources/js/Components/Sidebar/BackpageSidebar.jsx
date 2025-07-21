import { usePage } from "@inertiajs/react";
import { Sidebar } from "flowbite-react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { HiOutlineChartPie } from "react-icons/hi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import {
    MdOutlineCategory,
    MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { RiContactsBook3Line } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";

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
                                icon={HiOutlineChartPie}
                            />
                            <h2 className="ml-2 text-gray-600 text-xs font-semibold">
                                Main
                            </h2>
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
                                href="/transactions"
                                label="Transaksi"
                                icon={LuDollarSign}
                            />
                            <SidebarMenu
                                href="/promotions"
                                label="Promosi"
                                icon={IoIosInformationCircleOutline}
                            />
                            <h2 className="ml-2 text-gray-600 text-xs font-semibold">
                                Laporan
                            </h2>
                            <SidebarMenu
                                href="/reports"
                                label="Laporan Stok"
                                icon={TbReportSearch}
                            />
                            <SidebarMenu
                                href="/transaction-reports"
                                label="Laporan Transaksi"
                                icon={TbReportSearch}
                            />
                            <h2 className="ml-2 text-gray-600 text-xs font-semibold">
                                User
                            </h2>
                            <SidebarMenu
                                href="/contacts"
                                label="Kontak"
                                icon={RiContactsBook3Line}
                            />
                            <h2 className="ml-2 text-gray-600 text-xs font-semibold">
                                Config
                            </h2>
                            <SidebarMenu
                                href="/raja-ongkirs"
                                label="Raja Ongkir Config"
                                icon={IoSettingsOutline}
                            />
                        </Sidebar.ItemGroup>
                    ) : (
                        <Sidebar.ItemGroup>
                            <SidebarMenu
                                href="/dashboard"
                                label="Dashboard"
                                icon={HiOutlineChartPie}
                            />
                            <h2 className="ml-2 text-gray-600 text-xs font-semibold">
                                Main
                            </h2>
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
                                href="/transactions"
                                label="Transaksi"
                                icon={LuDollarSign}
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
