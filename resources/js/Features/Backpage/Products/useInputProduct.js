import { ToastTopEnd } from "@/Utils/alert";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInputProduct(setOpenModal, isUpdate = false, product) {
    const { categories } = usePage().props;

    const initialFormData = {
        category_id: '',
        name: '',
        code: '',
        size: '',
        color: '',
        price: '',
        stock: 0,
        description: '',
        image: null,
    };

    const [formData, setFormData] = useState(initialFormData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState(initialFormData);

    const [imagePreview, setImagePreview] = useState({
        image: ''
    });

    useEffect(() => {
        if (isUpdate) {
            setFormData({
                category_id: product?.category_id ?? '',
                name: product?.name ?? '',
                code: product?.code ?? '',
                size: product?.size ?? '',
                color: product?.color ?? '',
                price: product?.price ?? '',
                stock: product?.stock ?? '',
                description: product?.description ?? '',
                image: null,
            });
            product?.image &&
                setImagePreview({
                    ...imagePreview,
                    image: `${product?.image}` ?? null,
                });
        }
    }, [isUpdate, product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (file) {
            setFormData({
                ...formData,
                [name]: file,
            });
            setImagePreview({
                ...imagePreview,
                [name]: URL.createObjectURL(file),
            });
        } else {
            setFormData({
                ...formData,
                [name]: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const response = await axios({
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                method: 'POST',
                url: `/products${isUpdate ? '/' + product?.id + '/update' : ''}`,
                data: formData
            });

            const { status, data } = response;
            const { message, errors } = data;

            if (status === 200 || status === 201) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: message,
                });
                setFormData(initialFormData);
                setErrors(initialFormData);
                setImagePreview({
                    image: null,
                });
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
        categories,
        formData,
        imagePreview,
        isSubmitting,
        errors,
        handleChange,
        handleFileChange,
        handleSubmit
    };
}
