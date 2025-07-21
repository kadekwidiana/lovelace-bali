import FetchError from "@/Components/Error/FetchError";
import useGetOrderSummary from "@/Features/Carts/useGetOrderSummary";
import { formatRupiah } from "@/Utils/formatNumber";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";
import React from "react";

export default function OrderSummaryCard() {
    const { auth } = usePage().props;

    const {
        data: orderSummaryData,
        isLoading,
        error,
    } = useGetOrderSummary(auth?.user?.id);

    return (
        <div className="w-full lg:col-span-2">
            {isLoading ? (
                <div
                    className={`animate-pulse rounded-md bg-gray-300 w-full h-56`}
                />
            ) : error ? (
                <FetchError message={"Ops! Terjadi kesalahan."} />
            ) : (
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        Rincian Pesanan
                    </p>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Jumlah item
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    {orderSummaryData?.data?.data?.total_item}
                                </dd>
                            </dl>
                            {/* <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Diskon
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    -
                                </dd>
                            </dl> */}
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">
                                Total
                            </dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">
                                {formatRupiah(
                                    orderSummaryData?.data?.data?.total
                                )}
                            </dd>
                        </dl>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/customer/checkout">
                            <Button
                                size="sm"
                                disabled={
                                    orderSummaryData?.data?.data?.total_item ===
                                    0
                                }
                                color="none"
                                className="bg-primary/80 hover:bg-primary/100 text-white"
                            >
                                Proses Checkout{" "}
                                <svg
                                    className="size-5 ml-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 12H5m14 0-4 4m4-4-4-4"
                                    />
                                </svg>
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
