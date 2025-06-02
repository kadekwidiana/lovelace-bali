import useGetTransactionsCustomer from "@/Features/Transactions/useGetTransactionsCustomer";
import FrontpageLayout from "../../Layouts/FrontpageLayout";
import { Badge, Select, Table, TextInput } from "flowbite-react";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import DataLoading from "@/Components/Loading/DataLoading";
import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import { TRANSACTION_STATUSES } from "@/Constants/transactionConstant";
import { getTransactionStatusColor } from "@/Utils/transactionUtils";
import { Link } from "@inertiajs/react";
import { FaInfoCircle } from "react-icons/fa";

export default function TransactionCsPage() {
    const {
        transactions,
        perpage,
        transactionIdValue,
        transactionDateValue,
        statusValue,
        handleChangePerPage,
        handleFilterByStatus,
        handleFilterByDate,
        handleSearch,
        isLoading,
    } = useGetTransactionsCustomer();

    return (
        <FrontpageLayout>
            <div className="bg-white pt-20 max-w-screen-xl px-4 mx-auto lg:px-6">
                <h2 className="text-3xl text-start font-semibold text-gray-900 my-4">
                    Riwayat Transaksi
                </h2>
                <div className="">
                    <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:gap-2">
                        <Select
                            defaultValue={perpage.current}
                            onChange={handleChangePerPage}
                            id="per-page"
                            required
                            className="min-w-20 max-w-20"
                        >
                            {PER_PAGES.map((perPage) => (
                                <option key={perPage} value={perPage}>
                                    {perPage}
                                </option>
                            ))}
                        </Select>
                        <Select
                            defaultValue={statusValue.current}
                            onChange={handleFilterByStatus}
                            id="per-page"
                            required
                            className="w-full"
                        >
                            <option value="">-- Pilih status --</option>
                            {TRANSACTION_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </Select>
                        <TextInput
                            id="base"
                            type="date"
                            placeholder="Cari data by tanggal..."
                            sizing="md"
                            className="w-full"
                            defaultValue={transactionDateValue.current}
                            onChange={handleFilterByDate}
                        />
                        <TextInput
                            id="base"
                            type="search"
                            placeholder="Cari data by ID..."
                            sizing="md"
                            className="w-full"
                            defaultValue={transactionIdValue.current}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <Table striped>
                            <Table.Head>
                                <Table.HeadCell className="w-5">
                                    #
                                </Table.HeadCell>
                                <Table.HeadCell>Id Transasksi</Table.HeadCell>
                                <Table.HeadCell>Customer</Table.HeadCell>
                                <Table.HeadCell>
                                    Tanggal Transaksi
                                </Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell>Total Amount</Table.HeadCell>
                                <Table.HeadCell className="flex items-center justify-center">
                                    Aksi
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {!isLoading &&
                                    transactions.data.map(
                                        (transaction, index) => (
                                            <Table.Row
                                                key={index}
                                                className="bg-white"
                                            >
                                                <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                                    {(transactions.current_page -
                                                        1) *
                                                        transactions.per_page +
                                                        index +
                                                        1}
                                                </Table.Cell>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                                    {transaction.id}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {transaction.user.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {formatDateToIndonesian(
                                                        transaction.date,
                                                        true
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Badge
                                                        className={`w-fit ${getTransactionStatusColor(
                                                            transaction.status
                                                        )}`}
                                                    >
                                                        {" "}
                                                        {transaction.status}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                        }
                                                    ).format(
                                                        Number(
                                                            transaction.total_amount
                                                        )
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={route(
                                                            "frontpage.customer.transaction-detail",
                                                            transaction.id
                                                        )}
                                                    >
                                                        <FaInfoCircle className="size-6 text-blue-500" />
                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    )}
                            </Table.Body>
                        </Table>
                        {isLoading && <DataLoading />}
                        {transactions.data.length <= 0 && !isLoading && (
                            <DataNotFoundError />
                        )}
                    </div>
                    {transactions.data.length > 0 && !isLoading && (
                        <ListDataPagination
                            data={transactions}
                            params={{
                                perpage: perpage.current || 10,
                                id: transactionIdValue,
                                date: transactionDateValue,
                                status: statusValue,
                            }}
                        />
                    )}
                </div>
            </div>
        </FrontpageLayout>
    );
}
