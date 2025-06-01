import { ToastTopEnd } from "@/Utils/alert";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useInputStockLog(setOpenModal, isUpdate, isOut, stockLog) {
    const { products, auth } = usePage().props;

    const initialFormData = {
        product_id: '',
        created_by: '',
        type: '',
        quantity: 0,
        date: '',
        note: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        product_id: '',
        created_by: '',
        type: '',
        quantity: '',
        date: '',
        note: ''
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            created_by: auth.user.id,
            type: isOut ? 'OUT' : 'IN',
        }));
    }, [isOut, auth.user.id]);

    useEffect(() => {
        setFormData({
            product_id: stockLog?.product_id ?? '',
            created_by: stockLog?.created_by ?? auth.user.id,
            type: stockLog?.type ?? (isOut ? 'OUT' : 'IN'),
            quantity: stockLog?.quantity ?? 0,
            date: stockLog?.date ? stockLog.date.substring(0, 10) : '',
            note: stockLog?.note ?? '',
        });
    }, [isUpdate, stockLog, isOut, auth.user.id]);

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
                url: `/stock-logs${isUpdate ? '/' + stockLog?.id : ''}`,
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
                setErrors({
                    ...initialFormData,
                    type: '',
                    quantity: ''
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
        isSubmitting,
        errors,
        setFormData,
        handleChange,
        handleSubmit
    };
}
