import { useState } from "react";
import CourierOptionCard from "./CourierOptionCard";

export default function DeliveryServiceCard({ dataCosts, setData }) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="rounded-md border bg-white p-6">
            <header>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Pilih Jasa Pengiriman
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-2">
                {dataCosts.map((item, index) => (
                    <CourierOptionCard
                        key={index}
                        selected={selected === index}
                        onSelect={() => setSelected(index)}
                        data={item}
                        setData={setData}
                    />
                ))}
            </div>
        </div>
    );
}
