import Checkbox from "@/Components/Checkbox";

export default function CourierOptionCard({
    selected,
    onSelect,
    data,
    setData,
}) {
    const handleSelect = () => {
        setData((prev) => ({
            ...prev,
            shipment_cost: data?.cost,
            courier: data?.code,
            cost_json: data,
        }));
        onSelect();
    };

    return (
        <div
            className="flex justify-start items-center gap-2 p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-all cursor-pointer"
            onClick={handleSelect}
        >
            <Checkbox
                className="h-5 w-5"
                checked={selected}
                onCheckedChange={handleSelect}
            />
            <div className="flex flex-col gap-0">
                <span className="font-semibold">{data?.name}</span>
                <span className="text-sm">Service: {data?.service}</span>
                <span className="text-sm">
                    Biaya: Rp. {data?.cost?.toLocaleString("id-ID")}
                </span>
                <span className="text-sm">Estimasi: {data?.etd ?? "-"}</span>
            </div>
        </div>
    );
}
