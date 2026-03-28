import React from "react";

interface ProductCTASectionProps {
    productName: string;
    ctaImage: string;
}

const ProductCTASection: React.FC<ProductCTASectionProps> = ({
    productName,
    ctaImage
}) => {
    return (
        <section className="w-full py-10s px-6 lg:px-20 bg-[#f8f9fa] overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">

                {/* Text Content */}
                <div className="flex-1 space-y-8">
                    <h2 className="text-[26px] md:text-[36px] font-black text-[#1a2b4b] leading-[1.2] tracking-tight">
                        Serve your food in {productName} that <br className="hidden md:block" />
                        protect <span className="text-[#86bc25]">your meals</span> and <br className="hidden md:block" />
                        <span className="text-[#86bc25]">your brand</span>.
                    </h2>

                    <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                        Bring your packaging idea to life with our team —
                        from initial concept to your doorstep.
                    </p>

                    <button className="group relative px-6 py-3 bg-white border-2 border-[#86bc25] rounded-full text-[#1a2b4b] font-black text-[10px] uppercase tracking-widest transition-all hover:bg-[#86bc25] hover:text-white hover:shadow-xl hover:shadow-green-100 flex items-center gap-3">
                        Create My {productName}
                        <span className="transform transition-transform group-hover:translate-x-1">›</span>
                    </button>
                </div>

                {/* Image Section */}
                <div className="flex-1 relative flex justify-center items-center h-[400px] md:h-[600px]">
                    {/* The Circular Blob - FORCED VIA INLINE STYLES */}
                    <div
                        style={{
                            backgroundColor: '#86bc25',
                            borderRadius: '50%',
                            position: 'absolute',
                            zIndex: 1,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                        }}
                        className="w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
                    />

                    {/* Secondary Glow */}
                    <div
                        style={{
                            backgroundColor: '#86bc25',
                            opacity: 0.1,
                            filter: 'blur(40px)',
                            borderRadius: '50%',
                            position: 'absolute',
                            zIndex: 0
                        }}
                        className="w-[450px] h-[450px] md:w-[750px] md:h-[750px]"
                    />

                    <div className="relative z-10 w-full max-w-[260px] md:max-w-[360px]">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl bg-white p-3 transform transition-all duration-500 hover:scale-105">
                            <img
                                src={ctaImage}
                                alt={`LeafedIndia ${productName} Custom Branding`}
                                className="w-full h-auto object-cover rounded-[30px]"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductCTASection;
