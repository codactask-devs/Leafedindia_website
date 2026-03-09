import logo from '../assets/logo.svg';
import { Phone, MailPlus, MapPin, Menu, ChevronDown, Package, Box, CupSoda as Cup, Snowflake, UtensilsCrossed as Utensils, Archive } from 'lucide-react';
const NavBar = () => {
  return (
    <header className="w-full relative">
      <div className="bg-[#0d6e41] text-white py-4 px-4 leading-0 flex flex-col items-center gap-4 text-[13px] font-medium lg:flex-row lg:justify-center lg:gap-12 lg:h-[42px] lg:py-0">
        <div className="flex flex-wrap text-[14px] font-semibold md:text-[16px] items-center justify-center gap-x-6 gap-y-2 lg:gap-12">
          <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
            <Phone className='md:w-[16px] md:h-[16px] w-[14px] h-[14px]' />
            <span>(+91) 9025093823</span>
          </div>
          <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
            <MailPlus className='md:w-[16px] md:h-[16px] w-[14px] h-[14px]' />
            <span>codec@gmail.com</span>
          </div>
        </div>
        <div className="flex text-[14px] font-semibold md:text-[16px] items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
          <MapPin className='md:w-[16px] md:h-[16px] w-[14px] h-[14px]' />
          <span>Chennai, Tamilnadu</span>
        </div>
      </div>
      {/* navbar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[80px] lg:top-[42px] w-[95%] max-w-7xl z-50">
        {/* <div className="fixed left-1/2 -translate-x-1/2 top-[80px] lg:top-[42px] w-[95%] max-w-7xl z-50"> */}
        <nav className="bg-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.12)] h-[70px] md:h-[90px] px-4 md:px-10 flex items-center justify-between">
          <div className="">
            <img src={logo} alt="LeafedIndia Logo" className="h-15 md:h-25" />
          </div>

          <div style={{ fontFamily: "Montserrat" }} className="hidden lg:flex flex-1 justify-between pl-20 items-center gap-[2%] font-semibold text-[#333]">
            <a href="#" className="text-[#0a5d3c] hover:text-[#fb923c] transition-colors">Home</a>
            <a href="#" className="text-[#0a5d3c] hover:text-[#fb923c] transition-colors">About Us</a>

            <div className="group/mega flex items-center gap-1 cursor-pointer text-[#0a5d3c] hover:text-[#fb923c] transition-colors py-8">
              <span>Products</span>
              <ChevronDown className="w-4 h-4 mt-0.5 group-hover/mega:rotate-180 transition-transform" />

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[850px] invisible group-hover/mega:visible opacity-0 group-hover/mega:opacity-100 transition-all duration-300 z-50">
                <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex min-h-[380px]">
                  <div className="flex-1 p-10 pr-6">
                    <h2 className="text-[#86bc25] text-xl font-bold mb-8">SEE All Products</h2>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-[#fefbea] rounded-xl flex items-center justify-center group-hover/item:bg-[#86bc25] transition-colors">
                          <Box className="w-6 h-6 text-[#0d6e41] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper Lunch Box</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-[#fefbea] rounded-xl flex items-center justify-center group-hover/item:bg-[#86bc25] transition-colors">
                          <Snowflake className="w-6 h-6 text-[#0d6e41] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper Bowls</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-[#fefbea] rounded-xl flex items-center justify-center group-hover/item:bg-[#86bc25] transition-colors">
                          <Cup className="w-6 h-6 text-[#0d6e41] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper Cups</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-[#fefbea] rounded-xl flex items-center justify-center group-hover/item:bg-[#86bc25] transition-colors">
                          <Archive className="w-6 h-6 text-[#0d6e41] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper Bag</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-[#fefbea] rounded-xl flex items-center justify-center group-hover/item:bg-[#86bc25] transition-colors">
                          <Utensils className="w-6 h-6 text-[#0d6e41] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Cutlery</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-12 h-12 bg-[#fefbea] rounded-xl flex items-center justify-center group-hover/item:bg-[#86bc25] transition-colors">
                          <Package className="w-6 h-6 text-[#0d6e41] group-hover/item:text-white transition-colors" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Other Food Packaging</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[300px] p-6">
                    <div className="bg-[#fefbea] h-full rounded-[30px] border-2 border-dashed border-[#86bc25]/30 flex flex-col items-center justify-center text-center p-8 group/placeholder">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover/placeholder:scale-110 transition-transform">
                        <Package className="w-8 h-8 text-[#86bc25]" />
                      </div>
                      <h3 className="text-[#0d6e41] text-lg font-bold mb-1">Coming Soon</h3>
                      <p className="text-gray-500 text-xs">
                        New eco-friendly solutions are on the way.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 cursor-pointer text-[#0a5d3c] hover:text-[#fb923c] transition-colors group">
              <span>Contact</span>
            </div>
          </div>

          <div className="w-1/4 flex justify-end">
            <button
              className="hidden lg:block group text-[14px] px-14  py-3  md:text-[16px]  text-center
                   text-white font-medium 
                  border border-transparent
                  hover:border-[#0d6e41]
                  rounded-full
                  transition-all duration-300
                
                 hover:bg-[#fefbea]
                 hover:text-[#0d6e41]
                  
                  hover:-translate-x-[4px]
                  hover:-translate-y-[4px]
                  
                  hover:shadow-[4px_4px_0px_#0d6e41]
                  hover: cursor-pointer
                  bg-[#0d6e41]
                  flex items-center 
                  "
            >              Contact Us
            </button>
            <button className="lg:hidden text-[#0d6e41] p-2">
              <Menu strokeWidth={3} className='w-8 h-8' />
            </button>
          </div>
        </nav>
      </div>
    </header >
  );
};

export default NavBar;

