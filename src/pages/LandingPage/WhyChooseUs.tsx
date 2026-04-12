import { Leaf } from 'lucide-react';
import { useState } from 'react';
import cert1 from "../../assets/Certificates/cert1.webp";
import cert2 from "../../assets/Certificates/cert2.webp";
import cert3 from "../../assets/Certificates/cert3.webp";
import certLogo1 from "../../assets/Certificates/certLogo1.webp";
import certLogo2 from "../../assets/Certificates/certLogo2.webp";
import certLogo3 from "../../assets/Certificates/certLogo3.avif";
import foodTrayMain from "../../assets/Main/foodTrayMain.webp";
const WhyChooseUs = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const certificateData = [

    {
      title: "FSC Certification",
      description: "Forest Stewardship Council certification verifying sustainably sourced materials.",
      logo: certLogo2,
      certImg: cert2
    },

    {
      title: "ISO 9001:2015",
      description: "Quality Management System certification ensuring excellence across paper manufacturing.",
      logo: certLogo1,
      certImg: cert1
    },
    {
      title: "ISO 22000:2018",
      description: "Food Safety Management System certification for premium packaging safety.",
      logo: certLogo3,
      certImg: cert3
    },
  ];

  return (
    <section id="about" className="mt-10 bg-white md:mt-20 relative w-full max-w-[92%] mx-auto p-6 md:p-10 lg:p-14 py-16 md:py-24 overflow-hidden rounded-[40px] border-2 border-[#86efac]/70  shadow-sm mb-20">

      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #86efac 1px, transparent 1px),
            linear-gradient(to bottom, #86efac 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Top Section: Header & Images */}
      <div className="flex flex-col lg:flex-row gap-16 items-center mb-28 relative z-1 w-full">
        <div className="w-full lg:w-[55%] relative ">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-[#0d6e41] font-bold text-sm tracking-wide mb-6">
            <Leaf className="w-4 h-4" />
            SUSTAINABILITY FIRST
          </div>
          <h2
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-[36px] md:text-[52px] font-black text-center lg:text-left leading-[1.1] text-[#12263a] mb-8 tracking-tight"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0d6e41] to-[#1a9e5e]">Us?</span>
          </h2>
          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-gray-600 font-medium text-[16px] md:text-[18px] mb-6 leading-relaxed text-center lg:text-left"
          >
            LeafedIndia is a leader in the production of environmentally-friendly, compostable paper cups. We are committed to reducing waste and promoting sustainable practices by providing customers with high-quality, eco-friendly products that are designed to minimize their impact on the environment.
          </p>
          <div className="md:w-[80%] lg:w-80 h-1 bg-linear-to-r from-[#0d6e41] to-transparent rounded-full mx-auto lg:mx-0 mt-8 mb-6"></div>
          <p
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            className="text-gray-500 font-medium text-[15px] leading-relaxed text-center lg:text-left"
          >
            Our mission is to create a better future for our planet by producing innovative, sustainable solutions that reduce waste and protect the environment.
          </p>
        </div>

        <div className="w-full lg:w-[45%] flex justify-center  relative">
          <div className="absolute inset-0 bg-green-100 rounded-[40px] transform rotate-3 scale-105 transition-transform duration-500 hover:rotate-6"></div>
          <img
            src={foodTrayMain}
            alt="Eco Packaging"
            loading="lazy"
            decoding="async"
            width={500}
            height={375}
            className="w-full h-auto max-w-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out relative rounded-2xl"
          />
        </div>
      </div>

      {/* Certificate Heading */}
      <h2
        style={{ fontFamily: "'Montserrat', sans-serif" }}
        className="text-[32px] md:text-[40px] font-black text-center lg:text-left leading-[1.1] text-[#12263a] mb-12 tracking-tight relative z-1"
      >
        Certificates
      </h2>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 items-center relative w-full">
        {certificateData.map((cert, index) => (
          <div
            key={index}
            className="group  relative perspective-[1000px] h-[340px] w-full flex items-center justify-center cursor-pointer"
            onClick={() => toggleFlip(index)}
          >
            <div
              className={`relative  w-full h-full transition-transform duration-800 transform-3d ${flippedCards[index] ? 'rotate-y-180' : 'group-hover:rotate-y-180'}`}
              style={{ transformStyle: 'preserve-3d', transform: flippedCards[index] ? 'rotateY(180deg)' : undefined }}
            >
              {/* Front */}
              <div className="absolute inset-0  backface-hidden border-2 border-gray-100 rounded-[32px] p-8 flex flex-col items-center justify-center bg-white shadow-2xl transition-all duration-300 group-hover:border-[#86efac]/50">
                <div className="w-full h-full flex items-center justify-center p-4">
                  <img
                    src={cert.logo}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] border-2  border-gray-100 rounded-[32px] overflow-hidden shadow-xl flex flex-col items-center justify-center p-2 bg-white transition-all duration-300">
                <img
                  src={cert.certImg}
                  alt={`${cert.title} Certificate`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain rounded-[24px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default WhyChooseUs;
