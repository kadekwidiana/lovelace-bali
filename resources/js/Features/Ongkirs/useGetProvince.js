import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetProvince() {
    return useQuery({
        queryKey: ["get-province"],
        queryFn: () => axios({
            method: 'GET',
            url: `/raja-ongkir/province`,
        }),
    });
}
