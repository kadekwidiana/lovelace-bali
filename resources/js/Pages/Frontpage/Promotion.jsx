import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import useGetPromotionsFrontpage from "@/Features/Backpage/Promotions/useGetPromotionsFrontpage";
import { TextInput } from "flowbite-react";
import PromoCard from "./_Component/Card/PromoCard";
import FrontpageLayout from "./_Component/Layout";

export default function PromotionPage() {
    const {
        promotions,
        searchByTitleValue,
        filterByStartDateValue,
        filterByEndDateValue,
        isLoading,
        debouncedHandleSearch,
        handleChangePerPage,
        handleFilterByStartDate,
        handleFilterByEndDate,
    } = useGetPromotionsFrontpage();

    return (
        <FrontpageLayout>
            <div className="bg-white pt-20">
                <section className="bg-white">
                    <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
                        <h2 className="text-3xl text-start font-semibold text-gray-900 my-4">
                            Promo
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex justify-start items-center w-full gap-1">
                                <TextInput
                                    type="date"
                                    defaultValue={filterByStartDateValue}
                                    onChange={handleFilterByStartDate}
                                    className="w-full"
                                />
                                <span className="text-gray-500 text-sm">
                                    Sampai
                                </span>
                                <TextInput
                                    type="date"
                                    defaultValue={filterByEndDateValue}
                                    onChange={handleFilterByEndDate}
                                    className="w-full"
                                />
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <TextInput
                                    id="base"
                                    type="search"
                                    placeholder="Cari promo..."
                                    sizing="md"
                                    className="w-full"
                                    defaultValue={searchByTitleValue}
                                    onChange={debouncedHandleSearch}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 sm:mt-8 gap-4 sm:gap-6">
                            {!isLoading &&
                                promotions.data.length > 0 &&
                                promotions.data.map((promotion) => (
                                    <PromoCard
                                        key={promotion.id}
                                        promotion={promotion}
                                    />
                                ))}
                        </div>
                        <div className="flex justify-center">
                            {isLoading && <DataLoading />}
                            {promotions.data.length <= 0 && !isLoading && (
                                <DataNotFoundError />
                            )}
                        </div>
                        <div className="mt-6">
                            {promotions.data.length > 0 && !isLoading && (
                                <ListDataPagination
                                    data={promotions}
                                    params={{
                                        name: searchByTitleValue || "",
                                        start_date:
                                            filterByStartDateValue || "",
                                        end_date: filterByEndDateValue || "",
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
