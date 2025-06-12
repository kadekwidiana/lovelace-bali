import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import { InputProductModal } from "@/Components/Modal/InputProductModal";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import useDeleteProduct from "@/Features/Products/useDeleteProduct";
import useGetProducts from "@/Features/Products/useGetProducts";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

export default function ProductPage() {
    const {
        products,
        categories,
        searchByNameValue,
        searchByCategoryValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
        handleFilterByCategory,
    } = useGetProducts();

    const { deleteDataConfirm } = useDeleteProduct();

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
                <Select
                    defaultValue={searchByCategoryValue}
                    onChange={handleFilterByCategory}
                    id="category"
                    required
                    className="w-full"
                >
                    <option value="">-- Pilih kategori --</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
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
                <InputProductModal
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
                        <Table.HeadCell>Kategori</Table.HeadCell>
                        <Table.HeadCell>Stok</Table.HeadCell>
                        <Table.HeadCell>Deskripsi</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            products.data.map((product, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                        {(products.current_page - 1) *
                                            products.per_page +
                                            index +
                                            1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {product.code} - {product.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {product.category.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {product.stock}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {product.description}
                                    </Table.Cell>
                                    <Table.Cell className="flex items-center justify-center gap-2">
                                        {/* <button>
                                            <FaInfoCircle className="size-6 text-green-500" />
                                        </button> */}

                                        <InputProductModal
                                            trigger={
                                                <FaInfoCircle className="size-6 text-blue-500" />
                                            }
                                            isUpdate={true}
                                            data={product}
                                        />
                                        <button
                                            onClick={() =>
                                                deleteDataConfirm(product.id)
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
                {products.data.length <= 0 && !isLoading && (
                    <DataNotFoundError />
                )}
            </div>
            {products.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={products}
                    params={{
                        perpage: perpage.current || 10,
                        name: searchByNameValue || "",
                        category_id: searchByCategoryValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
