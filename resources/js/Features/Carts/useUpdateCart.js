import { ToastTopEnd } from "@/Utils/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateCart = (item) => {
    const queryClient = useQueryClient();

    const updateCartMutation = useMutation({
        mutationFn: async ({
            user_id = item.user_id,
            product_id = item.product_id,
            quantity = item.quantity,
            is_select = item.is_select,
        }) => {
            const body = {
                user_id,
                product_id,
                quantity,
                is_select,
            };

            return await axios({
                method: "PUT",
                url: `/data/carts/${item.id}`,
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
                queryClient.refetchQueries({
                    queryKey: ["get-order-summary"],
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
