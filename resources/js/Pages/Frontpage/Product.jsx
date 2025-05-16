import { usePage } from "@inertiajs/react";
import FrontpageLayout from "./_Component/Layout";
import ProductCard from "./_Component/Card/ProductCard";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import useGetProductsFrontpage from "@/Features/Backpage/Products/useGetProductsFrontpage";
import DataLoading from "@/Components/Loading/DataLoading";
import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import { Select, TextInput } from "flowbite-react";

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
    } = useGetProductsFrontpage();

    return (
        <FrontpageLayout>
            <div className="bg-white pt-20">
                <section className="bg-white">
                    <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
                        <h2 className="text-3xl text-start font-semibold text-gray-900 my-4">
                            Produk
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Select
                                defaultValue={searchByCategoryValue}
                                onChange={handleFilterByCategory}
                                id="category"
                                required
                                className="w-full"
                            >
                                <option value="">-- Pilih kategori --</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                            <div className="col-span-1 sm:col-span-2">
                                <TextInput
                                    id="base"
                                    type="search"
                                    placeholder="Cari produk..."
                                    sizing="md"
                                    className="w-full"
                                    defaultValue={searchByNameValue}
                                    onChange={debouncedHandleSearch}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 sm:mt-8 gap-4 sm:gap-6">
                            {!isLoading &&
                                products.data.length > 0 &&
                                products.data.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                        </div>
                        <div className="flex justify-center">
                            {isLoading && <DataLoading />}
                            {products.data.length <= 0 && !isLoading && (
                                <DataNotFoundError />
                            )}
                        </div>
                        <div className="mt-6">
                            {products.data.length > 0 && !isLoading && (
                                <ListDataPagination
                                    data={products}
                                    params={{
                                        name: searchByNameValue || "",
                                        category_id:
                                            searchByCategoryValue || "",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </FrontpageLayout>
    );
}
