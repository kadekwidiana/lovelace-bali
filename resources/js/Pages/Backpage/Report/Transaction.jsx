import FetchError from "@/Components/Error/FetchError";
import SearchSelectInput from "@/Components/Input/SearchSelectInput";
import DataLoading from "@/Components/Loading/DataLoading";
import { TRANSACTION_STATUSES } from "@/Constants/transactionConstant";
import useGetTransationReports from "@/Features/Reports/useGetTransactionReports";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { handleExportExcel } from "@/Utils/exportToExcel";
import { Link, usePage } from "@inertiajs/react";
import { Button, Label, Select, Table, TextInput } from "flowbite-react";

export default function ReportPage() {
    const { users } = usePage().props;

    const { reports, isLoading, error, params, setParams, getReports } =
        useGetTransationReports();

    return (
        <BackpageLayout>
            <div className="flex w-full flex-col items-start justify-start gap-4 md:flex-row md:items-center md:gap-2">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="start_date" value="Tanggal mulai" />
                    </div>
                    <TextInput
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={params.start_date}
                        onChange={(e) =>
                            setParams({ ...params, start_date: e.target.value })
                        }
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="end_date" value="Tanggal selesai" />
                    </div>
                    <TextInput
                        id="end_date"
                        name="end_date"
                        type="date"
                        value={params.end_date}
                        onChange={(e) =>
                            setParams({ ...params, end_date: e.target.value })
                        }
                    />
                </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start mt-2 gap-4 md:flex-row md:items-center md:gap-2">
                <div className="w-auto lg:w-80">
                    <div className="mb-2 block">
                        <Label htmlFor="user_id" value="Customer" />
                    </div>
                    <div className="w-full">
                        <SearchSelectInput
                            entities={users}
                            selectedEntityId={params.user_id}
                            setSelectedEntityId={(id) =>
                                setParams({
                                    ...params,
                                    user_id: id,
                                })
                            }
                            label={"-- Pilih customer --"}
                            placeholder={"Cari customer..."}
                        />
                    </div>
                </div>
                <div className="w-36">
                    <div className="mb-2 block">
                        <Label htmlFor="status" value="Status" />
                    </div>
                    <Select
                        id="status"
                        name="status"
                        value={params.status}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="">-- Pilih status --</option>
                        {TRANSACTION_STATUSES.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-4 mt-4 md:flex-row md:items-center md:gap-2">
                <Button
                    className="text-nowrap"
                    onClick={getReports}
                    disabled={isLoading}
                >
                    Cari
                </Button>
                {!isLoading && reports.length > 0 && (
                    <>
                        <Button
                            className="text-nowrap"
                            color="success"
                            onClick={() =>
                                handleExportExcel(`Laporan Transaksi`, reports)
                            }
                        >
                            Export Excel
                        </Button>
                        {/* <Button className="text-nowrap" color="failure">
                            Export Pdf
                        </Button> */}
                    </>
                )}
                <Link href="transaction-reports">
                    <Button color="failure">Reset</Button>
                </Link>
            </div>
            <div className="mt-4 overflow-x-auto">
                {reports.length > 0 && !isLoading && (
                    <Table striped>
                        <Table.Head>
                            {Object.keys(reports[0]).map((header, index) => (
                                <Table.HeadCell key={index}>
                                    {header}
                                </Table.HeadCell>
                            ))}
                        </Table.Head>

                        <Table.Body className="divide-y">
                            {reports.map((report, rowIndex) => (
                                <Table.Row key={rowIndex} className="bg-white">
                                    {Object.values(report).map(
                                        (value, colIndex) => (
                                            <Table.Cell
                                                key={colIndex}
                                                className="whitespace-nowrap font-medium text-gray-900"
                                            >
                                                {value}
                                            </Table.Cell>
                                        )
                                    )}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
                {isLoading ? <DataLoading /> : <FetchError message={error} />}
            </div>
        </BackpageLayout>
    );
}
