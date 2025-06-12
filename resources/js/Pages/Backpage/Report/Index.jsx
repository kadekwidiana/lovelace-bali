import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import FetchError from "@/Components/Error/FetchError";
import SearchSelectInput from "@/Components/Input/SearchSelectInput";
import DataLoading from "@/Components/Loading/DataLoading";
import useGetReports from "@/Features/Reports/useGetReports";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { handleExportExcel } from "@/Utils/exportToExcel";
import { Link, usePage } from "@inertiajs/react";
import { Button, Label, Select, Table, TextInput } from "flowbite-react";

export default function ReportPage() {
    const { products } = usePage().props;

    const { reports, isLoading, error, params, setParams, getReports } =
        useGetReports();

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
                        <Label htmlFor="product_id" value="Produk" />
                    </div>
                    <div className="w-full">
                        <SearchSelectInput
                            entities={products}
                            otherEntity={"code"}
                            selectedEntityId={params.product_id}
                            setSelectedEntityId={(id) =>
                                setParams({
                                    ...params,
                                    product_id: id,
                                })
                            }
                            label={"-- Pilih produk --"}
                            placeholder={"Cari produk..."}
                        />
                    </div>
                </div>
                <div className="w-36">
                    <div className="mb-2 block">
                        <Label htmlFor="report_type" value="Jenis" />
                    </div>
                    <Select
                        id="report_type"
                        name="report_type"
                        value={params.type_report}
                        onChange={(e) =>
                            setParams({
                                ...params,
                                type_report: e.target.value,
                            })
                        }
                    >
                        <option value="">-- Pilih jenis --</option>
                        <option value="IN">Produk Masuk</option>
                        <option value="OUT">Produk Keluar</option>
                    </Select>
                </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-4 mt-4 md:flex-row md:items-center md:gap-2">
                <Button
                    onClick={getReports}
                    disabled={isLoading}
                    color="none"
                    className="bg-primary/80 hover:bg-primary/100 text-white text-nowrap"
                >
                    Cari
                </Button>
                {!isLoading && reports.length > 0 && (
                    <>
                        <Button
                            className="text-nowrap"
                            color="success"
                            onClick={() =>
                                handleExportExcel(`Laporan Stok`, reports)
                            }
                        >
                            Export Excel
                        </Button>
                        {/* <Button className="text-nowrap" color="failure">
                            Export Pdf
                        </Button> */}
                    </>
                )}
                <Link href="reports">
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
