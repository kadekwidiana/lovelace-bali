import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetCarts(userId, productId) {
    return useQuery({
        queryKey: ["get-carts"],
        queryFn: () => axios({
            method: 'GET',
            url: `/data/carts`,
            params: { user_id: userId, product_id: productId },
        }),
    });
}
