import { ORIGIN_DEFAULT } from "@/Constants/transactionConstant";
import { ToastTopEnd } from "@/Utils/alert";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useCheckCostKomerce = () => {
    const [response, setResponse] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const checkCostMutation = useMutation({
        mutationFn: async ({
            destination,
            weight,
            courier,
        }) => {
            const body = {
                origin: ORIGIN_DEFAULT,
                destination,
                weight,
                courier,
                price: null
            };

            return await axios({
                method: "POST",
                url: `/komerce/cost`,
                data: body,
            });
        },
        onSuccess: (res) => {
            if (res.status === 201 || res.status === 200) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: res.data.message,
                });

                setResponse(res.data);
            } else {
                setError(res.data.message);
                ToastTopEnd.fire({
                    icon: "error",
                    title: res.data.message,
                });
            }
        },
        onError: (error) => {
            if (error.response) {
                setError(error.response.data.message);
                ToastTopEnd.fire({
                    icon: "error",
                    title: error.response.data.message,
                });
            } else {
                setError(error.message);
                ToastTopEnd.fire({
                    icon: "error",
                    title: error.message,
                });
            }
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const handleCheckCost = (payload) => {
        setIsLoading(true);
        setError(null);

        checkCostMutation.mutate(payload);
    };

    return {
        response,
        // isLoading: checkCostMutation.isPending,
        isLoading,
        error,
        handleCheckCost,
        setResponse
    };
};
