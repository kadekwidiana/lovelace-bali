import { ToastTopEnd } from "@/Utils/alert";
import { router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function usePrepareOrder(setOpenModal, transaction, isUpdateReceiptNumber = false) {
    const initialFormData = {
        status: 'SHIPPED',
        receipt_number: '',
        note: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        ...initialFormData,
        status: ''
    });

    useEffect(() => {
        if (isUpdateReceiptNumber) {
            setFormData({
                status: transaction.status,
                receipt_number: transaction.receipt_number,
                note: transaction.note
            });
        }
    }, [isUpdateReceiptNumber, transaction]);

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
                method: 'PUT',
                url: `/transactions/${transaction.id}`,
                data: formData
            });

            const { status, data } = response;
            const { message, errors } = data;

            if (status === 200 || status === 201) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: isUpdateReceiptNumber ? 'Nomor resi berhasil diperbarui.' : 'Pesanan berhasil disiapkan.',
                });
                setFormData(initialFormData);
                setErrors({
                    ...initialFormData,
                    status: ''
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
        formData,
        isSubmitting,
        errors,
        handleChange,
        handleSubmit
    };
}
