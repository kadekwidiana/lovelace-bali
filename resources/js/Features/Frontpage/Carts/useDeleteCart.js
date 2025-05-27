import { ToastTopEnd } from "@/Utils/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCart = () => {
    const queryClient = useQueryClient();

    const deleteCartMutation = useMutation({
        mutationFn: async (cartId) => {
            return await axios({
                method: "DELETE",
                url: `/data/carts/${cartId}`,
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

    const handleDeleteCart = (cartId) => {
        deleteCartMutation.mutate(cartId);
    };

    return {
        handleDeleteCart
    };
};
