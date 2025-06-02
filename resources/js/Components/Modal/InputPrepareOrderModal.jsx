import usePrepareOrder from "@/Features/Transactions/usePrepareOrder";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

export function InputPrepareOrderModal({
    trigger,
    transaction,
    isUpdateReceiptNumber = false,
}) {
    const [openModal, setOpenModal] = useState(false);
    const { formData, isSubmitting, errors, handleChange, handleSubmit } =
        usePrepareOrder(setOpenModal, transaction, isUpdateReceiptNumber);

    return (
        <>
            <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
                {trigger}
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    {isUpdateReceiptNumber
                        ? "Edit Nomor Resi"
                        : "Siapkan Pesanan"}
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-3"
                    >
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="receipt_number"
                                    value="Nomor resi*"
                                    color={
                                        errors.receipt_number
                                            ? "failure"
                                            : "gray"
                                    }
                                />
                            </div>
                            <TextInput
                                id="receipt_number"
                                name="receipt_number"
                                type="text"
                                placeholder="Masukan nomor resi..."
                                required
                                value={formData.receipt_number}
                                onChange={handleChange}
                                color={
                                    errors.receipt_number ? "failure" : "gray"
                                }
                                helperText={errors.receipt_number}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="note"
                                    value="Catatan"
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
                        <div className="flex items-center justify-end gap-3">
                            <Button
                                color="gray"
                                onClick={() => setOpenModal(false)}
                            >
                                Kembali
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
