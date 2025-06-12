import FetchError from "@/Components/Error/FetchError";
import { DetailProductModal } from "@/Components/Modal/DetailProductModal";
import useGetOrderSummary from "@/Features/Carts/useGetOrderSummary";
import { formatRupiah } from "@/Utils/formatNumber";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";

export default function OrderSummaryCheckoutCard({
    className = "",
    data,
    setData,
    isSubmitting,
    handleSubmit,
}) {
    const { auth } = usePage().props;

    const {
        data: orderSummaryData,
        isLoading,
        error,
    } = useGetOrderSummary(auth?.user?.id);

    useEffect(() => {
        setData(
            "items",
            orderSummaryData?.data?.data?.items.map((item) => {
                return {
                    product_id: item.product.id,
                    quantity: item.quantity,
                };
            })
        );
    }, [orderSummaryData]);

    return (
        <div className={`w-full flex-1 space-y-6 ${className}`}>
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
                            {orderSummaryData?.data?.data?.items?.map(
                                (item) => (
                                    <dl
                                        key={item.id}
                                        className="flex items-start justify-between gap-4 border-b border-gray-200 pb-2"
                                    >
                                        <div className="w-full flex justify-start items-center gap-4">
                                            <img
                                                className="h-20 w-20 rounded-sm"
                                                src={
                                                    item.product.image ??
                                                    "/assets/images/default-product.png"
                                                }
                                                alt={item.product.name}
                                            />
                                            <div className="flex flex-col gap-0.5">
                                                <DetailProductModal
                                                    product={item.product}
                                                    trigger={
                                                        <span className="text-base font-medium text-gray-900 hover:underline cursor-pointer">
                                                            {item.product.name}
                                                        </span>
                                                    }
                                                />
                                                <span className="text-sm text-gray-600">
                                                    {item.product.color}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {item.product.size}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    x {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-nowrap">
                                            {formatRupiah(item.subtotal)}
                                        </span>
                                    </dl>
                                )
                            )}

                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Jumlah Item
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    {orderSummaryData?.data?.data?.total_item}
                                </dd>
                            </dl>
                            <dl className="flex items-center justify-between gap-4">
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Biaya Pengiriman
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    {formatRupiah(data?.shipment_cost)}
                                </dd>
                            </dl>
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-bold text-gray-900 dark:text-white">
                                Total
                            </dt>
                            <dd className="text-base font-bold text-gray-900 dark:text-white">
                                {formatRupiah(
                                    orderSummaryData?.data?.data?.total +
                                        data?.shipment_cost
                                )}
                            </dd>
                        </dl>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            size="sm"
                            type="button"
                            disabled={
                                isSubmitting ||
                                orderSummaryData?.data?.data?.total_item ===
                                    0 ||
                                data?.shipment_cost === 0
                            }
                            onClick={handleSubmit}
                            color="none"
                            className="bg-primary/80 hover:bg-primary/100 text-white"
                        >
                            Buat Pesanan
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
