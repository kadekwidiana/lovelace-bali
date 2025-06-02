import { router, usePage } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useGetPromotions() {
    const { promotions, searchByTitleValue } = usePage().props;
    const perpage = useRef(promotions.per_page);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
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
            perpage: perpage.current,
            title: search ?? searchByTitleValue,
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('promotions.index'),
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
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    };

}
