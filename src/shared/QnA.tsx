import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const QnA = ({ qna }: { qna: any }) => {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`bg-[#fafafa] rounded-xl p-5 mb-4 cursor-pointer transition-all border border-gray-100/50 duration-300 ${!open && "hover:bg-gray-50 hover:px-6"} ${open ? "shadow-sm border-gray-200" : ""}`}
            onClick={() => setOpen(!open)}
        >
            {/* Question */}
            <div className="flex justify-between items-center gap-6">
                <p className={`font-montserrat font-extrabold text-[17px] md:text-[18px] transition-colors duration-300 ${open ? "text-[#fb923c]" : "text-[#1a2b4b]"}`}>
                    {qna.question}
                </p>

                <div className={`shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center transition-all duration-500 ${open ? "bg-[#fb923c] text-white rotate-180 shadow-md shadow-orange-100" : "bg-white text-[#1a2b4b] border border-gray-200"}`}>
                    {open ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[500px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="h-px bg-gray-200/60 mb-4" />
                <p className="text-[14px] md:text-[15px] text-gray-500 font-medium leading-relaxed whitespace-pre-line">
                    {qna.answer}
                </p>
            </div>
        </div>
    );
};

export default QnA;
