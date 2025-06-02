import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInputRajaOngkirConfig(setOpenModal, isUpdate, rajaOngkirConfig) {
    const initialFormData = {
        api_url: 'https://rajaongkir.komerce.id',
        api_key: '',
        description: "",
        origin_default: 26288,
        origin_description: 'Origin ID: SAYAN UBUD, GIANYAR, BALI',
    };

    const initialError = {
        api_url: '',
        api_key: '',
        description: '',
        origin_default: '',
        origin_description: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState(initialError);

    useEffect(() => {
        setFormData({
            api_url: rajaOngkirConfig?.api_url ?? 'https://rajaongkir.komerce.id',
            api_key: rajaOngkirConfig?.api_key ?? '',
            description: rajaOngkirConfig?.description ?? '',
            origin_default: rajaOngkirConfig?.origin_default ?? '26288',
            origin_description: rajaOngkirConfig?.origin_description ?? 'Origin ID: SAYAN UBUD, GIANYAR, BALI',
        });
    }, [isUpdate, rajaOngkirConfig]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            const response = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: isUpdate ? 'PUT' : 'POST',
                url: `/config/raja-ongkirs${isUpdate ? '/' + rajaOngkirConfig?.id : ''}`,
                data: formData
            });

            const { status, data } = response;
            const { message, errors } = data;

            if (status === 200 || 201) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: message,
                });
                setFormData(initialFormData);
                setErrors(initialError);
                setOpenModal(false);
                router.reload();
            } else {
                ToastTopEnd.fire({
                    icon: "error",
                    title: message,
                });
                setErrors(errors || {});
            }
        } catch (error) {
            if (error.response) {
                const { message, errors } = error.response.data;
                ToastTopEnd.fire({
                    icon: "error",
                    title: message || 'Terjadi kesalahan.',
                });
                setErrors(errors || {});
            } else {
                ToastTopEnd.fire({
                    icon: "error",
                    title: 'Terjadi kesalahan.' + error,
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        errors,
        setFormData,
        handleChange,
        handleSubmit
    };
}
