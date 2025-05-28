import { ToastTopEnd } from "@/Utils/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

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

    const handleDeleteCart = (cartId) => {
        deleteCartMutation.mutate(cartId);
    };

    const deleteDataConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin menghapus data ini?",
            text: "Data yang terkait dengan ini juga akan dihapus dan tidak dapat dipulihkan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await handleDeleteCart(id);
            }
        });
    };

    return {
        deleteDataConfirm
    };
};
