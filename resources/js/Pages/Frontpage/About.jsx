import FrontpageLayout from "./_Component/Layout";

export default function AboutPage() {
    return (
        <FrontpageLayout>
            <section className="bg-white pt-20">
                <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="text-gray-500 sm:text-lg ">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                            About Love Lace Bali
                        </h2>
                        <p className="mb-4">
                            Love Lace Bali adalah brand fashion yang
                            menggabungkan keanggunan klasik dengan keindahan
                            warisan budaya Bali. Berdiri sejak [tahun], kami
                            berkomitmen untuk menghadirkan produk berkualitas
                            tinggi yang dibuat secara handmade oleh pengrajin
                            lokal, menggunakan material ramah lingkungan.
                        </p>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            Our Story
                        </h2>
                        <p className="mb-4">
                            Berawal dari kecintaan pada detail dan keunikan
                            lace, Love Lace Bali tumbuh dari studio kecil di
                            Bali menjadi brand yang dikenal karena keanggunan
                            dan craftsmanship yang autentik.
                        </p>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            Our Philosophy
                        </h2>
                        <p>Kami percaya pada:</p>
                        <div className="ml-4 mb-4">
                            <ul class="list-disc">
                                <li>
                                    <b>Kualitas & Detail:</b> Setiap produk
                                    dibuat dengan ketelitian tinggi.
                                </li>
                                <li>
                                    <b>Sustainability:</b> Menggunakan bahan
                                    alami & proses produksi beretika.
                                </li>
                                <li>
                                    <b>Empowerment:</b> Memberdayakan pengrajin
                                    lokal Bali.
                                </li>
                            </ul>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            Our Craft
                        </h2>
                        <p className="mb-4">
                            Dari pakaian, aksesoris, hingga custom orders —
                            semua produk kami dirancang timeless, dengan
                            sentuhan lace yang elegan, serta diproses secara
                            handmade oleh para artisan terbaik.
                        </p>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            Why Love Lace Bali?
                        </h2>
                        <div className="ml-4 mb-4">
                            <ul class="list-disc">
                                <li>Handmade Balinese craftsmanship</li>
                                <li>Sustainable & ethical production</li>
                                <li>Elegant, timeless design</li>
                                <li>Personalized service</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
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
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img
                                className="w-full mt-4 rounded-lg lg:mt-10"
                                src="/assets/images/home-2.webp"
                                alt="office content 2"
                            />
                            <img
                                className="w-full rounded-lg"
                                src="/assets/images/home-1.jpg"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </FrontpageLayout>
    );
}
