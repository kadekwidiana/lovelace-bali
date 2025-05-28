import { ToastTopEnd } from "@/Utils/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateCart = (cartId) => {
    const queryClient = useQueryClient();

    const updateCartMutation = useMutation({
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
                method: "PUT",
                url: `/data/carts/${cartId}`,
                data: body,
            });
        },
        onSuccess: (res) => {
            if (res.status === 200) {
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

    const handleUpdateCart = (payload) => {
        updateCartMutation.mutate(payload);
    };

    return {
        handleUpdateCart,
        isLoading: updateCartMutation.isPending,
    };
};
