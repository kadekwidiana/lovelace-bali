export const ApprovedStatusLabel = ({ withBg = false }) => {
    return (
        <div
            className={`flex h-[20px] w-fit items-center justify-center gap-1.5 rounded-full ${withBg && "bg-[#C5EBC5]"} p-0.5 px-1 text-[12.8px] text-[#0F9D58]`}
        >
            <div className="size-2 rounded-full bg-[#0F9D58]"></div>
            <span>APPROVED</span>
        </div>
    );
};

export const PendingStatusLabel = ({ withBg = false }) => {
    return (
        <div
            className={`flex h-[20px] w-fit items-center justify-center gap-1.5 rounded-full ${withBg && "bg-[#FFF0C6]"} p-0.5 px-1 text-[12.8px] text-[#F4B400]`}
        >
            <div className="size-2 rounded-full bg-[#F4B400]"></div>
            <span>PENDING</span>
        </div>
    );
};

export const RejectedStatusLabel = ({ withBg = false }) => {
    return (
        <div
            className={`flex h-[20px] w-fit items-center justify-center gap-1.5 rounded-full ${withBg && "bg-[#FBE0DD]"} p-0.5 px-1 text-[12.8px] text-[#DB4437]`}
        >
            <div className="size-2 rounded-full bg-[#DB4437]"></div>
            <span>REJECTED</span>
        </div>
    );
};
