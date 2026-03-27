import logo1 from "../assets/CompanyLogos/logo1.webp"
import logo2 from "../assets/CompanyLogos/logo2.webp"
import logo3 from "../assets/CompanyLogos/logo3.webp"
import logo4 from "../assets/CompanyLogos/logo4.webp"
import logo5 from "../assets/CompanyLogos/logo5.webp"
import logo6 from "../assets/CompanyLogos/logo6.webp"
import logo7 from "../assets/CompanyLogos/logo7.webp"
import logo8 from "../assets/CompanyLogos/logo8.webp"
import logo9 from "../assets/CompanyLogos/logo9.webp"
import logo10 from "../assets/CompanyLogos/logo10.webp"
import logo11 from "../assets/CompanyLogos/logo11.webp"
import logo12 from "../assets/CompanyLogos/logo12.webp"
import logo13 from "../assets/CompanyLogos/logo13.webp"
import logo14 from "../assets/CompanyLogos/logo14.webp"
import logo15 from "../assets/CompanyLogos/logo15.webp"
import logo16 from "../assets/CompanyLogos/logo16.webp"
import logo17 from "../assets/CompanyLogos/logo17.webp"

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
