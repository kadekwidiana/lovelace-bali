import useInputStockLog from "@/Features/StockLogs/useInputStockLog";
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
import SearchSelectInput from "../Input/SearchSelectInput";
import {
    DESTINATION_OPTIONS,
    SOURCE_OPTIONS,
} from "@/Constants/stockLogOptions";

export function InputStockLogModal({
    trigger,
    isUpdate = false,
    isOut = false,
    data,
}) {
    const [openModal, setOpenModal] = useState(false);
    const {
        products,
        formData,
        isSubmitting,
        errors,
        setFormData,
        handleChange,
        handleSubmit,
    } = useInputStockLog(setOpenModal, isUpdate, isOut, data);

    return (
        <>
            <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
                {trigger}
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    {isUpdate
                        ? `Detail Produk ${isOut ? "Keluar" : "Masuk"}`
                        : `Tambah Produk ${isOut ? "Keluar" : "Masuk"}`}
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-3"
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="product_id"
                                    value="Produk*"
                                    color={
                                        errors.product_id ? "failure" : "gray"
                                    }
                                />
                            </div>
                            <div className="w-full">
                                <SearchSelectInput
                                    entities={products}
                                    otherEntity={"code"}
                                    selectedEntityId={formData.product_id}
                                    setSelectedEntityId={(id) =>
                                        setFormData({
                                            ...formData,
                                            product_id: id,
                                        })
                                    }
                                    label={"-- Pilih produk --"}
                                    placeholder={"Cari produk..."}
                                    error={errors.product_id}
                                />
                            </div>
                            <p className="mt-1 text-sm text-red-500">
                                {errors.product_id}
                            </p>
                        </div>

                        <div className="hidden">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="type"
                                    value="Jenis*"
                                    color={errors.type ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="type"
                                name="type"
                                type="text"
                                // value={formData.type}
                                defaultValue={isOut ? "KELUAR" : "MASUK"}
                                // onChange={handleChange}
                                color={errors.type ? "failure" : "gray"}
                                helperText={errors.type}
                                readOnly
                                disabled
                            />
                        </div>

                        {!isOut ? (
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="source"
                                        value="Sumber*"
                                        color={
                                            errors.source ? "failure" : "gray"
                                        }
                                    />
                                </div>
                                <Select
                                    id="source"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    color={errors.source ? "failure" : "gray"}
                                    helperText={errors.source}
                                    // required
                                >
                                    <option value="">-- Pilih sumber --</option>
                                    {SOURCE_OPTIONS.map((source) => (
                                        <option
                                            key={source.value}
                                            value={source.value}
                                        >
                                            {source.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="destination"
                                        value="Tujuan*"
                                        color={
                                            errors.destination
                                                ? "failure"
                                                : "gray"
                                        }
                                    />
                                </div>
                                <Select
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    color={
                                        errors.destination ? "failure" : "gray"
                                    }
                                    helperText={errors.destination}
                                    // required
                                >
                                    <option value="">-- Pilih tujuan --</option>
                                    {DESTINATION_OPTIONS.map((destination) => (
                                        <option
                                            key={destination.value}
                                            value={destination.value}
                                        >
                                            {destination.label}
                                        </option>
                                    ))}
                                </Select>
                            </div>
                        )}

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="date"
                                    value={`Tanggal ${
                                        isOut ? "Keluar" : "Masuk"
                                    }*`}
                                    color={errors.date ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                color={errors.date ? "failure" : "gray"}
                                helperText={errors.date}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="quantity"
                                    value="Jumlah*"
                                    color={errors.quantity ? "failure" : "gray"}
                                />
                            </div>
                            <TextInput
                                id="quantity"
                                name="quantity"
                                type="text"
                                placeholder="Masukan jumlah..."
                                value={formData.quantity}
                                onChange={handleChange}
                                color={errors.quantity ? "failure" : "gray"}
                                helperText={errors.quantity}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="note"
                                    value=" Catatan"
                                    color={errors.note ? "failure" : "gray"}
                                />
                            </div>
                            <Textarea
                                rows={4}
                                id="note"
                                name="note"
                                placeholder="Masukan catatan..."
                                value={formData.note}
                                onChange={handleChange}
                                color={errors.note ? "failure" : "gray"}
                                helperText={errors.note}
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
