import useUpdateProfile from "@/Features/Backpage/Profile/useUpdateProfile";
import useGetCity from "@/Features/Frontpage/Ongkirs/useGetCity";
import useGetProvince from "@/Features/Frontpage/Ongkirs/useGetProvince";
import { usePage } from "@inertiajs/react";
import { useQueryClient } from "@tanstack/react-query";
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ShipmentForm({ className = "" }) {
    const { auth } = usePage().props;
    const {
        data,
        errors,
        processing,
        handleChange,
        handleSubmitUpdateProfile,
        setData,
    } = useUpdateProfile();

    const [provinceId, setProvinceId] = useState(data.province_code ?? null);
    const [cityId, setCityId] = useState(data.city_code ?? null);

    const queryClient = useQueryClient();

    const { data: provinces, isLoading: provinceIsLoading } = useGetProvince();
    const {
        data: cities,
        isLoading: cityIsLoading,
        isFetching: cityIsFetching,
    } = useGetCity(provinceId);

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ["get-city"],
            exact: false,
        });
    }, [provinceId, queryClient]);

    return (
        <section className={className}>
            <header>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Informasi Pengiriman
                </p>
            </header>

            <form
                className="mt-4 space-y-2 w-full"
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label htmlFor="name" value="Nama*" />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Masukan nama..."
                            required
                            value={data.name}
                            // isFocused={true}
                            color={errors.name ? "failure" : "gray"}
                            onChange={handleChange}
                            helperText={errors.name}
                        />
                    </div>
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="role"
                                value="Nomor Telepon*"
                                color={errors.role ? "failure" : "gray"}
                            />
                        </div>
                        <TextInput
                            id="role"
                            name="role"
                            type="text"
                            placeholder="Masukan nomor telepon..."
                            required
                            // isFocused={true}
                            color={errors.role ? "failure" : "gray"}
                            onChange={handleChange}
                            helperText={errors.role}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <div className="w-full">
                        <div className="mb-1 block">
                            <Label
                                htmlFor="address"
                                value="Alamat Lengkap"
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
                        <Select defaultValue={"jne"}>
                            <option value="">
                                -- Pilih jasa pengiriman --
                            </option>
                            <option value="jne">JNE</option>
                            <option value="tiki">TIKI</option>
                        </Select>
                    </div>
                </div>
            </form>
        </section>
    );
}
