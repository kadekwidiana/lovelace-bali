import React from "react";
import ProductCheckoutCard from "../Card/ProductCheckoutCard";
import useGetCarts from "@/Features/Frontpage/Carts/useGetCarts";
import { usePage } from "@inertiajs/react";

export default function ProductCheckoutList() {
    const { auth } = usePage().props;

    const { data: cartData } = useGetCarts(auth.user.id, null);

    return (
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
                {cartData?.data?.data?.map((item) => (
                    <ProductCheckoutCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
