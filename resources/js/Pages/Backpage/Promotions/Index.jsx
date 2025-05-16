import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import { InputPromotionModal } from "@/Components/Modal/InputPromotionModal";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import useDeletePromotion from "@/Features/Backpage/Promotions/useDeletePromotion";
import useGetPromotions from "@/Features/Backpage/Promotions/useGetPromotions";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

export default function PromotionPage() {
    const {
        promotions,
        searchByTitleValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    } = useGetPromotions();

    const { deleteDataConfirm } = useDeletePromotion();

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
                    defaultValue={searchByTitleValue}
                    onChange={debouncedHandleSearch}
                />
                <InputPromotionModal
                    trigger={
                        <Button className="text-nowrap">Tambah Data</Button>
                    }
                />
            </div>
            <div className="mt-4 overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell className="w-5">#</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Deskripsi</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            promotions.data.map((promotion, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                        {(promotions.current_page - 1) *
                                            promotions.per_page +
                                            index +
                                            1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {promotion.title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {promotion.description}
                                    </Table.Cell>
                                    <Table.Cell className="flex items-center justify-center gap-2">
                                        {/* <button>
                                            <FaInfoCircle className="size-6 text-green-500" />
                                        </button> */}
                                        <InputPromotionModal
                                            trigger={
                                                <FaInfoCircle className="size-6 text-blue-500" />
                                            }
                                            isUpdate={true}
                                            data={promotion}
                                        />
                                        <button
                                            onClick={() =>
                                                deleteDataConfirm(promotion.id)
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
                {promotions.data.length <= 0 && !isLoading && (
                    <DataNotFoundError />
                )}
            </div>
            {promotions.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={promotions}
                    params={{
                        perpage: perpage.current || 10,
                        title: searchByTitleValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
