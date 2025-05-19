import UpdatePasswordForm from "../Backpage/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "../Backpage/Profile/Partials/UpdateProfileInformationForm";
import FrontpageLayout from "./_Component/Layout";

export default function ProductCsPage({ mustVerifyEmail, status }) {
    return (
        <FrontpageLayout>
            <div className="bg-white pt-20 max-w-screen-xl px-4 mx-auto lg:px-6">
                <h2 className="text-3xl text-start font-semibold text-gray-900 my-4">
                    Profile
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="border-stroke shadow-default rounded-sm border bg-white p-4">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className=""
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="border-stroke shadow-default rounded-sm border bg-white p-4">
                            <UpdatePasswordForm className="" />
                        </div>
                    </div>
                </div>
            </div>
        </FrontpageLayout>
    );
}
