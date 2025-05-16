import useInputPromotion from "@/Features/Backpage/Promotions/useInputPromotion";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import MultiSelectInput from "../Input/MultiSelectInput";
import InputError from "../InputError";

export function InputPromotionModal({ trigger, isUpdate = false, data }) {
    const [openModal, setOpenModal] = useState(false);
    const {
        formData,
        imagePreview,
        isSubmitting,
        errors,
        productIdOptions,
        selectedProductIds,
        setSelectedProductIds,
        handleChange,
        handleFileChange,
        handleSubmit,
    } = useInputPromotion(setOpenModal, isUpdate, data);

    return (
        <>
            <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
                {trigger}
            </div>
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                size="6xl"
            >
                <Modal.Header>
                    {isUpdate ? "Detail Promosi" : "Tambah Promosi"}
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-3"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="title"
                                        value="Judul promo*"
                                        color={
                                            errors.title ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="title"
                                    name="title"
                                    type="text"
                                    placeholder="Masukan judul promo..."
                                    value={formData.title}
                                    onChange={handleChange}
                                    color={errors.title ? "failure" : "gray"}
                                    helperText={errors.title}
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="discount_percentage"
                                        value="Persentase diskon*"
                                        color={
                                            errors.discount_percentage
                                                ? "failure"
                                                : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="discount_percentage"
                                    name="discount_percentage"
                                    type="text"
                                    placeholder="Masukan judul promo..."
                                    value={formData.discount_percentage}
                                    onChange={handleChange}
                                    color={
                                        errors.discount_percentage
                                            ? "failure"
                                            : "gray"
                                    }
                                    helperText={errors.discount_percentage}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="start_date"
                                        value="Tanggal mulai*"
                                        color={
                                            errors.start_date
                                                ? "failure"
                                                : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    color={
                                        errors.start_date ? "failure" : "gray"
                                    }
                                    helperText={errors.start_date}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="end_date"
                                        value="Tanggal selesai*"
                                        color={
                                            errors.end_date ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    color={errors.end_date ? "failure" : "gray"}
                                    helperText={errors.end_date}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="product_ids"
                                    value="Produk yang dipromosikan*"
                                    color={
                                        errors.product_ids ? "failure" : "gray"
                                    }
                                />
                            </div>
                            <MultiSelectInput
                                title={"-- Pilih produk --"}
                                onChange={setSelectedProductIds}
                                options={productIdOptions}
                                value={selectedProductIds}
                                error={errors.product_ids}
                            />
                            <InputError message={errors.product_ids} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Deskripsi*"
                                        color={
                                            errors.description
                                                ? "failure"
                                                : "gray"
                                        }
                                    />
                                </div>
                                <Textarea
                                    rows={4}
                                    id="description"
                                    name="description"
                                    placeholder="Masukan deskripsi..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    color={
                                        errors.description ? "failure" : "gray"
                                    }
                                    helperText={errors.description}
                                />
                            </div>
                            <div>
                                <div>
                                    {imagePreview.image && (
                                        <div className="mt-2">
                                            <img
                                                src={imagePreview.image}
                                                alt="Preview"
                                                className="w-1/2 rounded-lg object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="image"
                                            value="Gambar*"
                                            color={
                                                errors.image
                                                    ? "failure"
                                                    : "gray"
                                            }
                                        />
                                    </div>
                                    <TextInput
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={handleFileChange}
                                        color={
                                            errors.image ? "failure" : "gray"
                                        }
                                        helperText={errors.image}
                                    />
                                </div>
                            </div>
                        </div>

                        {isUpdate && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
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
                            </div>
                        )}
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                Kembali
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isUpdate ? "Update" : "Simpan"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
