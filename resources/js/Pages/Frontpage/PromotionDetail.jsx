import { usePage } from "@inertiajs/react";
import FrontpageLayout from "../../Layouts/FrontpageLayout";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import ProductCard from "../../Components/Card/ProductCard";
import DataNotFoundError from "@/Components/Error/DataNotFoundError";
import { IoCopyOutline } from "react-icons/io5";
import { useState } from "react";

export default function PromotionDetailPage() {
    const { promotion } = usePage().props;

    return (
        <FrontpageLayout>
            <section className="bg-white pt-20">
                <div className="items-center max-w-screen-xl gap-16 px-4 pt-8 pb-4 mx-auto lg:grid lg:grid-cols-2 lg:pt-16 lg:px-6">
                    <div className="sm:text-lg h-full flex flex-col items-start">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                            {promotion.title}
                        </h2>
                        <p className="mb-4 text-gray-500">
                            {promotion.description}
                        </p>
                        <PromoCode promoCode={promotion?.promo_code ?? "-"} />
                        <div className="flex flex-col mb-1">
                            <span className="font-semibold">Tanggal</span>
                            <span className="text-gray-500">
                                {formatDateToIndonesian(
                                    promotion.start_date ?? ""
                                )}{" "}
                                -{" "}
                                {formatDateToIndonesian(
                                    promotion.end_date ?? ""
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col mb-1">
                            <span className="font-semibold">Diskon</span>
                            <span className="text-gray-500">
                                {promotion.discount_percentage} %
                            </span>
                        </div>
                    </div>
                    <div className="">
                        <img
                            className="w-full rounded-lg"
                            src={promotion.image}
                            alt={promotion.title}
                        />
                    </div>
                </div>
            </section>
            <section className="bg-white">
                <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
                    <h2 className="text-3xl text-center font-semibold text-gray-900 my-4">
                        Produk promo
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 sm:mt-8 gap-4 sm:gap-6">
                        {promotion.products.length > 0 ? (
                            promotion.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isPromo={true}
                                />
                            ))
                        ) : (
                            <DataNotFoundError />
                        )}
                    </div>
                </div>
            </section>
        </FrontpageLayout>
    );
}

function PromoCode({ promoCode }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(promoCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset "copied" status
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className="flex flex-col mb-1">
            <span className="font-semibold">Kode Promo</span>
            <div className="flex items-center gap-2">
                <span className="text-gray-500">{promoCode ?? "-"}</span>
                {promoCode && (
                    <button
                        onClick={handleCopy}
                        className="text-blue-500 hover:underline text-sm"
                        title="Salin Kode"
                    >
                        <IoCopyOutline className="size-5" />
                    </button>
                )}
            </div>
            {copied && (
                <span className="text-green-500 text-sm mt-1">
                    Kode berhasil disalin!
                </span>
            )}
        </div>
    );
}
