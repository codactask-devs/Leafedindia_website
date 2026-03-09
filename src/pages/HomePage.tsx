import NavBar from '../shared/NavBar';
import HeroImage from '../assets/HeroImage.png';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#fefbea] relative">
            <div className="absolute inset-0 z-0">
                <div className="h-[108px] lg:h-[87px] bg-[#0d6e41] w-full"></div>
                <div className="flex h-full w-full">
                    <div className="flex-1 h-full bg-[#fefbea]"></div>
                    <div className="w-[18%] h-full bg-[#fb923c] hidden md:block"></div>
                </div>
            </div>

            <div className="relative z-5">
                <NavBar />

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-[160px] md:pt-[200px] lg:pt-[180px]">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-0">

                        {/* Left Content (Text) */}
                        <div className="w-full lg:w-1/2 lg:pt-14 flex flex-col items-center lg:items-start text-center lg:text-left z-5 order-2 lg:order-1">
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
                        </div>

                        {/* Right Content (Image) */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center relative order-1 lg:order-2 lg:translate-x-24">

                            <div className="relative z-5 w-[280px] md:w-[550px] lg:w-[650px]">
                                <img
                                    src={HeroImage}
                                    alt="Sustainable Packaging Mockups"
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;

