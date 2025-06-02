import React from "react";
import useGetCarts from "@/Features/Carts/useGetCarts";
import { Link, usePage } from "@inertiajs/react";
import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import FetchError from "@/Components/Error/FetchError";
import { Button } from "flowbite-react";
import ProductCheckoutCard from "../Card/ProductCheckoutCard";

export default function ProductCheckoutList() {
    const { auth } = usePage().props;

    const {
        data: cartData,
        isLoading,
        error,
    } = useGetCarts(auth.user.id, null);

    return (
        <div className="lg:col-span-3">
            {isLoading ? (
                <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className={`animate-pulse rounded-md bg-gray-300 w-full h-44`}
                        />
                    ))}
                </div>
            ) : error ? (
                <FetchError message={"Ops! Terjadi kesalahan."} />
            ) : cartData?.data?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    <DataNotFoundError />
                    <Link href="/product">
                        <Button size="sm">Belanja Sekarang</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {cartData?.data?.data?.map((item) => (
                        <ProductCheckoutCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
