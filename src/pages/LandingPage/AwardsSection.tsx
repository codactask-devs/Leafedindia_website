import React, { useState, useEffect } from 'react';
import { awardImages } from '../../assets/Assets';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, Trophy, ChevronRight } from 'lucide-react';

const AwardsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play logic
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % awardImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full py-24 px-6 lg:px-20 overflow-hidden bg-[#fb923c]">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ willChange: 'transform' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ willChange: 'transform' }} />
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
                
                {/* Left Side: Text Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-bold text-xs tracking-[0.2em] uppercase mb-8 border border-white/30 backdrop-blur-sm">
                        <Award className="w-4 h-4 text-white" />
                        Recognized Excellence
                    </div>
                    
                    <h2 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-[36px] md:text-[52px] font-black text-white leading-[1.1] mb-8 tracking-tight"
                    >
                        Honors, Awards & <br className="hidden md:block"/>Global Certifications
                    </h2>
                    
                    <p 
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        className="text-white/90 text-lg md:text-[18px] mb-10 max-w-xl leading-relaxed font-medium"
                    >
                        Our commitment to sustainability and quality is backed by industry-leading certifications. 
                        We don't just promise eco-friendly solutions; we prove them through recognized global standards.
                    </p>
                    
                    {/* Feature Lists */}
                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-8 mt-12">
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="p-4 rounded-2xl bg-white/20 border border-white/30 group-hover:bg-white group-hover:text-[#fb923c] transition-all duration-500">
                                <ShieldCheck className="w-6 h-6 text-white group-hover:text-[#fb923c]" />
                            </div>
                            <div className="text-left">
                                <h4 className="text-white font-bold text-lg leading-tight">Safety First</h4>
                                <p className="text-white/70 text-sm font-medium">ISO Certified Standards</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="p-4 rounded-2xl bg-white/20 border border-white/30 group-hover:bg-white group-hover:text-[#fb923c] transition-all duration-500">
                                <Trophy className="w-6 h-6 text-white group-hover:text-[#fb923c]" />
                            </div>
                            <div className="text-left">
                                <h4 className="text-white font-bold text-lg leading-tight">Top Rated</h4>
                                <p className="text-white/70 text-sm font-medium">Global Recognition</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Side: Simple Automatic Carousel */}
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="relative w-full max-w-[500px] aspect-[4/5] md:aspect-[3/4] group">
                        {/* Decorative Background Frame */}
                        <div className="absolute inset-0 bg-white/10 rounded-[40px] rotate-3 scale-105" />
                        
                        <div className="relative w-full h-full bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-white/20 p-2 md:p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 50, scale: 0.98 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 1.02 }}
                                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} // Smoother cubic-bezier
                                    className="w-full h-full flex items-center justify-center p-2 transform-gpu"
                                    style={{ willChange: 'transform, opacity' }}
                                >
                                    <img 
                                        src={awardImages[currentIndex]} 
                                        alt={`Award ${currentIndex + 1}`} 
                                        className="w-full h-full object-contain rounded-2xl"
                                        loading="eager"
                                        decoding="async"
                                    />
                                </motion.div>
                            </AnimatePresence>
                            
                            {/* Slide Indicator */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {awardImages.map((_, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => setCurrentIndex(i)}
                                        className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${i === currentIndex ? 'w-8 bg-[#fb923c]' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* Floating Interaction Hint */}
                        <div className="absolute -right-4 -bottom-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce hidden md:flex">
                             <div className="w-10 h-10 rounded-full bg-[#fb923c]/10 flex items-center justify-center">
                                <ChevronRight className="w-5 h-5 text-[#fb923c]" />
                             </div>
                             <p className="text-[#fb923c] text-[12px] font-black uppercase tracking-tight">Auto Sliding</p>
                        </div>
                    </div>
                </div>
                
            </div>
            
            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </section>
    );
};

export default AwardsSection;
