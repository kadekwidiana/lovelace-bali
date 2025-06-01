import { ToastTopEnd } from "@/Utils/alert";
import { useForm, usePage } from "@inertiajs/react";

export default function useCreateTransaction() {
    const {
        props: {
            auth: { user },
        },
    } = usePage();

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            created_by: user.id,
            shipment_cost: 0,
            phone_number: user.customer?.phone_number,
            recipient_name: user.name,
            province_code: user.customer?.province_code,
            province_name: user.customer?.province_name,
            city_code: user.customer?.city_code,
            city_name: user.customer?.city_name,
            sub_district: user.customer?.sub_district,
            village: user.customer?.village,
            address: user.customer?.address,
            note: "",
            items: [],
            courier: null,
            destination_json: null,
            cost_json: null
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmitCreateTransaction = (e) => {
        e.preventDefault();

        post(route("transactions.store"), {
            onSuccess: () => {
                ToastTopEnd.fire({
                    icon: "success",
                    title: "Transaksi berhasil dibuat.",
                });
            },
            onError: (errors) => {
                // Cek apakah ada pesan langsung dari response
                if (errors.message) {
                    ToastTopEnd.fire({
                        icon: "error",
                        title: errors.message,
                    });
                } else {
                    // Default fallback message
                    ToastTopEnd.fire({
                        icon: "error",
                        title: "Terjadi kesalahan saat membuat transaksi.",
                    });
                }
            },
        });
    };

    return {
        data,
        errors,
        processing,
        handleChange,
        handleSubmitCreateTransaction,
        setData
    };
}
