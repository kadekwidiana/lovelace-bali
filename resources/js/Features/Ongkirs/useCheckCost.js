import { CITY_CODE_DEFAULT } from "@/Constants/transactionConstant";
import { ToastTopEnd } from "@/Utils/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useCheckCost = () => {
    const [response, setResponse] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const queryClient = useQueryClient();

    const checkCostMutation = useMutation({
        mutationFn: async ({
            destination,
            weight,
            courier,
        }) => {
            const body = {
                origin: CITY_CODE_DEFAULT,
                destination,
                weight,
                courier,
            };

            return await axios({
                method: "POST",
                url: `/raja-ongkir/cost`,
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
                ToastTopEnd.fire({
                    icon: "error",
                    title: res.data.message,
                });
            }
        },
        onError: (error) => {
            if (error.response) {
                ToastTopEnd.fire({
                    icon: "error",
                    title: error.response.data.message,
                });
            } else {
                ToastTopEnd.fire({
                    icon: "error",
                    title: error.message,
                });
            }
        },
    });

    const handleCheckCost = (payload) => {
        setIsLoading(true);

        setIsLoading(false);

        setResponse([
            {
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "code": "jne",
                "service": "CTC",
                "description": "JNE City Courier",
                "cost": 10000,
                "etd": "2 day"
            },
            {
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "code": "jne",
                "service": "JTR",
                "description": "JNE Trucking",
                "cost": 80000,
                "etd": "6 day"
            },
            {
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "code": "jne",
                "service": "JTR<130",
                "description": "JNE Trucking",
                "cost": 200000,
                "etd": "-"
            },
            {
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "code": "jne",
                "service": "JTR>130",
                "description": "JNE Trucking",
                "cost": 350000,
                "etd": "6 day"
            },
            {
                "name": "Jalur Nugraha Ekakurir (JNE)",
                "code": "jne",
                "service": "JTR>200",
                "description": "JNE Trucking",
                "cost": 500000,
                "etd": "6 day"
            }
        ]);

        return ToastTopEnd.fire({
            icon: "success",
            title: "Sukses melakukan pengecekan ongkir.",
        });

    };

    return {
        response,
        handleCheckCost,
        // isLoading: checkCostMutation.isPending,
        isLoading
    };
};
