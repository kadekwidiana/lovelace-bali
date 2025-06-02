import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import DataLoading from "@/Components/Loading/DataLoading";
import ListDataPagination from "@/Components/Pagination/ListDataPagination";
import { PER_PAGES } from "@/Constants/dataSelect";
import useDeleteContact from "@/Features/Contacts/useDeleteContact";
import useGetContacts from "@/Features/Contacts/useGetContacts";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Select, Table, TextInput } from "flowbite-react";
import { FaTrash } from "react-icons/fa";

export default function ContactPage() {
    const {
        contacts,
        searchByNameValue,
        isLoading,
        perpage,
        debouncedHandleSearch,
        handleChangePerPage,
    } = useGetContacts();

    const { deleteDataConfirm } = useDeleteContact();

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
            </div>
            <div className="mt-4 overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell className="w-5">#</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Telepon</Table.HeadCell>
                        <Table.HeadCell>Nama</Table.HeadCell>
                        <Table.HeadCell>Pesan</Table.HeadCell>
                        <Table.HeadCell className="flex items-center justify-center">
                            Aksi
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {!isLoading &&
                            contacts.data.map((contact, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="w-5 whitespace-nowrap font-medium text-gray-900">
                                        {(contacts.current_page - 1) *
                                            contacts.per_page +
                                            index +
                                            1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {contact.email}
                                    </Table.Cell>
                                    <Table.Cell>{contact.phone}</Table.Cell>
                                    <Table.Cell>{contact.name}</Table.Cell>
                                    <Table.Cell>{contact.message}</Table.Cell>
                                    <Table.Cell className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                deleteDataConfirm(contact.id)
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
                {contacts.data.length <= 0 && !isLoading && (
                    <DataNotFoundError />
                )}
            </div>
            {contacts.data.length > 0 && !isLoading && (
                <ListDataPagination
                    data={contacts}
                    params={{
                        perpage: perpage.current || 10,
                        name: searchByNameValue || "",
                    }}
                />
            )}
        </BackpageLayout>
    );
}
