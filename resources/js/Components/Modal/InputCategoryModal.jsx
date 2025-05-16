"use client";

import useInputCategory from "@/Features/Backpage/Categories/useInputCategory";
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

export function InputCategoryModal({ trigger, isUpdate, data }) {
    const [openModal, setOpenModal] = useState(false);
    const { formData, isSubmitting, errors, handleChange, handleSubmit } =
        useInputCategory(setOpenModal, isUpdate, data);

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
                                    htmlFor="name"
                                    value="Nama kategori*"
                                    color={errors.name ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Masukan nama kategori..."
                                value={formData.name}
                                onChange={handleChange}
                                color={errors.name ? "failure" : "gray"}
                                helperText={errors.name}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    value="Deskripsi"
                                    color={
                                        errors.description ? "failure" : "gray"
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
                                color={errors.description ? "failure" : "gray"}
                                helperText={errors.description}
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
