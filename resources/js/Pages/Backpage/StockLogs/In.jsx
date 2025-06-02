import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import { InputStockLogModal } from "@/Components/Modal/InputStockLogModal";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import useDeleteStockLog from "@/Features/StockLogs/useDeleteStockLog";
import useGetStockLogs from "@/Features/StockLogs/useGetStockLogs";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

export default function StockLogInPage() {
    const {
        stockLogs,
        searchByNameValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    } = useGetStockLogs();

    const { deleteDataConfirm } = useDeleteStockLog();

    return (
        <BackpageLayout>
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
                <TextInput
                    id="base"
                    type="search"
                    placeholder="Cari data..."
                    sizing="md"
                    className="w-full"
                    defaultValue={searchByNameValue}
                    onChange={debouncedHandleSearch}
                />
                <InputStockLogModal
                    trigger={
                        <Button className="text-nowrap">Tambah Data</Button>
                    }
                    isOut={false}
                />
            </div>
            <div className="mt-4 overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell className="w-5">#</Table.HeadCell>
                        <Table.HeadCell>Produk</Table.HeadCell>
                        <Table.HeadCell>Create By</Table.HeadCell>
                        <Table.HeadCell>Jumlah</Table.HeadCell>
                        <Table.HeadCell>Tanggal</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            stockLogs.data.map((stockLog, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                        {(stockLogs.current_page - 1) *
                                            stockLogs.per_page +
                                            index +
                                            1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {stockLog.product.code} -{" "}
                                        {stockLog.product.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {stockLog.user.name}
                                    </Table.Cell>
                                    <Table.Cell>{stockLog.quantity}</Table.Cell>
                                    <Table.Cell>
                                        {formatDateToIndonesian(
                                            stockLog.date ?? ""
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="flex items-center justify-center gap-2">
                                        {/* <button>
                                            <FaInfoCircle className="size-6 text-green-500" />
                                        </button> */}
                                        <InputStockLogModal
                                            trigger={
                                                <FaInfoCircle className="size-6 text-blue-500" />
                                            }
                                            isOut={false}
                                            isUpdate={true}
                                            data={stockLog}
                                        />
                                        <button
                                            onClick={() =>
                                                deleteDataConfirm(stockLog.id)
                                            }
                                        >
                                            <FaTrash className="size-5 text-red-500" />
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
                {isLoading && <DataLoading />}
                {stockLogs.data.length <= 0 && !isLoading && (
                    <DataNotFoundError />
                )}
            </div>
            {stockLogs.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={stockLogs}
                    params={{
                        perpage: perpage.current || 10,
                        name: searchByNameValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
