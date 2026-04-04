import type { FC } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface HorizontalGalleryProps {
    images: string[];
    title: string;
    onBack: () => void;
}

const HorizontalGallery: FC<HorizontalGalleryProps> = ({ images, title, onBack }) => {
    if (!images.length) {
        return (
            <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#dcfce7] overflow-hidden">
                <div className="text-center px-6">
                    <h2 className="text-[#064e3b] text-3xl font-black uppercase tracking-tighter mb-4">
                        {title}
                    </h2>
                    <p className="text-[#064e3b] text-lg font-medium mb-8">
                        No images found for this category.
                    </p>
                    <button
                        onClick={onBack}
                        className="px-6 py-3 rounded-full bg-[#064e3b] text-white font-semibold hover:bg-[#0b582f] transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex flex-col bg-[#dcfce7] overflow-hidden">
            {/* Header / Title */}
            <div className="flex items-center justify-between px-10 pt-12 pb-6">
                <h2 className="text-[#064e3b] text-4xl font-black uppercase tracking-tighter">{title}</h2>
                <button
                    onClick={onBack}
                    className="bg-white/20 hover:bg-white/40 transition-all p-3 rounded-full text-[#064e3b] backdrop-blur-md cursor-pointer"
                >
                    <X size={28} />
                </button>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 w-full overflow-x-auto overflow-y-hidden custom-scrollbar px-10 pb-12 flex items-center gap-6">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="shrink-0 h-full aspect-4/3 bg-white/40 backdrop-blur-sm rounded-[32px] p-6 shadow-lg border border-white/20 group overflow-hidden"
                    >
                        <img
                            src={img}
                            alt={`${title}-${index}`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </motion.div>
                ))}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                    margin: 0 40px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(6, 78, 59, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(6, 78, 59, 0.4);
                }
            `}</style>
        </div>
    );
};

export default HorizontalGallery;
