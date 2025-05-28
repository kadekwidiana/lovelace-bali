import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetOrderSummary(userId) {
    return useQuery({
        queryKey: ["get-order-summary"],
        queryFn: () => axios({
            method: 'GET',
            url: `/data/carts/order-summary/${userId}`,
        }),
    });
}
