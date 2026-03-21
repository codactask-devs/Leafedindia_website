import NavBar from '../../shared/NavBar';
import HeroImage from '../../assets/HeroImage.png';
import Youtube from '../../assets/youtube.svg';
import CircularText from '../../animations/CircularFont';
import { useState } from 'react';
import { Play, Eye, Target } from 'lucide-react';
const HomePage = () => {
    const [show, setShow] = useState(false);
    return (

        <div className="w-full min-h-[100vh]  relative">
            {/* asdfa */}
            <section className="absolute inset-0 z-0 pointer-events-none">
                <div className=" bg-[#0d6e41] w-full" />
                <div className="flex h-full w-full">
                    <div className="flex-1 h-full bg-[#fefbea] rounded-b-[70px]" />
                    <div className="w-[18%] h-full bg-[#fb923c] hidden md:block rounded-br-[70px]" />
                </div>
            </section>

            <section className="relative z-10">
                <NavBar />
                <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-[140px] md:pt-[200px] lg:pt-[180px]">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-0">

                        <nav className="w-full lg:w-1/2 lg:pt-10 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
                            <h1
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                className="text-[34px] md:text-[80px] lg:text-[80px] font-black leading-10 md:leading-20 mb-8 tracking-tight"
                            >
                                <span className="text-[#0d6e41] block whitespace-nowrap">Make The Best</span>
                                <span className="text-[#fb923c] block text-[40px] md:text-[86px] lg:text-[89px]">Packaging</span>
                            </h1>

                            <p
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                className="text-gray-500 text-lg md:text-[16px] max-w-[600px] leading-relaxed font-medium mb-10"
                            >
                                Sustainable packaging solutions designed for modern brands.
                                Eco-friendly, customizable, and crafted to elevate your product experience.
                            </p>
                            <div className='flex gap-5'>

                                <nav
                                    className="relative hover:cursor-pointer "
                                    onClick={() => setShow(true)}
                                >

                                    <img
                                        src={Youtube}
                                        alt="Watch Demo Preview"
                                        width={280}
                                        height={157}
                                        decoding="async"
                                        className="rounded-[12px] object-cover h-auto w-[280px]"
                                    />
                                    <div className="absolute inset-0 bg-black/20 rounded-[12px] group hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <div className="flex items-center gap-3 bg-white/90 px-6 py-3 rounded-full shadow-lg group-hover:scale-105 transition-transform">
                                            <Play className="w-4 h-4 text-[#fb923c] fill-[#fb923c]" />
                                            <p className="text-[14px] font-bold text-[#0d6e41]">Watch Demo</p>
                                        </div>
                                    </div>
                                </nav>
                                <CircularText text="FROM EARTH ⭐ FOR EARTH ⭐ " className='hidden md:block text-[#0d6e41] text-[12px] ml-10' />

                                {show && (
                                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                                        <div className="relative w-[90%] max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => setShow(false)}
                                                className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl z-50 hover:cursor-pointer transition-colors"
                                            >
                                                ✕
                                            </button>

                                            <iframe
                                                src="https://www.youtube.com/embed/apJHXCO273E"
                                                className="w-full h-full"
                                                allow="autoplay; encrypted-media"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </nav>

                        <nav className="w-full lg:pt-5 lg:w-1/2 flex justify-center lg:justify-end items-center relative order-1 lg:order-2 lg:translate-x-24">
                            <div className="w-[280px] md:w-[550px] lg:w-[650px]">
                                <img
                                    src={HeroImage}
                                    alt="Sustainable Packaging Mockups"
                                    width={650}
                                    height={450}
                                    decoding="async"
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                            </div>
                        </nav>

                    </div>
                </div>

            </section >
            <section
                style={{ backgroundColor: '#0d6e41' }}
                className="relative mt-10  w-full bg-[#0d6e41] py-16 md:py-24 rounded-3xl md:rounded-[50px] lg:rounded-[60px]"
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 text-white lg:order-2 text-center lg:text-left">
                        <h2
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                            className="text-[32px] md:text-[45px] font-black mb-6 leading-[1.1]"
                        >
                            Excellence In Printing And Packaging
                        </h2>
                        <p
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                            className="text-gray-100 text-[14px] md:text-[16px] mb-10 max-w-xl opacity-90 font-medium"
                        >
                            Leading the global transition towards circular packaging ecosystems.
                            Our mission is to empower brands with sustainable, beautiful, for the earth.
                        </p>

                        <div className="flex flex-col md:flex-row items-center lg:items-center gap-6 mt-12 pt-8 border-t border-white/20">
                            <span className="text-sm font-bold uppercase tracking-widest opacity-70">Our Partners:</span>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 items-center opacity-80">
                                <div className="flex items-center gap-2 font-bold text-xl">
                                    <div className="w-1.5 h-6 bg-white/40" />
                                    <span className="tracking-tighter uppercase">LOGO1</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-xl">
                                    {/* <div className="grid grid-cols-2 gap-0.5">
                                        <div className="w-2 h-2 bg-white/40" />
                                        <div className="w-2 h-2 bg-white/40" />
                                        <div className="w-2 h-2 bg-white/40" />
                                        <div className="w-2 h-2 bg-white/40" />
                                    </div> */}
                                    <span className="tracking-tighter uppercase">LOGO2</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-xl">
                                    <span className="tracking-tighter uppercase">LOGO3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vision and Mission Cards */}
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 lg:order-1 w-full lg:w-auto mt-8 lg:mt-0">
                        {/* Vision Card */}
                        <div className="bg-[#12263a] p-10 rounded-[32px] w-full sm:w-full lg:w-[260px] text-center flex flex-col items-center relative pt-16">
                            <div className="absolute -top-10 bg-[#fb923c] p-7 rounded-full shadow-2xl">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h3
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                className="text-white text-[24px] font-black mb-4"
                            >
                                Our Vision
                            </h3>
                            <p
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                className="text-gray-400 text-[14px] leading-relaxed font-medium"
                            >
                                Leading the global transition towards circular packaging ecosystems.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-[#fb923c] p-10 rounded-[32px] w-full sm:w-full lg:w-[260px] text-center flex flex-col items-center relative pt-16 mt-10 sm:mt-0 lg:mt-10 xl:mt-0">
                            <div className="absolute -top-10 bg-[#12263a] p-7 rounded-full shadow-2xl">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                className="text-white text-[24px] font-black mb-4"
                            >
                                Our Mission
                            </h3>
                            <p
                                style={{ fontFamily: "'Montserrat', sans-serif" }}
                                className="text-white/90 text-[14px] leading-relaxed font-medium"
                            >
                                Empowering brands with customizable, eco-friendly packaging that doesn't compromise on beauty.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default HomePage;