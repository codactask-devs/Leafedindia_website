import type { FC } from 'react';
import logo from '../assets/logo.svg';
import { Facebook, Twitter, Youtube, Globe, ArrowRight } from 'lucide-react';

const Footer: FC = () => {
    return (
        <footer className="w-full">
            <div className="  mx-auto bg-[#12263a] rounded-t-[40px] md:rounded-t-[60px] p-10 md:p-20 text-white relative overflow-hidden">

                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-8 col-span-1 lg:col-span-1">
                        <div className="">
                            <img src={logo} alt="LeafedIndia Logo" className="h-16 md:h-25 brightness-0 invert" />
                        </div>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[300px]">
                            Sustainable packaging solutions designed for modern brands. Eco-friendly, customizable, and crafted to elevate your product experience.
                        </p>
                        {/* Decorative Dots */}
                        <div className="flex gap-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                            ))}
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="flex flex-col  gap-6">
                        <h3 className="text-xl font-bold">Company</h3>
                        <ul className="flex flex-col gap-4 text-gray-400 font-medium">
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Terms & Conditions</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Privacy Policy</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Project Protections</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    {/* About Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold">About</h3>
                        <ul className="flex flex-col gap-4 text-gray-400 font-medium">
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Blog</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Contact</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Home</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="#">Services</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold whitespace-nowrap">Sign Up To Our Newsletters</h3>
                        <div className="flex flex-col gap-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Text"
                                    className="w-full bg-white/10 border border-white/20 rounded-full py-2.5 px-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fb923c] transition-all"
                                />
                                {/* <button className="absolute right-1.5 top-1.5 bg-[#fb923c] hover:bg-[#f97316] text-white px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)]"> */}
                                <button
                                    className="absolute right-1.5 top-[5px]  lg:block group text-[12px] px-3.5  py-1.5  md:text-[14px]  text-center
                   text-white font-medium 
                  border border-transparent
                  hover:border-[#fb923c]
                  rounded-full
                  transition-all duration-300
                
                 hover:bg-[#fefbea]
                 hover:text-[#fb923c]
                  
                  hover:-translate-x-[4px]
                  hover:-translate-y-[4px]
                  
                  hover:shadow-[4px_4px_0px_#fb923c]
                  hover: cursor-pointer
                  bg-[#fb923c]
                  flex items-center 
                  "
                                >              Contact Us
                                </button>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-5 mt-2">
                                <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white">
                                    <Facebook size={20} fill="currentColor" />
                                </a>
                                <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white">
                                    <Twitter size={20} fill="currentColor" />
                                </a>
                                <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white">
                                    <Youtube size={20} fill="currentColor" />
                                </a>
                                <a href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-all text-white/80 hover:text-white">
                                    <Globe size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                    <p>© 2026 Codac • All Rights Reserved</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
