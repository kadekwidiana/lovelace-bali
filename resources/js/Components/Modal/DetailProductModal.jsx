import { useAddToCart } from "@/Features/Frontpage/Carts/useAddToCart";
import { formatRupiah } from "@/Utils/formatNumber";
import { usePage } from "@inertiajs/react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiShoppingCart } from "react-icons/hi";

export function DetailProductModal({ trigger, product, isPromo = false }) {
    const { auth } = usePage().props;

    const [openModal, setOpenModal] = useState(false);
    const { handleAddToCart } = useAddToCart();

    return (
        <>
            <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
                {trigger}
            </div>
            <Modal
                show={openModal}
                size="6xl"
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>
                    Detail Produk {product.name} ({product.code})
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <img
                            src={
                                product.image ??
                                "/assets/images/default-product.png"
                            }
                            alt={product.name}
                            className="w-full rounded-md"
                        />
                        <div>
                            <div className="flex flex-col mb-1">
                                <span className="font-semibold">
                                    Deskripsi:
                                </span>
                                <span>{product.description}</span>
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="font-semibold">Kategori:</span>
                                <span>{product.category.name}</span>
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="font-semibold">Harga:</span>
                                {isPromo ? (
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500 line-through">
                                            {formatRupiah(
                                                product.original_price
                                            )}
                                        </span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {formatRupiah(
                                                product.discounted_price
                                            )}
                                        </span>
                                    </div>
                                ) : (
                                    <span>{formatRupiah(product.price)}</span>
                                )}
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="font-semibold">Stok:</span>
                                <span>{product.stock}</span>
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="font-semibold">Ukuran:</span>
                                <span>{product.size}</span>
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="font-semibold">Warna:</span>
                                <span>{product.color}</span>
                            </div>
                            {!isPromo && (
                                <div className="flex flex-col mb-1 mt-2">
                                    <span className="font-semibold">Aksi:</span>
                                    <Button
                                        size="xs"
                                        className="w-fit"
                                        onClick={() =>
                                            handleAddToCart({
                                                user_id: auth.user.id,
                                                product_id: product.id,
                                                quantity: 1,
                                            })
                                        }
                                        disabled={product.stock === 0}
                                    >
                                        <HiShoppingCart className="size-4 mr-1" />
                                        Tambahkan ke keranjang
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
