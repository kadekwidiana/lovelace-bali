import { Link } from "@inertiajs/react";
import { Card } from "flowbite-react";
import React from "react";

export default function SummaryCard({ label, count, icon, href }) {
    return (
        <Card className="flex max-w-xs flex-col gap-1 text-gray-600">
            <div className="flex items-start justify-between gap-4">
                <div className="">
                    <h5 className="text-2xl font-bold tracking-tight">
                        {label}
                    </h5>
                    <p className="text-lg font-normal">{count}</p>
                </div>
                <div className="w-fit">{icon}</div>
            </div>
            <div className="flex justify-end">
                <Link href={href} className="w-fit text-blue-500 underline">
                    Lihat Detail
                </Link>
            </div>
        </Card>
    );
}
