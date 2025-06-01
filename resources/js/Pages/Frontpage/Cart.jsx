import OrderSummaryCard from "./_Component/Card/OrderSummaryCard";
import FrontpageLayout from "./_Component/Layout";
import ProductCheckoutList from "./_Component/List/ProductCheckoutList";

export default function CartCsPage() {
    return (
        <FrontpageLayout>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 pt-20">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-3xl text-start font-semibold text-gray-900 my-4">
                        Keranjang
                    </h2>

                    <div className="mt-4 gap-4 md:gap-6 grid grid-cols-1 lg:grid-cols-5 lg:items-start xl:gap-8">
                        <ProductCheckoutList />
                        <OrderSummaryCard />
                    </div>
                </div>
            </section>
        </FrontpageLayout>
    );
}
