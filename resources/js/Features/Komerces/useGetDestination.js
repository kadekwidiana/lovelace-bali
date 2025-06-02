import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetDestinationKommerce({
    search,
    limit = 10,
    offset = 0
}) {
    return useQuery({
        queryKey: ["get-destination-kommerce"],
        queryFn: () => axios({
            method: 'GET',
            url: `/komerce/destination`,
            params: {
                search,
                limit,
                offset
            },
        }),
    });
}
