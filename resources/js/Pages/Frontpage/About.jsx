import FrontpageLayout from "../../Layouts/FrontpageLayout";

export default function AboutPage() {
    return (
        <FrontpageLayout>
            <section className="bg-white pt-20">
                <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="text-gray-500 sm:text-lg ">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                            Tentang Love Lace Bali
                        </h2>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            Ringkasan Perusahaan
                        </h2>
                        <p className="mb-4">
                            LoveLace adalah merek asal Belarus yang didirikan
                            tujuh tahun lalu dan dibangun dengan penuh semangat
                            oleh pendiri kami, Karina Kudzina. Misi merek dan
                            perusahaan kami adalah menciptakan lingerie yang
                            mengesankan wanita dan memberikan mereka kebebasan
                            untuk mengeksplorasi diri melalui kampanye cinta
                            diri (self-love) kami.
                        </p>
                        <p className="mb-4">
                            Dengan kesuksesan kami di Eropa Timur, kami percaya
                            diri untuk memperluas pasar ke Asia, Australia, dan
                            Amerika Serikat. Kami terus menciptakan koleksi baru
                            (tiga koleksi per tahun), sehingga selalu ada hal
                            baru dan menarik bagi pelanggan dan mitra kami untuk
                            dipilih.
                        </p>
                        <p className="mb-4">
                            Karena Bali merupakan gerbang ke pasar dunia melalui
                            aktivitas pariwisata, kami sangat percaya diri untuk
                            membuka butik baru kami di Bali. Dengan konsep yang
                            sama seperti butik kami di Belarus — menarik,
                            menyenangkan, nyaman, dan tentunya Instagramable.
                        </p>
                        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                            Siapa Kami? Apa yang Kami Lakukan?
                        </h2>
                        <p className="mb-4">
                            Kami percaya bahwa setiap wanita layak untuk merasa
                            cantik, unik, dan kuat. Kami menciptakan lingerie
                            yang membangkitkan emosi dan memungkinkan Anda untuk
                            merangkul level baru dari seksualitas batin.
                        </p>
                        <p className="mb-4">
                            LoveLace bukanlah merek biasa; kami membawa motivasi
                            dan cara baru untuk membantu semua perempuan di
                            dunia meraih rasa cinta dan kepercayaan diri
                            terhadap diri sendiri.
                        </p>
                        <p className="mb-4">
                            Kami bekerja sama dengan mitra di seluruh Eropa
                            Barat dan Timur. Fasilitas produksi utama kami
                            terletak di Belarus, di mana kami menjamin kualitas
                            yang konsisten dan mempertahankan standar tinggi
                            untuk setiap produk. Kami hanya menggunakan bahan
                            terbaik dari Eropa. Tim pengendali kualitas kami
                            hadir di setiap tahap siklus produksi.
                        </p>
                        <p className="mb-4">
                            Kami juga memiliki semua sertifikasi yang diperlukan
                            untuk mendistribusikan produk luar biasa kami ke
                            seluruh dunia.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img
                                className="w-full rounded-lg"
                                src="/assets/images/about-1.jpg"
                                alt="office content 1"
                            />
                            <img
                                className="w-full mt-4 rounded-lg lg:mt-10"
                                src="/assets/images/about-2.jpg"
                                alt="office content 2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img
                                className="w-full mt-4 rounded-lg lg:mt-10"
                                src="/assets/images/about-2.jpg"
                                alt="office content 2"
                            />
                            <img
                                className="w-full rounded-lg"
                                src="/assets/images/about-3.jpg"
                                alt="office content 1"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </FrontpageLayout>
    );
}
