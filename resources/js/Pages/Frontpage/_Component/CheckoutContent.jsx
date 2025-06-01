import InputError from "@/Components/InputError";
import DataLoading from "@/Components/Loading/DataLoading";
import useCreateTransaction from "@/Features/Backpage/Transactions/useCreateTransaction";
import useGetOrderSummary from "@/Features/Frontpage/Carts/useGetOrderSummary";
import { useCheckCostKomerce } from "@/Features/Frontpage/Komerces/useCheckCost";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";
import DeliveryServiceCard from "./Card/DeliveryServiceCard";
import OrderSummaryCheckoutCard from "./Card/OrderSummaryCheckoutCard";
import ShipmentForm from "./Form/ShipmentForm";
import { useEffect, useState } from "react";

export default function CheckoutContent() {
    const { auth } = usePage().props;

    const [destinationId, setDestinationId] = useState(null);

    const { data: orderSummaryData } = useGetOrderSummary(auth?.user?.id);

    const {
        response: checkCostResponse,
        isLoading: checkCostIsLoading,
        error: checkCostError,
        handleCheckCost,
        setResponse: setCheckCostResponse,
    } = useCheckCostKomerce();

    const {
        data,
        errors,
        processing,
        handleChange,
        handleSubmitCreateTransaction,
        setData,
    } = useCreateTransaction();

    useEffect(() => {
        setDestinationId(data.destination_json?.id);
    }, [data, setDestinationId]);

    console.log(data);

    return (
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
                    <div className="lg:col-span-3 flex flex-col w-full gap-4 md:gap-6">
                        <ShipmentForm
                            key={data}
                            className="lg:col-span-3 rounded-md border bg-white p-6"
                            data={data}
                            errors={errors}
                            handleChange={handleChange}
                            setData={setData}
                            handleCheckCost={() => {
                                handleCheckCost({
                                    destination: destinationId,
                                    weight:
                                        orderSummaryData?.data?.data
                                            ?.total_weight === 0
                                            ? 1
                                            : orderSummaryData?.data?.data
                                                  ?.total_weight,
                                    courier: data.courier,
                                });
                            }}
                            checkCostIsLoading={checkCostIsLoading}
                            setCheckCostResponse={setCheckCostResponse}
                        />
                        {checkCostIsLoading ? (
                            <DataLoading />
                        ) : checkCostError ? (
                            <div className="flex justify-center">
                                <InputError message={checkCostError} />
                            </div>
                        ) : checkCostResponse?.data?.data?.length ? (
                            <DeliveryServiceCard
                                dataCosts={checkCostResponse.data.data}
                                setData={setData}
                            />
                        ) : null}
                    </div>
                    <OrderSummaryCheckoutCard
                        className="lg:col-span-2"
                        data={data}
                        setData={setData}
                        isSubmitting={processing}
                        handleSubmit={handleSubmitCreateTransaction}
                    />
                </div>
            </div>
        </section>
    );
}
