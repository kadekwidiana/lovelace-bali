import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import SearchDestinationInput from "../Input/SearchDestinationInput";
import { usePage } from "@inertiajs/react";

export default function ShipmentForm({
    className = "",
    data,
    setData,
    errors,
    handleChange,
    handleCheckCost,
    checkCostIsLoading,
    setCheckCostResponse,
}) {
    const { auth } = usePage().props;

    return (
        <section className={className}>
            <header>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Informasi Pengiriman
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    Pastikan data pengiriman sudah benar.
                </p>
            </header>

            <form
                className="mt-4 space-y-2 w-full"
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="recipient_name"
                                value="Nama Penerima*"
                            />
                        </div>
                        <TextInput
                            id="recipient_name"
                            name="recipient_name"
                            type="text"
                            placeholder="Masukan nama..."
                            required
                            value={data.recipient_name}
                            // isFocused={true}
                            color={errors.recipient_name ? "failure" : "gray"}
                            onChange={handleChange}
                            helperText={errors.recipient_name}
                        />
                    </div>
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="phone_number"
                                value="Nomor Telepon Penerima*"
                                color={errors.phone_number ? "failure" : "gray"}
                            />
                        </div>
                        <TextInput
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            placeholder="Masukan nomor telepon..."
                            required
                            value={data.phone_number}
                            // isFocused={true}
                            color={errors.phone_number ? "failure" : "gray"}
                            onChange={handleChange}
                            helperText={errors.phone_number}
                        />
                    </div>
                </div>

                {/*  raja ongkir yang lama tidak ada api key nya, jadi ubah ke yang baru (e-komerce) */}
                {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="province_code"
                                value="Provinsi*"
                                color={
                                    errors.province_code ? "failure" : "gray"
                                }
                            />
                        </div>
                        <Select
                            value={provinceId ?? ""}
                            onChange={(e) => {
                                const selected = e.target.value || null;
                                setProvinceId(selected);
                                setCityId(null); // reset city
                                setData("province_code", selected);
                                setData(
                                    "province_name",
                                    provinces?.data.data.rajaongkir.results.find(
                                        (prov) => prov.province_id === selected
                                    ).province
                                );
                                setData("city_code", null);
                                setData("city_name", null);
                            }}
                            color={errors.province_code ? "failure" : "gray"}
                            helperText={errors.province_code}
                            disabled={provinceIsLoading}
                        >
                            <option value="">-- Pilih provinsi --</option>
                            {!provinceIsLoading &&
                                provinces?.data.data.rajaongkir.results.map(
                                    (prov) => (
                                        <option
                                            key={prov.province_id}
                                            value={prov.province_id}
                                        >
                                            {prov.province}
                                        </option>
                                    )
                                )}
                        </Select>
                    </div>

                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="city_code"
                                value="Kota*"
                                color={errors.city_code ? "failure" : "gray"}
                            />
                        </div>
                        <Select
                            value={cityId ?? ""}
                            onChange={(e) => {
                                setCityId(e.target.value || null);
                                setData("city_code", e.target.value || null);
                                setData(
                                    "city_name",
                                    cities?.data.data.rajaongkir.results.find(
                                        (city) =>
                                            city.city_id === e.target.value
                                    ).city_name
                                );
                            }}
                            color={errors.city_code ? "failure" : "gray"}
                            helperText={errors.city_code}
                            disabled={
                                !provinceId || cityIsLoading || cityIsFetching
                            }
                        >
                            <option value="">-- Pilih kota --</option>
                            {!cityIsLoading &&
                                cities?.data.data.rajaongkir.results.map(
                                    (city) => (
                                        <option
                                            key={city.city_id}
                                            value={city.city_id}
                                        >
                                            {city.type} {city.city_name}
                                        </option>
                                    )
                                )}
                        </Select>
                    </div>
                </div> */}

                {/* <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="sub_district"
                                value="Kecamatan*"
                                color={errors.sub_district ? "failure" : "gray"}
                            />
                        </div>
                        <TextInput
                            id="sub_district"
                            name="sub_district"
                            type="text"
                            placeholder="Masukan kecamatan..."
                            required
                            value={data.sub_district}
                            // isFocused={true}
                            color={errors.sub_district ? "failure" : "gray"}
                            onChange={handleChange}
                            helperText={errors.sub_district}
                        />
                    </div>

                    <div className="">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="village"
                                value="Desa/Kelurahan*"
                                color={errors.village ? "failure" : "gray"}
                            />
                        </div>
                        <TextInput
                            id="village"
                            name="village"
                            type="text"
                            placeholder="Masukan desa/kelurahan..."
                            required
                            value={data.village}
                            // isFocused={true}
                            color={errors.village ? "failure" : "gray"}
                            onChange={handleChange}
                            helperText={errors.village}
                        />
                    </div>
                </div> */}

                <SearchDestinationInput
                    setData={setData}
                    setCheckCostResponse={setCheckCostResponse}
                />

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="address"
                                value="Alamat Lengkap*"
                                color={errors.address ? "failure" : "gray"}
                            />
                        </div>
                        <Textarea
                            rows={2}
                            id="address"
                            name="address"
                            placeholder="Masukan deskripsi..."
                            value={data.address}
                            onChange={handleChange}
                            color={errors.address ? "failure" : "gray"}
                            helperText={errors.address}
                        />
                    </div>
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="city_code"
                                value="Jasa Pengiriman*"
                                color={errors.city_code ? "failure" : "gray"}
                            />
                        </div>
                        <Select
                            id="courier"
                            name="courier"
                            defaultValue={data.courier}
                            onChange={handleChange}
                        >
                            <option value="">
                                -- Pilih jasa pengiriman --
                            </option>
                            <option value="jne">JNE</option>
                            <option value="jnt">JNT</option>
                            <option value="sicepat">SICEPAT</option>
                            <option value="ninja">NINJA</option>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <Button
                        size="sm"
                        onClick={handleCheckCost}
                        disabled={
                            checkCostIsLoading ||
                            !data.courier ||
                            !data.destination_json
                        }
                    >
                        Cek Ongkir
                    </Button>
                </div>
            </form>
        </section>
    );
}
