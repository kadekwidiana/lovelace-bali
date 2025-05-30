import { router, usePage } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useGetTransactions() {
    const { transactions, users, filters } = usePage().props;
    const perpage = useRef(transactions.per_page);
    const transactionIdValue = useRef(filters.id);
    const createdByValue = useRef(filters.created_by);
    const transactionDateValue = useRef(filters.date);
    const statusValue = useRef(filters.status);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    };

    const handleFilterByUser = (e) => {
        createdByValue.current = e.target.value;
        getData();
    };

    const handleFilterByStatus = (e) => {
        statusValue.current = e.target.value;
        getData();
    };

    const handleFilterByDate = (e) => {
        transactionDateValue.current = e.target.value;
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
            id: search ?? transactionIdValue.current,
            created_by: createdByValue.current,
            date: transactionDateValue.current,
            status: statusValue.current
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('transactions.index'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    return {
        transactions,
        users,
        perpage,
        transactionIdValue,
        createdByValue,
        transactionDateValue,
        statusValue,
        handleChangePerPage,
        handleFilterByUser,
        handleFilterByStatus,
        handleFilterByDate,
        handleSearch: debouncedHandleSearch,
        isLoading
    };

}
