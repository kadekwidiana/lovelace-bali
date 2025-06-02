import { router, usePage } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function useGetTransactionsCustomer() {
    const { transactions, filters } = usePage().props;
    const perpage = useRef(transactions.per_page);
    const transactionIdValue = useRef(filters.id);
    const transactionDateValue = useRef(filters.date);
    const statusValue = useRef(filters.status);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
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
            date: transactionDateValue.current,
            status: statusValue.current
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('frontpage.customer.transactions'),
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
        perpage,
        transactionIdValue,
        transactionDateValue,
        statusValue,
        handleChangePerPage,
        handleFilterByStatus,
        handleFilterByDate,
        handleSearch: debouncedHandleSearch,
        isLoading
    };

}
