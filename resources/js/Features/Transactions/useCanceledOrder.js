import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function useCancelOrder() {
    const handleCanceledOrder = async (id) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: `/transactions/${id}`,
                data: {
                    status: 'CANCELLED'
                }
            });

            const { status, data } = response;
            const { message } = data;

            if (status === 200 || status === 201) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: 'Pesanan berhasil dibatalkan.',
                });
                router.reload();
            } else {
                ToastTopEnd.fire({
                    icon: "error",
                    title: message,
                });
            }
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                ToastTopEnd.fire({
                    icon: "error",
                    title: message || 'Terjadi kesalahan.',
                });
            } else {
                ToastTopEnd.fire({
                    icon: "error",
                    title: 'Terjadi kesalahan.' + error,
                });
            }
        }
    };

    const canceledOrderConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin membatalkan pesanan ini?",
            text: "Tindakan ini akan membatalkan pesanan terkait.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, batalkan!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleCanceledOrder(id);
            }
        });
    };

    return {
        canceledOrderConfirm
    };
}
