"use client";
import useDropdown from "@/Hooks/useDropdown";
import { Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";
import {
    PendingStatusLabel,
    RejectedStatusLabel,
    ApprovedStatusLabel,
} from "../Label/StatusLabel";
import useUpdateValidationStatusImigrant from "@/Features/Backpage/Imigrant/useUpdateValidationStatusImigrant";
import { IoMdArrowDropdown } from "react-icons/io";

const customTheme = {
    floating: {
        item: {
            base: "flex w-full cursor-pointer items-center justify-start px-4 text-sm text-neutral-dark focus:outline-none",
        },
    },
};

export default function SetStatusDropdown({ nik, selectedStatus = "PENDING" }) {
    const { isSubmitting, handleUpdateValidationStatus } =
        useUpdateValidationStatusImigrant();

    const statusItems = [
        {
            value: "PENDING",
            content: <PendingStatusLabel withBg />,
            onClick: () => handleUpdateValidationStatus(nik, "PENDING"),
        },
        {
            value: "APPROVED",
            content: <ApprovedStatusLabel withBg />,
            onClick: () => handleUpdateValidationStatus(nik, "APPROVED"),
        },
        {
            value: "REJECTED",
            content: <RejectedStatusLabel withBg />,
            onClick: () => handleUpdateValidationStatus(nik, "REJECTED"),
        },
    ];

    const { isOpen, dropdownRef, toggleDropdown, closeDropdown } =
        useDropdown();
    const [selectedItem, setSelectedItem] = useState(selectedStatus);

    const handleItemClick = (value) => {
        setSelectedItem(value);
        closeDropdown();
    };

    return (
        <div ref={dropdownRef}>
            <Dropdown
                label=""
                theme={customTheme}
                dismissOnClick={true}
                placement="bottom-start"
                renderTrigger={() => (
                    <div>
                        <button
                            disabled={isSubmitting}
                            onClick={toggleDropdown}
                            className={`flex items-center justify-center gap-1 rounded-full p-0.5 px-1 text-[12.8px] ${isOpen ? "bg-cyan-200/50 text-cyan-600" : "text-gray-600"} ${isSubmitting && "cursor-wait"}`}
                        >
                            <div>
                                {statusItems.find(
                                    (item) => item.value === selectedItem,
                                )
                                    ? statusItems.find(
                                          (item) => item.value === selectedItem,
                                      ).content
                                    : "Set Status"}
                            </div>
                            <IoMdArrowDropdown className="size-5" />
                        </button>
                    </div>
                )}
            >
                <div className="my-1 h-full w-full">
                    <div className="grid grid-cols-1 gap-2">
                        <div className="flex flex-col gap-1">
                            {statusItems
                                .filter((item) => item.value !== "SET_STATUS")
                                .map((item) => (
                                    <DropdownItem
                                        key={item.value}
                                        onClick={() => {
                                            handleItemClick(item.value);
                                            if (item.onClick) {
                                                item.onClick();
                                            }
                                        }}
                                        className={`flex h-[29px] cursor-pointer items-center justify-start px-3 transition-colors duration-200 ${selectedItem === item.value ? "bg-cyan-200/50" : "hover:bg-cyan-200/50"}`}
                                    >
                                        {item.content}
                                    </DropdownItem>
                                ))}
                        </div>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
}
