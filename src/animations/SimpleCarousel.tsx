import type { FC } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface SimpleCarouselProps {
    images: string[];
    title: string;
    onBack: () => void;
}

const SimpleCarousel: FC<SimpleCarouselProps> = ({ images, title, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const getIndex = (offset: number) => {
        return (currentIndex + offset + images.length) % images.length;
    };

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
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#dcfce7] overflow-hidden">
            {/* Header / Title */}
            <div className="absolute top-6 left-10 ">
                <h2 className="text-[#064e3b] text-4xl font-black uppercase tracking-tighter">{title}</h2>
            </div>

            <button
                onClick={onBack}
                className="absolute top-6 right-6  bg-white/20 hover:bg-white/40 transition-all p-3 rounded-full text-[#064e3b] backdrop-blur-md cursor-pointer"
            >
                <X size={28} />
            </button>

            {/* Carousel Container */}
            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center px-4">
                <div className="relative w-full h-full flex items-center justify-center gap-4">
                    {/* Left Peek */}
                    <div className="hidden md:block w-1/4 h-3/4 opacity-30 scale-90 blur-[2px] overflow-hidden rounded-2xl">
                        <img
                            src={images[getIndex(-1)]}
                            alt="prev"
                            className="w-full h-full object-contain pointer-events-none"
                        />
                    </div>

                    {/* Main Image */}
                    <div className="relative w-full md:w-2/4 h-full flex items-center justify-center ">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -50 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="w-full h-full bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
                            >
                                <img
                                    src={images[currentIndex]}
                                    alt={`${title}-${currentIndex}`}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Peek */}
                    <div className="hidden md:block w-1/4 h-3/4 opacity-30 scale-90 blur-[2px] overflow-hidden rounded-2xl">
                        <img
                            src={images[getIndex(1)]}
                            alt="next"
                            className="w-full h-full object-contain pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-6">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full border-2 border-[#064e3b] text-[#064e3b] flex items-center justify-center hover:bg-[#064e3b] hover:text-white transition-all cursor-pointer shadow-lg"
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="text-[#064e3b] font-black text-xl tracking-widest min-w-[60px] text-center">
                    {currentIndex + 1} / {images.length}
                </div>
                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full border-2 border-[#064e3b] text-[#064e3b] flex items-center justify-center hover:bg-[#064e3b] hover:text-white transition-all cursor-pointer shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default SimpleCarousel;
