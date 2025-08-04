import SummaryCard from "@/Components/Card/SummaryCard";
import SearchSelectInput from "@/Components/Input/SearchSelectInput";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { format, isWithinInterval, parseISO } from "date-fns";
import { Banner, Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import {
    MdOutlineCategory,
    MdOutlineProductionQuantityLimits,
} from "react-icons/md";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function DashboardPage() {
    const {
        count,
        products,
        categories,
        auth,
        initialStartDate,
        initialEndDate,
        initialProductId,
        initialCategoryId,
        stockByDate,
        stockInBySource,
        stockOutByDestination,
    } = usePage().props;

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [productId, setProductId] = useState(initialProductId);
    const [categoryId, setCategoryId] = useState(initialCategoryId);

    const applyFilter = () => {
        router.get(
            route("dashboard"),
            {
                start_date: startDate,
                end_date: endDate,
                product_id: productId,
                category_id: categoryId,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const pieChartSourceData = {
        labels: [
            "Pembelian",
            "Pengadaan Internal",
            "Retur Pelanggan",
            "Koreksi Tambah",
        ],
        datasets: [
            {
                label: "Produk Masuk",
                data: [
                    stockInBySource.PURCHASE,
                    stockInBySource.INTERNAL_PROCUREMENT,
                    stockInBySource.CUSTOMER_RETURN,
                    stockInBySource.ADJUSTMENT_IN,
                ],
                backgroundColor: [
                    "rgba(79, 70, 229, 0.6)", // Pembelian
                    "rgba(34, 197, 94, 0.6)", // Pengadaan Internal
                    "rgba(251, 191, 36, 0.6)", // Retur Pelanggan
                    "rgba(239, 68, 68, 0.6)", // Koreksi Tambah
                ],
                borderColor: [
                    "rgba(79, 70, 229, 1)",
                    "rgba(34, 197, 94, 1)",
                    "rgba(251, 191, 36, 1)",
                    "rgba(239, 68, 68, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartDestinationData = {
        labels: ["Penjualan", "Pemakaian Internal", "Rusak", "Koreksi Kurang"],
        datasets: [
            {
                label: "Produk Keluar",
                data: [
                    stockOutByDestination.SALES,
                    stockOutByDestination.INTERNAL_USE,
                    stockOutByDestination.DAMAGED,
                    stockOutByDestination.ADJUSTMENT_OUT,
                ],
                backgroundColor: [
                    "rgba(16, 185, 129, 0.6)", // Penjualan - Emerald
                    "rgba(168, 85, 247, 0.6)", // Pemakaian Internal - Violet
                    "rgba(239, 68, 68, 0.6)", // Rusak - Rose
                    "rgba(100, 116, 139, 0.6)", // Koreksi Kurang - Slate
                ],
                borderColor: [
                    "rgba(16, 185, 129, 1)",
                    "rgba(168, 85, 247, 1)",
                    "rgba(239, 68, 68, 1)",
                    "rgba(100, 116, 139, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <BackpageLayout>
            <Banner className="mb-4 hidden">
                <div className="flex w-full items-center gap-2 border-l-4 border-primary/70 bg-primary/10 bg-opacity-[15%] px-4 py-6 shadow-md">
                    <FaCircleCheck className="size-10 text-primary/70" />
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
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {auth.user.role === "ADMIN" && (
                    <>
                        <SummaryCard
                            label="Kategori"
                            count={count.category}
                            icon={<MdOutlineCategory className="size-8" />}
                            href="/categories"
                        />
                        <SummaryCard
                            label="Produk"
                            count={count.product}
                            icon={
                                <MdOutlineProductionQuantityLimits className="size-8" />
                            }
                            href="/products"
                        />
                    </>
                )}
                <SummaryCard
                    label="Masuk"
                    count={count.productIn}
                    icon={<BsArrowRightCircle className="size-7" />}
                    href="/product-ins"
                />
                <SummaryCard
                    label="Keluar"
                    count={count.productOut}
                    icon={<BsArrowLeftCircle className="size-7" />}
                    href="/product-outs"
                />
                <SummaryCard
                    label="Transaksi"
                    count={count.transaction}
                    icon={<LuDollarSign className="size-7" />}
                    href="/transactions"
                />
                {auth.user.role === "ADMIN" && (
                    <SummaryCard
                        label="Promosi"
                        count={count.promotion}
                        icon={
                            <IoIosInformationCircleOutline className="size-8" />
                        }
                        href="/promotions"
                    />
                )}
            </div>

            <div className="pt-2 mt-4 w-full border-t-2">
                <div className="flex w-full flex-wrap items-end justify-start gap-2 mb-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="start_date" value="Tanggal mulai" />
                        </div>
                        <TextInput
                            id="start_date"
                            name="start_date"
                            type="date"
                            defaultValue={initialStartDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="end_date" value="Tanggal Selesai" />
                        </div>
                        <TextInput
                            id="end_date"
                            name="end_date"
                            type="date"
                            defaultValue={initialEndDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="w-auto lg:w-80">
                        <div className="mb-2 block">
                            <Label htmlFor="product_id" value="Produk" />
                        </div>
                        <div className="w-full">
                            <SearchSelectInput
                                entities={products}
                                otherEntity={"code"}
                                selectedEntityId={productId}
                                setSelectedEntityId={(id) => setProductId(id)}
                                label={"-- Pilih produk --"}
                                placeholder={"Cari produk..."}
                            />
                        </div>
                    </div>
                    <div className="w-auto lg:w-80">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="category_id"
                                value="Kategori Produk"
                            />
                        </div>
                        <div className="w-full">
                            <SearchSelectInput
                                entities={categories}
                                selectedEntityId={categoryId}
                                setSelectedEntityId={(id) => setCategoryId(id)}
                                label={"-- Pilih kategori --"}
                                placeholder={"Cari kategori..."}
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            color="none"
                            className="bg-primary/80 hover:bg-primary/100 text-white text-nowrap"
                            onClick={applyFilter}
                        >
                            Terapkan Filter
                        </Button>
                    </div>
                    <Link href="dashboard">
                        <Button color="failure">Reset</Button>
                    </Link>
                </div>

                <Card className="w-full h-[30rem] col-span-2 p-1 sm:p-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Statistik Stok Harian
                    </h2>
                    <Line
                        data={{
                            labels: stockByDate.map((txn) =>
                                format(parseISO(txn.date), "dd MMM")
                            ),
                            datasets: [
                                {
                                    label: "Produk Masuk",
                                    data: stockByDate.map((txn) => txn.in),
                                    borderColor: "#4F46E5",
                                    backgroundColor: "rgba(79, 70, 229, 0.1)",
                                    tension: 0.3,
                                    fill: true,
                                    borderWidth: 2,
                                },
                                {
                                    label: "Produk Keluar",
                                    data: stockByDate.map((txn) => txn.out),
                                    borderColor: "#EF4444",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    tension: 0.3,
                                    fill: true,
                                    borderWidth: 2,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "top",
                                    labels: {
                                        color: "#374151",
                                    },
                                },
                                tooltip: {
                                    enabled: true,
                                },
                            },
                            scales: {
                                x: {
                                    ticks: { autoSkip: false },
                                },
                                y: {
                                    beginAtZero: true,
                                },
                            },
                        }}
                    />
                </Card>

                <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
                    <Card className="w-full h-[30rem] p-1 sm:p-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Produk Masuk berdasarkan Sumber
                        </h2>
                        <Pie
                            data={pieChartSourceData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: true,
                                    },
                                },
                            }}
                        />
                    </Card>
                    <Card className="w-full h-[30rem] p-1 sm:p-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Produk Keluar berdasarkan Tujuan
                        </h2>
                        <Pie
                            data={pieChartDestinationData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: true,
                                    },
                                },
                            }}
                        />
                    </Card>
                </div>
            </div>
        </BackpageLayout>
    );
}
