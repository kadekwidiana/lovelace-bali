import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import { InputCategoryModal } from "@/Components/Modal/InputCategoryModal";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import useDeleteCategory from "@/Features/Categories/useDeleteCategory";
import useGetCategories from "@/Features/Categories/useGetCategories";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { FaEdit, FaInfoCircle, FaTrash, FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";

export default function CategoryPage() {
    const {
        categories,
        searchByNameValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    } = useGetCategories();

    const { deleteDataConfirm } = useDeleteCategory();

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
                <InputCategoryModal
                    trigger={
                        <Button
                            color="none"
                            className="bg-primary/80 hover:bg-primary/100 text-white text-nowrap"
                        >
                            Tambah Data
                        </Button>
                    }
                />
            </div>
            <div className="mt-4 overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell className="w-5">#</Table.HeadCell>
                        <Table.HeadCell>Nama</Table.HeadCell>
                        <Table.HeadCell>Deskripsi</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            categories.data.map((category, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                        {(categories.current_page - 1) *
                                            categories.per_page +
                                            index +
                                            1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {category.name}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {category.description}
                                    </Table.Cell>
                                    <Table.Cell className="flex items-center justify-center gap-2">
                                        {/* <button>
                                            <FaInfoCircle className="size-6 text-green-500" />
                                        </button> */}
                                        <InputCategoryModal
                                            trigger={
                                                <FaInfoCircle className="size-6 text-blue-500" />
                                            }
                                            isUpdate={true}
                                            data={category}
                                        />
                                        <button
                                            onClick={() =>
                                                deleteDataConfirm(category.id)
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
                {categories.data.length <= 0 && !isLoading && (
                    <DataNotFoundError />
                )}
            </div>
            {categories.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={categories}
                    params={{
                        perpage: perpage.current || 10,
                        name: searchByNameValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
