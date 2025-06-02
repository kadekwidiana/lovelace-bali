import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function useProcessOrder() {
    const handleProcessOrder = async (id) => {
        try {
            const response = await axios({
                method: 'PUT',
                url: `/transactions/${id}`,
                data: {
                    status: 'PROCESSING'
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

    const processOrderConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin memproses pesanan ini?",
            text: "Tindakan ini akan memproses pesanan terkait.",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, proses!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleProcessOrder(id);
            }
        });
    };

    return {
        processOrderConfirm
    };
}
