import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import { InputRajaOngkirConfigModal } from "@/Components/Modal/InputRajaOngkirConfigModal";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import useDeleteRajaOngkirConfig from "@/Features/RajaOngkirConfigs/useDeleteRajaOngkirConfig";
import useGetRajaOngkirConfigs from "@/Features/RajaOngkirConfigs/useGetRajaOngkirConfigs";
import useSelectedRajaOngkirConfig from "@/Features/RajaOngkirConfigs/useSelectedRajaOngkirConfig";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Button, Select, Table, TextInput } from "flowbite-react";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

export default function RajaOngkirConfigPage() {
    const {
        rajaOngkirConfigs,
        searchByNameValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    } = useGetRajaOngkirConfigs();

    const { deleteDataConfirm } = useDeleteRajaOngkirConfig();

    const { setSelectedConfirm } = useSelectedRajaOngkirConfig();

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
                <InputRajaOngkirConfigModal
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
                        <Table.HeadCell>Api Url</Table.HeadCell>
                        <Table.HeadCell>Api Key</Table.HeadCell>
                        <Table.HeadCell>Deskripsi</Table.HeadCell>
                        <Table.HeadCell>Origin ID Default</Table.HeadCell>
                        <Table.HeadCell>Origin Deskripsi</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            rajaOngkirConfigs.data.map(
                                (rajaOngkirConfig, index) => (
                                    <Table.Row key={index} className="bg-white">
                                        <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                            {(rajaOngkirConfigs.current_page -
                                                1) *
                                                rajaOngkirConfigs.per_page +
                                                index +
                                                1}
                                        </Table.Cell>
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                            {rajaOngkirConfig.api_url}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {rajaOngkirConfig.api_key}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {rajaOngkirConfig.description}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {rajaOngkirConfig.origin_default}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {
                                                rajaOngkirConfig.origin_description
                                            }
                                        </Table.Cell>
                                        <Table.Cell className="flex items-center justify-center gap-2">
                                            {/* <button>
                                            <FaInfoCircle className="size-6 text-green-500" />
                                        </button> */}
                                            <Button
                                                size="xs"
                                                color="success"
                                                className="text-nowrap"
                                                onClick={() =>
                                                    setSelectedConfirm(
                                                        rajaOngkirConfig.id
                                                    )
                                                }
                                                disabled={
                                                    rajaOngkirConfig.is_select
                                                }
                                            >
                                                Pilih Config
                                            </Button>
                                            <InputRajaOngkirConfigModal
                                                trigger={
                                                    <FaInfoCircle className="size-6 text-blue-500" />
                                                }
                                                isUpdate={true}
                                                data={rajaOngkirConfig}
                                            />
                                            <button
                                                onClick={() =>
                                                    deleteDataConfirm(
                                                        rajaOngkirConfig.id
                                                    )
                                                }
                                            >
                                                <FaTrash className="size-5 text-red-500" />
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            )}
                    </Table.Body>
                </Table>
                {isLoading && <DataLoading />}
                {rajaOngkirConfigs.data.length <= 0 && !isLoading && (
                    <DataNotFoundError />
                )}
            </div>
            {rajaOngkirConfigs.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={rajaOngkirConfigs}
                    params={{
                        perpage: perpage.current || 10,
                        name: searchByNameValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
