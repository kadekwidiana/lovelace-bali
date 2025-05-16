import { DetailProductModal } from "@/Components/Modal/DetailProductModal";
import { formatRupiah } from "@/Utils/formatNumber";
import { Card } from "flowbite-react";

export default function ProductCard({ product, isPromo = false }) {
    return (
        <Card className="max-w-sm" imgAlt={product.name} imgSrc={product.image}>
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
                            isPromo ? product.discounted_price : product.price
                        )}
                    </span>
                    <DetailProductModal
                        product={product}
                        trigger={
                            <span className="text-cyan-600 hover:text-cyan-700 underline">
                                Lihat detail
                            </span>
                        }
                        isPromo={isPromo}
                    />
                </div>
            </div>
        </Card>
    );
}
