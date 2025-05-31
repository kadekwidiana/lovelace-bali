import { Link } from "@inertiajs/react";
import OrderSummaryCheckoutCard from "./_Component/Card/OrderSummaryCheckoutCard";
import ShipmentForm from "./_Component/Form/ShipmentForm";
import FrontpageLayout from "./_Component/Layout";
import { Button } from "flowbite-react";

export default function CheckoutCsPage() {
    return (
        <FrontpageLayout>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 pt-20">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-3xl text-start font-semibold text-gray-900 my-4">
                        Checkout
                    </h2>
                    <Link href={`/customer/carts`}>
                        <Button color="gray" size="xs">
                            Keranjang
                        </Button>
                    </Link>
                    <div className="mt-4 gap-4 md:gap-6 grid grid-cols-1 lg:grid-cols-5 lg:items-start xl:gap-8">
                        <ShipmentForm className="lg:col-span-3 rounded-md border bg-white p-6" />
                        <OrderSummaryCheckoutCard className="lg:col-span-2" />
                    </div>
                </div>
            </section>
        </FrontpageLayout>
    );
}
