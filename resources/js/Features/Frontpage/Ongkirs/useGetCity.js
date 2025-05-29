import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetCity(provinceId) {
    return useQuery({
        queryKey: ["get-city"],
        queryFn: () => axios({
            method: 'GET',
            url: `/raja-ongkir/city`,
            params: { province: provinceId },
        }),
    });
}
