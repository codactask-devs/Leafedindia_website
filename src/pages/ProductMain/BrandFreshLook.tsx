import pizzaBox from '../../assets/FOOD BOX/pizzaBox.webp';
import { ArrowRight } from 'lucide-react';

const BrandFreshLook = () => {
    return (
        <section className="w-full py-16 px-6 lg:px-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                {/* Text Content */}
                <div className="flex-1 space-y-8 max-w-xl">
                    <h2 className="text-[36px] md:text-[52px] font-black text-[#1a2b4b] leading-[1.1]">
                        Give Your Food Brand a <br />
                        <span className="relative inline-block text-[#d92d20]">
                            Fresh Look!
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 15C50 5 150 5 295 15" stroke="#7ab55c" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                        Request a quote for eco-friendly food packaging that aligns with your brand and sustainability goals!
                    </p>

                    <button className="hover:cursor-pointer group flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#7ab55c] text-[#1a2b4b] rounded-full font-bold text-lg hover:bg-[#7ab55c] hover:text-white transition-all duration-300 shadow-lg shadow-green-100/50">
                        Craft My Packaging
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Image Content */}
                <div className="flex-1 relative">
                    <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                        <img
                            src={pizzaBox}
                            alt="Brand Mockup Packaging"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50 z-0" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-50 z-0" />
                </div>
            </div>
        </section>
    );
};

export default BrandFreshLook;
