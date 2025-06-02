import { ToastTopEnd } from '@/Utils/alert';
import axios from 'axios';
import React, { useState } from 'react';

export default function useGetReports() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [params, setParams] = useState({
        start_date: '',
        end_date: '',
        type_report: '',
        product_id: '',
    });

    const getReports = async () => {
        setReports([]);
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'GET',
                url: '/data-reports',
                params: params,
            });
            const { data } = response;

            ToastTopEnd.fire({
                icon: 'success',
                title: data.message,
            });

            setReports(data.data);
        } catch (error) {
            if (error.response) {
                ToastTopEnd.fire({
                    icon: 'error',
                    title: error.response.data.message || 'Terjadi kesalahan.',
                });
                setError(error.response.data.message);
            } else {
                ToastTopEnd.fire({
                    icon: 'error',
                    title: error.message || 'Terjadi kesalahan.',
                });
                setError(error.message);
            }
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        reports,
        isLoading,
        error,
        params,
        setParams,
        getReports,
    };
}
