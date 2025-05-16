import { router, usePage } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useGetProducts() {
    const { products, categories, searchByNameValue, searchByCategoryValue } = usePage().props;
    const perpage = useRef(products.per_page);
    const category = useRef(products.category_id);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    };

    const handleFilterByCategory = (e) => {
        category.current = e.target.value;
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
            name: search ?? searchByNameValue,
            category_id: category.current ?? searchByCategoryValue
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('products.index'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return {
        products,
        categories,
        searchByNameValue,
        searchByCategoryValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
        handleFilterByCategory
    };

}
