import {
    BASE_URL_MIDTRANS,
    CLIENT_KEY_MIDTRANS,
} from "@/Constants/transactionConstant";
import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import { useEffect } from "react";

export default function usePaymentAction() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `${BASE_URL_MIDTRANS}/snap/snap.js`;
        script.setAttribute("data-client-key", CLIENT_KEY_MIDTRANS);
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePay = (snapToken, id) => {
        window.snap.pay(snapToken, {
            onSuccess: async (result) => {
                // console.log("Success:", result);
                const response = await axios({
                    method: 'PUT',
                    url: `/transactions/${id}`,
                    data: {
                        status: 'PAID'
                    }
                });

                console.log(response);

                ToastTopEnd.fire({
                    icon: "success",
                    title: 'Pembayaran berhasil.',
                });
                router.reload();
            },
            onPending: (result) => {
                // console.log("Pending:", result);
                ToastTopEnd.fire({
                    icon: "warning",
                    title: 'Pembayaran sedang dalam proses.',
                });
            },
            onError: (error) => {
                // console.error("Error:", error);
                ToastTopEnd.fire({
                    icon: "error",
                    title: 'Pembayaran gagal.',
                });
            },
            onClose: () => {
                // console.log("User closed the popup");
                ToastTopEnd.fire({
                    icon: "error",
                    title: 'Pembayaran dibatalkan.',
                });
            },
        });
    };

    return { handlePay };
}
