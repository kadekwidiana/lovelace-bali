import { ToastTopEnd } from '@/Utils/alert';
import axios from 'axios';
import { useState } from 'react';

export default function useCheckPromo() {
    const [res, setRes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckPromo = async (payload) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await axios({
                method: 'POST',
                url: '/check-promo',
                data: payload,
            });

            setRes(res.data.data);

            ToastTopEnd.fire({
                icon: "success",
                title: res.data.message,
            });
        } catch (error) {
            setRes(null);

            setError(error.response.data.message);

            ToastTopEnd.fire({
                icon: "error",
                title: error.response.data.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { res, isLoading, error, handleCheckPromo };
}
