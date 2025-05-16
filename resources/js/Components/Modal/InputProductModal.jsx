import useInputProduct from "@/Features/Backpage/Products/useInputProduct";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import {
    Button,
    Label,
    Modal,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";
import { useState } from "react";

export function InputProductModal({ trigger, isUpdate = false, data }) {
    const [openModal, setOpenModal] = useState(false);
    const {
        categories,
        formData,
        imagePreview,
        isSubmitting,
        errors,
        handleChange,
        handleFileChange,
        handleSubmit,
    } = useInputProduct(setOpenModal, isUpdate, data);

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
                    {isUpdate ? "Detail Produk" : "Tambah Produk"}
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
                                        htmlFor="category_id"
                                        value="Kategori*"
                                        color={
                                            errors.category_id
                                                ? "failure"
                                                : "gray"
                                        }
                                    />
                                </div>
                                <Select
                                    id="category_id"
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    color={
                                        errors.category_id ? "failure" : "gray"
                                    }
                                    helperText={errors.category_id}
                                >
                                    <option value="">
                                        -- Pilih kategori --
                                    </option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="name"
                                        value="Nama produk*"
                                        color={errors.name ? "failure" : "gray"}
                                    />
                                </div>
                                <TextInput
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Masukan nama produk..."
                                    value={formData.name}
                                    onChange={handleChange}
                                    color={errors.name ? "failure" : "gray"}
                                    helperText={errors.name}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="code"
                                        value="Kode*"
                                        color={errors.code ? "failure" : "gray"}
                                    />
                                </div>
                                <TextInput
                                    id="code"
                                    name="code"
                                    type="text"
                                    placeholder="Masukan nama produk..."
                                    value={formData.code}
                                    onChange={handleChange}
                                    color={errors.code ? "failure" : "gray"}
                                    helperText={errors.code}
                                    readOnly={isUpdate}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="size"
                                        value="Ukuran*"
                                        color={errors.size ? "failure" : "gray"}
                                    />
                                </div>
                                <TextInput
                                    id="size"
                                    name="size"
                                    type="text"
                                    placeholder="Masukan ukuran..."
                                    value={formData.size}
                                    onChange={handleChange}
                                    color={errors.size ? "failure" : "gray"}
                                    helperText={errors.size}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="color"
                                        value="Warna*"
                                        color={
                                            errors.color ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="color"
                                    name="color"
                                    type="text"
                                    placeholder="Masukan warna..."
                                    value={formData.color}
                                    onChange={handleChange}
                                    color={errors.color ? "failure" : "gray"}
                                    helperText={errors.color}
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="price"
                                        value="Harga*"
                                        color={
                                            errors.price ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <TextInput
                                    id="price"
                                    name="price"
                                    type="text"
                                    placeholder="Masukan harga..."
                                    value={formData.price}
                                    onChange={handleChange}
                                    color={errors.price ? "failure" : "gray"}
                                    helperText={errors.price}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 w-full">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="stock" value="Stok*" />
                                </div>
                                <TextInput
                                    id="stock"
                                    name="stock"
                                    type="text"
                                    placeholder="Masukan stok..."
                                    value={formData.stock}
                                    onChange={handleChange}
                                    color={errors.stock ? "failure" : "gray"}
                                    readOnly
                                    disabled
                                />
                            </div>

                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="description"
                                        value="Deskripsi"
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
                        </div>

                        <div>
                            {imagePreview.image && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview.image}
                                        alt="Preview"
                                        className="w-1/3 rounded-lg object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="image"
                                    value="Gambar"
                                    color={errors.image ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleFileChange}
                                color={errors.image ? "failure" : "gray"}
                                helperText={errors.image}
                            />
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
