import useInputRajaOngkirConfig from "@/Features/RajaOngkirConfigs/useInputRajaOngkirConfig";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import SearchOriginInput from "../Input/SearchOriginInput";

export function InputRajaOngkirConfigModal({ trigger, isUpdate, data }) {
    const [openModal, setOpenModal] = useState(false);
    const {
        formData,
        isSubmitting,
        errors,
        setFormData,
        handleChange,
        handleSubmit,
    } = useInputRajaOngkirConfig(setOpenModal, isUpdate, data);

    return (
        <>
            <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
                {trigger}
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    {isUpdate ? "Detail Kategori" : "Tambah Kategori"}
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-3"
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="api_url"
                                    value="Api Url*"
                                    color={errors.api_url ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="api_url"
                                name="api_url"
                                type="url"
                                placeholder="Masukan api url..."
                                value={formData.api_url}
                                onChange={handleChange}
                                color={errors.api_url ? "failure" : "gray"}
                                helperText={errors.api_url}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="api_key"
                                    value="Api Key*"
                                    color={errors.api_key ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="api_key"
                                name="api_key"
                                type="text"
                                placeholder="Masukan api key..."
                                value={formData.api_key}
                                onChange={handleChange}
                                color={errors.api_key ? "failure" : "gray"}
                                helperText={errors.api_key}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    value="Deskripsi*"
                                    color={
                                        errors.description ? "failure" : "gray"
                                    }
                                />
                            </div>
                            <Textarea
                                rows={2}
                                id="description"
                                name="description"
                                placeholder="Masukan deskripsi..."
                                value={formData.description}
                                onChange={handleChange}
                                color={errors.description ? "failure" : "gray"}
                                helperText={errors.description}
                            />
                        </div>
                        <SearchOriginInput
                            data={formData}
                            setData={setFormData}
                        />
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="origin_default"
                                    value="Origin ID Default*"
                                    color={
                                        errors.origin_default
                                            ? "failure"
                                            : "gray"
                                    }
                                />
                            </div>
                            <TextInput
                                id="origin_default"
                                name="origin_default"
                                type="text"
                                placeholder="Masukan origin default..."
                                value={formData.origin_default}
                                onChange={handleChange}
                                color={
                                    errors.origin_default ? "failure" : "gray"
                                }
                                helperText={errors.origin_default}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="origin_description"
                                    value="Origin Deskripsi*"
                                    color={
                                        errors.origin_description
                                            ? "failure"
                                            : "gray"
                                    }
                                />
                            </div>
                            <Textarea
                                rows={2}
                                id="origin_description"
                                name="origin_description"
                                placeholder="Masukan origin deskripsi..."
                                value={formData.origin_description}
                                onChange={handleChange}
                                color={
                                    errors.origin_description
                                        ? "failure"
                                        : "gray"
                                }
                                helperText={errors.origin_description}
                            />
                        </div>
                        {isUpdate && (
                            <>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="created_at"
                                            value="Dibuat"
                                        />
                                    </div>
                                    <TextInput
                                        id="created_at"
                                        name="created_at"
                                        type="text"
                                        value={formatDateToIndonesian(
                                            data.created_at ?? ""
                                        )}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="updated_at"
                                            value="Diupdate"
                                        />
                                    </div>
                                    <TextInput
                                        id="updated_at"
                                        name="updated_at"
                                        type="text"
                                        value={formatDateToIndonesian(
                                            data.updated_at ?? ""
                                        )}
                                        readOnly
                                    />
                                </div>
                            </>
                        )}
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                Kembali
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                color="none"
                                className="bg-primary/80 hover:bg-primary/100 text-white text-nowrap"
                            >
                                {isUpdate ? "Update" : "Simpan"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
