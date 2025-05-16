import { router, usePage } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useGetPromotionsFrontpage() {
    const { promotions, searchByTitleValue, filterByStartDateValue, filterByEndDateValue } = usePage().props;
    const startDate = useRef(promotions.start_date);
    const endDate = useRef(promotions.end_date);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    };

    const handleFilterByStartDate = (e) => {
        startDate.current = e.target.value;
        getData();
    };

    const handleFilterByEndDate = (e) => {
        endDate.current = e.target.value;
        getData();
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === '') {
            getData(true);
        }
    };

    const debouncedHandleSearch = useMemo(() => {
        return debounce(handleSearch, 500);
    }, []);

    useEffect(() => {
        return () => {
            debouncedHandleSearch.cancel();
        };
    });

    useEffect(() => {
        if (search) {
            getData();
        }
    }, [search]);

    const getData = (isSearchCleared = false) => {
        setIsLoading(true);

        const params = pickBy({
            title: search ?? searchByTitleValue,
            start_date: startDate.current ?? filterByStartDateValue,
            end_date: endDate.current ?? filterByEndDateValue
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('frontpage.promotion'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return {
        promotions,
        searchByTitleValue,
        filterByStartDateValue,
        filterByEndDateValue,
        isLoading,
        debouncedHandleSearch,
        handleChangePerPage,
        handleFilterByStartDate,
        handleFilterByEndDate
    };

}
