import { DetailProductModal } from "@/Components/Modal/DetailProductModal";
import { useDeleteCart } from "@/Features/Carts/useDeleteCart";
import { useUpdateCart } from "@/Features/Carts/useUpdateCart";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { formatRupiah } from "@/Utils/formatNumber";
import { Button, Checkbox } from "flowbite-react";

export default function ProductCheckoutCard({ item }) {
    const { deleteDataConfirm } = useDeleteCart();
    const { handleUpdateCart, isLoading } = useUpdateCart(item);

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 flex justify-start gap-4">
            <div className="flex flex-col justify-center">
                <Checkbox
                    className="h-5 w-5 outline-none focus:outline-none focus:ring-0"
                    checked={item.is_select}
                    onClick={() =>
                        handleUpdateCart({
                            is_select: !item.is_select,
                        })
                    }
                />
            </div>
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 w-full">
                <img
                    className="h-28 w-28 rounded-sm"
                    src={
                        item.product.image ??
                        "/assets/images/default-product.png"
                    }
                    alt={item.product.name}
                />
                <div className="flex items-center justify-start md:order-3 gap-2 md:justify-end">
                    <div className="flex items-center">
                        <Button
                            color="gray"
                            size="xs"
                            onClick={() =>
                                handleUpdateCart({
                                    quantity: item.quantity - 1,
                                })
                            }
                            disabled={item.quantity <= 1 || isLoading}
                        >
                            <svg
                                className="h-2.5 w-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 1h16"
                                />
                            </svg>
                        </Button>
                        <input
                            type="text"
                            id="counter-input"
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                            placeholder=""
                            value={item.quantity}
                            readOnly
                        />
                        <Button
                            color="gray"
                            size="xs"
                            onClick={() =>
                                handleUpdateCart({
                                    user_id: item.user_id,
                                    product_id: item.product_id,
                                    quantity: item.quantity + 1,
                                })
                            }
                            disabled={
                                item.quantity >= item.product.stock || isLoading
                            }
                        >
                            <svg
                                className="h-2.5 w-2.5 text-gray-900"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 1v16M1 9h16"
                                />
                            </svg>
                        </Button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">
                            {formatRupiah(item.product.price * item.quantity)}
                        </p>
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                    <DetailProductModal
                        product={item.product}
                        trigger={
                            <span className="text-base font-medium text-gray-900 hover:underline cursor-pointer">
                                {item.product.name}
                            </span>
                        }
                    />
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-light text-gray-700">
                            Ukuran: {item.product.size} Warna:{" "}
                            {item.product.color}
                        </span>
                        <span className="text-xs font-light text-gray-600">
                            Updated:{" "}
                            {formatDateToIndonesian(item.updated_at, true)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                            onClick={() => deleteDataConfirm(item.id)}
                        >
                            <svg
                                className="me-1.5 h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
