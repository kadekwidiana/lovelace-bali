import { Link, usePage } from "@inertiajs/react";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";
import ProductCard from "./_Component/Card/ProductCard";
import PromoCard from "./_Component/Card/PromoCard";
import FrontpageLayout from "./_Component/Layout";
import { paymentStatus } from "@/Constants/appName";
import Swal from "sweetalert2";

export default function HomePage() {
    const { products, promotions } = usePage().props;

    if (paymentStatus === "PENDING") {
        Swal.fire({
            title: "Semangat Skripsinya Boskuu 😅",
            text: "Konsultasi sistem serahkan pada deknos_ dijamin cepat asalkan sesuai! 😊",
            imageUrl:
                "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif", // lucu gif
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: "Oke Siap",
        });
    }

    return (
        <FrontpageLayout>
            <section className="bg-white pt-20">
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
                    <a
                        href="/promotion"
                        className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 hover:bg-gray-200"
                        role="alert"
                    >
                        <span className="text-xs bg-cyan-600 rounded-full text-white px-4 py-1.5 mr-3">
                            Promo
                        </span>{" "}
                        <span className="text-sm font-medium">
                            Nikmati diskon spesial hingga 30%!
                        </span>
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </a>
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                        Elegansi & Keanggunan
                        <br /> dalam Setiap Detail
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-20">
                        Temukan koleksi premium lace fashion dari Bali. Kami
                        memadukan keindahan tradisi dengan sentuhan modern untuk
                        menampilkan pesona Anda yang sesungguhnya.
                    </p>
                    <div className="flex flex-col mb-0 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a
                            href="/product"
                            className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300"
                        >
                            Lihat Produk Kami
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                        <a
                            href="/about"
                            className="inline-flex items-center justify-center px-5 py-2 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
                        >
                            <svg
                                className="w-5 h-5 mr-2 -ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                            </svg>
                            Tentang Kami
                        </a>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="text-gray-500 sm:text-lg">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
                            Keindahan Renda Bali yang Elegan & Berkualitas
                        </h2>
                        <p className="mb-4">
                            Love Lace Bali menghadirkan produk renda eksklusif
                            dengan sentuhan seni dan budaya Bali. Setiap detail
                            renda dirancang dan dibuat dengan penuh ketelitian
                            oleh para pengrajin lokal berpengalaman.
                        </p>
                        <p>
                            Kami percaya bahwa setiap karya memiliki cerita.
                            Temukan keanggunan, keunikan, dan kualitas tinggi
                            dalam setiap produk kami—menggabungkan tradisi,
                            keahlian tangan, dan gaya modern.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img
                            className="w-full rounded-lg"
                            src="/assets/images/home-1.jpg"
                            alt="office content 1"
                        />
                        <img
                            className="w-full mt-4 rounded-lg lg:mt-10"
                            src="/assets/images/home-2.webp"
                            alt="office content 2"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
                    <h2 className="text-3xl text-center font-semibold text-gray-900 my-4">
                        Produk rekomendasi
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 sm:mt-8 gap-4 sm:gap-6">
                        {products.data.length > 0 &&
                            products.data.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </div>
                    <div className="flex justify-center my-4">
                        <Button
                            as={Link}
                            href="/product"
                            outline
                            gradientDuoTone="cyanToBlue"
                        >
                            Lihat semua produk
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>

            <section className="bg-white mt-10">
                <div className="max-w-screen-xl px-4 mx-auto lg:px-6">
                    <h2 className="text-3xl text-center font-semibold text-gray-900 my-4">
                        Promo terbaru
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 sm:mt-8 gap-4 sm:gap-6">
                        {promotions.data.length > 0 &&
                            promotions.data.map((promotion) => (
                                <PromoCard
                                    key={promotion.id}
                                    promotion={promotion}
                                />
                            ))}
                    </div>
                    <div className="flex justify-center my-4">
                        <Button
                            as={Link}
                            href="/promotion"
                            outline
                            gradientDuoTone="cyanToBlue"
                        >
                            Lihat semua promo
                            <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </section>
        </FrontpageLayout>
    );
}
