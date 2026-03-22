import { Leaf } from 'lucide-react';
import noodlesBoxMain from "../../assets/Main/noodlesBoxMain.jpg";
import foodBoxMain from "../../assets/Main/foodBoxMain.jpg";
import foodTrayMain from "../../assets/Main/foodTrayMain.jpg";
import cupMain from "../../assets/Main/cupMain.jpg";
const WhyChooseUs = () => {
  return (
    <section className="mt-10 md:mt-20 relative w-full max-w-[92%] mx-auto p-6 md:p-10 lg:p-14 py-16 md:py-24 overflow-hidden rounded-[40px] border-2 border-[#86efac]/70 bg-[#fbfdfc] shadow-sm mb-20">

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

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center relative w-full">

        {/* Card 1 */}
        <div className="group relative perspective-[1000px] h-[260px] w-full flex items-center justify-center">
          <div className="relative w-full h-full transition-transform duration-800 transform-3d group-hover:transform-[rotateY(180deg)]">
            {/* Front */}
            <div className="absolute inset-0 backface-hidden border border-gray-300 rounded-[24px] p-6 flex flex-col items-center text-center bg-white shadow-sm justify-center">

              <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-[#12263a] text-[17px] font-bold mb-3">Certificate 1</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-gray-500 text-[13px] leading-relaxed font-medium">
                Our base manufacturing certification ensuring quality and safety across all production lines.
              </p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] border border-gray-300 rounded-[24px] overflow-hidden shadow-xl flex flex-col items-center justify-center p-1.5 bg-white">
              <img
                src={cupMain}
                alt="Direct Manufacturer"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-[20px] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Certificates Flip Card */}
        <div className="group relative perspective-[1000px] h-[260px] w-full flex items-center justify-center">
          <div className="relative w-full h-full transition-transform duration-800 transform-3d group-hover:transform-[rotateY(180deg)]">
            {/* Front */}
            <div className="absolute inset-0 backface-hidden border border-gray-300 rounded-[24px] p-6 flex flex-col items-center text-center bg-white shadow-sm justify-center">

              <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-[#12263a] text-[17px] font-bold mb-3">Certificate 2</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-gray-500 text-[13px] leading-relaxed font-medium">
                Sustainably sourced and environmentally verified materials for eco-conscious packaging.
              </p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] border border-gray-300 rounded-[24px] overflow-hidden shadow-xl flex flex-col items-center justify-center p-1.5 bg-white">
              <img
                src={noodlesBoxMain}
                alt="Certificate"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-[20px] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative perspective-[1000px] h-[260px] w-full flex items-center justify-center">
          <div className="relative w-full h-full transition-transform duration-800 transform-3d group-hover:transform-[rotateY(180deg)]">
            {/* Front */}
            <div className="absolute inset-0 backface-hidden border border-gray-300 rounded-[24px] p-6 flex flex-col items-center text-center bg-white shadow-sm justify-center">

              <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-[#12263a] text-[17px] font-bold mb-3">Certificate 3</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-gray-500 text-[13px] leading-relaxed font-medium">
                Quality management certification for custom-designed and tailored packaging solutions.
              </p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] border border-gray-300 rounded-[24px] overflow-hidden shadow-xl flex flex-col items-center justify-center p-1.5 bg-white">
              <img
                src={foodBoxMain}
                alt="Customizable"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-[20px] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative perspective-[1000px] h-[260px] w-full flex items-center justify-center">
          <div className="relative w-full h-full transition-transform duration-800 transform-3d group-hover:transform-[rotateY(180deg)]">
            {/* Front */}
            <div className="absolute inset-0 backface-hidden border border-gray-300 rounded-[24px] p-6 flex flex-col items-center text-center bg-white shadow-sm justify-center">

              <h3 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-[#12263a] text-[17px] font-bold mb-3">Certificate 4</h3>
              <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-gray-500 text-[13px] leading-relaxed font-medium">
                Global standards compliance trusted by industry leaders and international brands.
              </p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 backface-hidden transform-[rotateY(180deg)] border border-gray-300 rounded-[24px] overflow-hidden shadow-xl flex flex-col items-center justify-center p-1.5 bg-white">
              <img
                src={foodTrayMain}
                alt="Certificate 4"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-[20px] shadow-sm"
              />
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;
