import { ToastTopEnd } from "@/Utils/alert";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useRef, useState } from "react";

export const useSearchDestination = (setData) => {
    const [response, setResponse] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const searchTimeoutRef = useRef(null);

    const searchDestinationMutation = useMutation({
        mutationFn: async ({
            search,
            limit = 10,
            offset = 0
        }) => {
            const params = {
                search,
                limit,
                offset
            };

            return await axios({
                method: "GET",
                url: `/komerce/destination`,
                params
            });
        },
        onSuccess: (res) => {
            if (res.status === 200) {
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
                console.log(error.response);
                ToastTopEnd.fire({
                    icon: "error",
                    title: error.response.data.message,
                });
            } else {

            }
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const handleSearchDestination = useCallback((search) => {
        if (!search || search.trim() === "") {
            return;
        }

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setIsLoading(true);
            setError(null);
            setResponse(null);
            setData('destination_json', null);

            searchDestinationMutation.mutate({
                search,
                limit: 20,
                offset: 0
            });
        }, 1000);
    }, []);

    return {
        response,
        handleSearchDestination,
        // isLoading: searchDestinationMutation.isPending,
        isLoading,
        error,
    };
};
