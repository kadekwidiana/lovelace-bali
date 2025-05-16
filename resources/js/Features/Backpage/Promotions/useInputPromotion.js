import { ToastTopEnd } from "@/Utils/alert";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInputPromotion(setOpenModal, isUpdate = false, promotion) {
    const { products } = usePage().props;

    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [productIdOptions, setProductIdOptions] = useState([]);

    const initialFormData = {
        title: '',
        description: '',
        image: null,
        start_date: '',
        end_date: '',
        discount_percentage: '',
        product_ids: selectedProductIds,
    };

    const [formData, setFormData] = useState(initialFormData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        ...initialFormData,
        product_ids: null
    });

    const [imagePreview, setImagePreview] = useState({
        image: ''
    });

    products.forEach((product) => {
        if (!productIdOptions.some(option => option.value === product.id)) {
            productIdOptions.push({
                value: product.id,
                label: product.name
            });
        }
    });

    useEffect(() => {
        isUpdate &&
            setFormData({
                ...formData,
                product_ids: selectedProductIds,
            });
    }, [isUpdate, selectedProductIds]);

    useEffect(() => {
        if (isUpdate) {
            setSelectedProductIds(promotion?.product_ids ?? []);
        }
    }, [isUpdate, promotion]);

    useEffect(() => {
        if (isUpdate) {
            setFormData({
                title: promotion?.title ?? '',
                description: promotion?.description ?? '',
                image: null,
                start_date: promotion?.start_date.split('T')[0] ?? '',
                end_date: promotion?.end_date.split('T')[0] ?? '',
                discount_percentage: promotion?.discount_percentage ?? '',
                product_ids: promotion?.product_ids ?? [],
            });
            promotion?.image &&
                setImagePreview({
                    ...imagePreview,
                    image: `${promotion?.image}` ?? null,
                });
        }
    }, [isUpdate, promotion]);

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
                url: `/promotions${isUpdate ? '/' + promotion?.id + '/update' : ''}`,
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
                setErrors({
                    ...initialFormData,
                    product_ids: null
                });
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
        products,
        formData,
        imagePreview,
        isSubmitting,
        errors,
        productIdOptions,
        selectedProductIds,
        setSelectedProductIds,
        handleChange,
        handleFileChange,
        handleSubmit
    };
}
