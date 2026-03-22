import logo1 from "../assets/CompanyLogos/logo1.jpg"
import logo2 from "../assets/CompanyLogos/logo2.png"
import logo3 from "../assets/CompanyLogos/logo3.png"
import logo4 from "../assets/CompanyLogos/logo4.png"
import logo5 from "../assets/CompanyLogos/logo5.png"
import logo6 from "../assets/CompanyLogos/logo6.png"
import logo7 from "../assets/CompanyLogos/logo7.png"
import logo8 from "../assets/CompanyLogos/logo8.png"
import logo9 from "../assets/CompanyLogos/logo9.png"
import logo10 from "../assets/CompanyLogos/logo10.png"
import logo11 from "../assets/CompanyLogos/logo11.png"
import logo12 from "../assets/CompanyLogos/logo12.png"
import logo13 from "../assets/CompanyLogos/logo13.png"
import logo14 from "../assets/CompanyLogos/logo14.png"
import logo15 from "../assets/CompanyLogos/logo15.png"
import logo16 from "../assets/CompanyLogos/logo16.png"
import logo17 from "../assets/CompanyLogos/logo17.png"

const logos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
    logo13,
    logo14,
    logo15,
    logo16,
    logo17,
];
const LogoScroll = () => {

    return (
        <section className="px-5 md:px-15 flex flex-col gap-8 items-center mb-16 mt-8 bg-white overflow-hidden">
            <p className="w-full text-center text-[15px] md:text-[16px] font-medium text-gray-500 tracking-wide uppercase">
                Trusted by leading companies nationwide
            </p>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Fades for a premium look */}
                <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div className="flex w-fit animate-scroll">
                    {/* First batch */}
                    {logos.map((item, i) => (
                        <div key={i} className="shrink-0 flex items-center justify-center mx-10 md:mx-16">
                            <img
                                src={item}
                                alt={`company-logo-${i}`}
                                className="h-10 md:h-14 w-auto object-contain"
                            />
                        </div>
                    ))}

                    {/* Duplicate batch for infinite loop */}
                    {logos.map((item, i) => (
                        <div key={`dup-${i}`} className="shrink-0 flex items-center justify-center mx-10 md:mx-16">
                            <img
                                src={item}
                                alt={`company-logo-dup-${i}`}
                                className="h-10 md:h-14 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LogoScroll;
