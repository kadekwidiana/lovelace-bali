import { ToastTopEnd } from '@/Utils/alert';
import { router } from '@inertiajs/react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function useSelectedRajaOngkirConfig() {
    const handleSelected = async (id) => {
        try {
            const response = await axios({
                method: 'PATCH',
                url: `/config/raja-ongkirs/${id}/selected`,
            });

            const { status, data } = response;
            const { message } = data;

            if (status === 200) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: message,
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

    const setSelectedConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin menggunakan konfigurasi ini?",
            text: "Konfigurasi ini akan digunakan sebagai konfigurasi aktif.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleSelected(id);
            }
        });
    };

    return {
        setSelectedConfirm
    };
}
