import { InputPrepareOrderModal } from "@/Components/Modal/InputPrepareOrderModal";
import { InputProductModal } from "@/Components/Modal/InputProductModal";
import { BASE_URL_MIDTRANS } from "@/Constants/transactionConstant";
import useCancelOrder from "@/Features/Backpage/Transactions/useCanceledOrder";
import useDeliveredOrder from "@/Features/Backpage/Transactions/useDeliveredOrder";
import useProcessOrder from "@/Features/Backpage/Transactions/useProcessOrder";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { getTransactionStatusColor } from "@/Utils/transactionUtils";
import { Link, usePage } from "@inertiajs/react";
import { Badge, Button } from "flowbite-react";
import { FaInfoCircle } from "react-icons/fa";

export default function TransactionDetailPage() {
    const { transaction } = usePage().props;
    const { processOrderConfirm } = useProcessOrder();
    const { deliveredOrderConfirm } = useDeliveredOrder();
    const { canceledOrderConfirm } = useCancelOrder();

    return (
        <BackpageLayout>
            <div>
                <Link href={`/transactions`}>
                    <Button color="gray" size="xs">
                        Kembali
                    </Button>
                </Link>
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-700 rtl:text-right">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2 text-lg font-bold">
                                        Transaksi
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Id Transaksi
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {transaction.id}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Tanggal Transaksi
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {formatDateToIndonesian(
                                            transaction.date,
                                            true
                                        )}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Total Amount
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(
                                            Number(transaction.total_amount)
                                        )}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">Status</td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        <Badge
                                            className={`text-sm w-fit ${getTransactionStatusColor(
                                                transaction.status
                                            )}`}
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Link Payment
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        <a
                                            href={`${BASE_URL_MIDTRANS}/snap/v3/redirection/${transaction.snap_token_midtrans}`}
                                            target="_blank"
                                            className="text-blue-500 underline hover:font-semibold"
                                        >
                                            Link to Payment
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Nomor Pengiriman
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2 flex items-center gap-2">
                                        {transaction.receipt_number ?? "-"}
                                        {transaction.status === "SHIPPED" && (
                                            <InputPrepareOrderModal
                                                trigger={
                                                    <Button
                                                        color="blue"
                                                        size="xs"
                                                    >
                                                        Edit
                                                    </Button>
                                                }
                                                transaction={transaction}
                                                isUpdateReceiptNumber={true}
                                            />
                                        )}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">Catatan</td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {transaction.note ?? "-"}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Tanggal Dibuat
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {formatDateToIndonesian(
                                            transaction.created_at,
                                            true
                                        )}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Tanggal Diupdate
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {formatDateToIndonesian(
                                            transaction.updated_at,
                                            true
                                        )}
                                    </td>
                                </tr>
                                {transaction.status !== "DELIVERED" &&
                                    transaction.status !== "CANCELLED" && (
                                        <tr className="bg-white">
                                            <td className="w-1/5 py-2 pr-2">
                                                Aksi
                                            </td>
                                            <td className="w-3 px-2 py-2">:</td>
                                            <td className="w-full px-2 py-2 flex items-center gap-2">
                                                {transaction.status ===
                                                    "PAID" && (
                                                    <Button
                                                        color="purple"
                                                        size="xs"
                                                        onClick={() =>
                                                            processOrderConfirm(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Proses Pesanan
                                                    </Button>
                                                )}
                                                {transaction.status ===
                                                    "PROCESSING" && (
                                                    <InputPrepareOrderModal
                                                        trigger={
                                                            <Button
                                                                color="info"
                                                                size="xs"
                                                            >
                                                                Siapkan Pesanan
                                                            </Button>
                                                        }
                                                        transaction={
                                                            transaction
                                                        }
                                                    />
                                                )}
                                                {transaction.status ===
                                                    "SHIPPED" && (
                                                    <Button
                                                        color="success"
                                                        size="xs"
                                                        onClick={() =>
                                                            deliveredOrderConfirm(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Pesanan Diterima
                                                    </Button>
                                                )}
                                                {transaction.status ===
                                                    "PENDING" && (
                                                    <Button
                                                        color="failure"
                                                        size="xs"
                                                        onClick={() =>
                                                            canceledOrderConfirm(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Batalkan Pesanan
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                <tr className="bg-white">
                                    <td
                                        colSpan={3}
                                        className="flex w-1/5 items-center justify-start gap-2 py-2 pt-6 pr-2 text-lg font-bold"
                                    >
                                        <span>Customer</span>
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">Nama</td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {transaction.user?.name}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">Email</td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {transaction.user?.email}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">
                                        Nomor Telepon
                                    </td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {transaction.user?.customer
                                            ?.phone_number ?? "-"}
                                    </td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2">Alamat</td>
                                    <td className="w-3 px-2 py-2">:</td>
                                    <td className="w-full px-2 py-2">
                                        {transaction.user?.customer?.address ??
                                            "-"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-700 rtl:text-right">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="w-1/5 py-2 pr-2 text-lg font-bold">
                                        Items
                                    </td>
                                </tr>
                                {transaction.details.map((item) => (
                                    <tbody key={item.id}>
                                        <tr key={item.id} className="bg-white">
                                            <td
                                                colSpan={3}
                                                className="w-full py-2 pr-2 font-bold"
                                            >
                                                <div className="flex items-center justify-start gap-2">
                                                    <span>
                                                        {item.product.name}
                                                    </span>
                                                    <InputProductModal
                                                        trigger={
                                                            <FaInfoCircle className="size-6 text-blue-500" />
                                                        }
                                                        isUpdate={true}
                                                        data={item.product}
                                                        isReadOnly={true}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="w-1/5 py-2 pr-2">
                                                Harga
                                            </td>
                                            <td className="w-3 px-2 py-2">:</td>
                                            <td className="w-full px-2 py-2">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(
                                                    Number(item.price_at_time)
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="w-1/5 py-2 pr-2">
                                                Jumlah
                                            </td>
                                            <td className="w-3 px-2 py-2">:</td>
                                            <td className="w-full px-2 py-2">
                                                {item.quantity}
                                            </td>
                                        </tr>
                                        <tr className="bg-white">
                                            <td className="w-1/5 py-2 pr-2">
                                                Subtotal
                                            </td>
                                            <td className="w-3 px-2 py-2">:</td>
                                            <td className="w-full px-2 py-2">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }
                                                ).format(Number(item.subtotal))}
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BackpageLayout>
    );
}
