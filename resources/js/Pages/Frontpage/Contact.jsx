import useInputContact from "@/Features/Backpage/Contacts/useInputContact";
import FrontpageLayout from "./_Component/Layout";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";

export default function ContactPage() {
    const { formData, isSubmitting, errors, handleChange, handleSubmit } =
        useInputContact();

    return (
        <FrontpageLayout>
            <section className="bg-white pt-28 mb-20">
                <h2 className="text-3xl text-start font-semibold text-gray-900 mb-4 max-w-screen-xl px-4 mx-auto lg:px-6">
                    Kontak Kami
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-screen-xl px-4 mx-auto lg:px-6">
                    <div className="flex flex-col gap-2 mb-24 sm:mb-0">
                        <div className="flex flex-col">
                            <span className="font-semibold">Alamat</span>
                            <span className="text-gray-500">
                                Jl. Raya Sayan, Kutuh, Kecamatan Ubud, Kabupaten
                                Gianyar, Bali 80571
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Email</span>
                            <span className="text-gray-500">
                                lovelacebali@gmail.com
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Telepon</span>
                            <span className="text-gray-500">081-2345-6789</span>
                        </div>
                        <div className="w-full h-44 rounded-md">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.982978700535!2d115.24442470000001!3d-8.5010329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d55eac3759b%3A0xa92e8a009113d81c!2sLoveLace%20Bali!5e0!3m2!1sid!2sid!4v1742663224309!5m2!1sid!2sid"
                                width="350"
                                height="250"
                                style={{
                                    border: 0,
                                    borderRadius: "5px",
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="email"
                                        value="Email"
                                        color={
                                            errors.email ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Masukan email..."
                                    color={errors.email ? "failure" : "gray"}
                                    helperText={errors.email}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="phone"
                                        value="Nomor Telepon"
                                        color={
                                            errors.phone ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Masukan nomor telepon..."
                                    color={errors.phone ? "failure" : "gray"}
                                    helperText={errors.phone}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Nama lengkap"
                                    color={errors.name ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Masukan nama lengkap anda..."
                                color={errors.name ? "failure" : "gray"}
                                helperText={errors.name}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="message"
                                    value="Pesan"
                                    color={errors.message ? "failure" : "gray"}
                                />
                            </div>
                            <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Masukan pesan..."
                                rows={4}
                                color={errors.message ? "failure" : "gray"}
                                helperText={errors.message}
                            />
                        </div>
                        <Button type="submit" className="w-fit">
                            Kirim
                        </Button>
                    </form>
                </div>
            </section>
        </FrontpageLayout>
    );
}
