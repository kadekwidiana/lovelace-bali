import SummaryCard from "@/Components/Card/SummaryCard";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { usePage } from "@inertiajs/react";
import { Banner } from "flowbite-react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import {
    MdLibraryBooks,
    MdMoney,
    MdOutlineCategory,
    MdOutlineProductionQuantityLimits,
} from "react-icons/md";

export default function DashboardPage() {
    const { count, auth } = usePage().props;

    return (
        <BackpageLayout>
            <Banner className="mb-4">
                <div className="flex w-full items-center gap-2 border-l-4 border-cyan-600 bg-cyan-400 bg-opacity-[15%] px-4 py-6 shadow-md">
                    <FaCircleCheck className="size-10 text-cyan-600" />
                    <div className="w-full">
                        <h5 className="mb-1 text-lg text-black">
                            Selamat datang,{" "}
                            <span className="font-semibold">
                                {auth.user.name}
                            </span>
                            . Anda login sebagai{" "}
                            <span className="font-semibold">
                                {auth.user.role === "ADMIN"
                                    ? "ADMIN"
                                    : "PEGAWAI"}
                            </span>
                            .
                        </h5>
                        <p className="text-body text-base leading-relaxed">
                            Pastikan untuk menjaga kerahasiaan Email dan
                            Password Anda.
                        </p>
                    </div>
                    <Banner.CollapseButton
                        color="gray"
                        className="items-center border-0 bg-transparent text-gray-500"
                    >
                        <IoCloseOutline className="size-6" />
                    </Banner.CollapseButton>
                </div>
            </Banner>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:w-fit lg:grid-cols-4">
                {auth.user.role === "ADMIN" && (
                    <>
                        <SummaryCard
                            label="Kategori"
                            count={count.category}
                            icon={<MdOutlineCategory className="size-12" />}
                            href="/categories"
                        />
                        <SummaryCard
                            label="Produk"
                            count={count.product}
                            icon={
                                <MdOutlineProductionQuantityLimits className="size-12" />
                            }
                            href="/products"
                        />
                        <SummaryCard
                            label="Promosi"
                            count={count.promotion}
                            icon={
                                <IoIosInformationCircleOutline className="size-12" />
                            }
                            href="/promotions"
                        />
                        {/* <SummaryCard
                    label="Transaksi"
                    count={count.transaction}
                    icon={<MdMoney className="size-12" />}
                    href="/transactions"
                /> */}
                    </>
                )}

                <SummaryCard
                    label="Produk Masuk"
                    count={count.productIn}
                    icon={<BsArrowRightCircle className="size-10" />}
                    href="/product-ins"
                />
                <SummaryCard
                    label="Produk Keluar"
                    count={count.productOut}
                    icon={<BsArrowLeftCircle className="size-10" />}
                    href="/product-outs"
                />
                <SummaryCard
                    label="Transaksi"
                    count={count.transaction}
                    icon={<LuDollarSign className="size-10" />}
                    href="/transactions"
                />
            </div>
        </BackpageLayout>
    );
}
