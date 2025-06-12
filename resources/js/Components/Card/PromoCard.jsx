import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { Card } from "flowbite-react";
import React from "react";
import { MdDateRange } from "react-icons/md";

export default function PromoCard({ promotion }) {
    return (
        <Card className="max-w-sm" imgSrc={promotion.image} horizontal>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                {promotion.title}
            </h5>
            <p className="font-normal text-gray-700">{promotion.description}</p>
            <div className="flex justify-start items-center gap-2 text-gray-700 text-sm">
                <MdDateRange />
                <span>
                    {formatDateToIndonesian(promotion.start_date ?? "")} -{" "}
                    {formatDateToIndonesian(promotion.end_date ?? "")}
                </span>
            </div>
            <a
                href={`promotion/${promotion.id}`}
                className="text-primary/80 hover:text-primary underline"
            >
                Lihat detail
            </a>
        </Card>
    );
}
