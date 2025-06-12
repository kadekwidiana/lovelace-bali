import { DetailProductModal } from "@/Components/Modal/DetailProductModal";
import { useAddToCart } from "@/Features/Carts/useAddToCart";
import { formatRupiah } from "@/Utils/formatNumber";
import { usePage } from "@inertiajs/react";
import { Button, Card } from "flowbite-react";
import { FaInfoCircle } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";

export default function ProductCard({ product, isPromo = false }) {
    const { auth } = usePage().props;
    const { handleAddToCart, isLoading } = useAddToCart();

    return (
        <Card
            className="max-w-sm"
            imgAlt={product.name}
            imgSrc={product.image ?? "/assets/images/default-product.png"}
        >
            <div className="h-full flex flex-col justify-end gap-2">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {product.name}
                </h5>

                <div className="flex justify-between items-center">
                    <div className="px-2 text-sm py-1 text-gray-800 rounded-full border border-gray-400">
                        <span>{product.category.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                        {product.stock} tersedia
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    {isPromo && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatRupiah(product.original_price)}
                        </span>
                    )}
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                            {formatRupiah(
                                isPromo
                                    ? product.discounted_price
                                    : product.price
                            )}
                        </span>
                        <div className="flex items-center justify-end gap-2">
                            <DetailProductModal
                                product={product}
                                trigger={
                                    <FaInfoCircle className="size-6 text-blue-500" />
                                }
                                isPromo={isPromo}
                            />
                            {!isPromo &&
                                (auth.user ? (
                                    auth.user.role === "CUSTOMER" && (
                                        <Button
                                            size="xs"
                                            onClick={() =>
                                                handleAddToCart({
                                                    user_id: auth.user.id,
                                                    product_id: product.id,
                                                    quantity: 1,
                                                })
                                            }
                                            disabled={
                                                product.stock === 0 || isLoading
                                            }
                                            color="none"
                                            className="bg-primary/80 hover:bg-primary/100 text-white"
                                        >
                                            <HiShoppingCart className="size-4" />
                                        </Button>
                                    )
                                ) : (
                                    <a href="/login">
                                        <Button
                                            size="xs"
                                            disabled={
                                                product.stock === 0 || isLoading
                                            }
                                            color="none"
                                            className="bg-primary/80 hover:bg-primary/100 text-white"
                                        >
                                            <HiShoppingCart className="size-4" />
                                        </Button>
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
