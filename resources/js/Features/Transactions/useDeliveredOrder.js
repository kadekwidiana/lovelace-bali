import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function useDeliveredOrder() {
    const handleDeliveredOrder = async (id) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: `/transactions/${id}`,
                data: {
                    status: 'DELIVERED'
                }
            });

            const { status, data } = response;
            const { message } = data;

            if (status === 200 || status === 201) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: 'Pesanan berhasil diproses.',
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

    const deliveredOrderConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin menyelesaikan pesanan ini?",
            text: "Tindakan ini akan menyelesaikan pesanan terkait.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, selesaikan!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleDeliveredOrder(id);
            }
        });
    };

    return {
        deliveredOrderConfirm
    };
}
