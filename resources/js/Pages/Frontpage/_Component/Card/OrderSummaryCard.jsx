import { Button } from "flowbite-react";
import React from "react";

export default function OrderSummaryCard() {
    return (
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                </p>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Original price
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                $7,592.00
                            </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Savings
                            </dt>
                            <dd className="text-base font-medium text-green-600">
                                -$299.00
                            </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Store Pickup
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                $99
                            </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Tax
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                                $799
                            </dd>
                        </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">
                            Total
                        </dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">
                            $8,191.00
                        </dd>
                    </dl>
                </div>
                <div className="flex justify-center">
                    <Button size="sm">
                        Proceed to Checkout{" "}
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
                </div>
            </div>
        </div>
    );
}
