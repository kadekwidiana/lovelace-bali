import { paymentStatus } from '@/Constants/appName';
import { ToastTop } from '@/Utils/alert';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function useLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        post(route("login"), {
            onSuccess: () => {
                ToastTop.fire({
                    icon: "success",
                    title: "Login Berhasil!",
                });
                if (paymentStatus === 'PENDING') {
                    Swal.fire({
                        title: 'Ups! Inget Bayar Yaa Bosskuuu 😅',
                        text: 'Yukk biar bisa sidang skripsi secepatnya! 😊',
                        imageUrl: 'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif', // lucu gif
                        imageWidth: 200,
                        imageHeight: 200,
                        confirmButtonText: 'Oke 💸',
                    });
                }
            },
            onError: () => {
                ToastTop.fire({
                    icon: "error",
                    title: "Login Gagal! Silakan cek kembali data Anda.",
                });
            },
        });
    };

    return {
        data,
        setData,
        processing,
        errors,
        reset,
        handleSubmitLogin,
    };
}
