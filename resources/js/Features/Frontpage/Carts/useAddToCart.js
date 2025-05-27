import { ToastTopEnd } from "@/Utils/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    const addToCartMutation = useMutation({
        mutationFn: async ({
            user_id,
            product_id,
            quantity,
        }) => {
            const body = {
                user_id,
                product_id,
                quantity,
            };

            return await axios({
                method: "POST",
                url: `/data/carts`,
                data: body,
            });
        },
        onSuccess: (res) => {
            if (res.status === 201) {
                ToastTopEnd.fire({
                    icon: "success",
                    title: res.data.message,
                });

                queryClient.refetchQueries({
                    queryKey: ["get-carts"],
                    exact: false,
                });
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

    const handleAddToCart = (payload) => {
        addToCartMutation.mutate(payload);
    };

    return {
        handleAddToCart
    };
};
