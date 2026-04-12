import type { FC } from 'react';
import footerLogo from '../assets/leafedIndiaFooterLogo.png';
import { Instagram, Linkedin, Facebook, Globe } from 'lucide-react';

const Footer: FC = () => {
    return (
        <footer id="footer" className="w-full">
            <div className="  mx-auto bg-[#12263a]   p-10 md:p-20 text-white relative overflow-hidden">

                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">

                    {/* Brand Section */}
                    <div className="flex flex-col gap-8 col-span-1 lg:col-span-1">
                        <div className="">
                            <img src={footerLogo} alt="LeafedIndia Logo" className="h-[90px] md:h-[130px] object-contain" />
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

                    {/* Contact Info */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold">Contact</h3>
                        <ul className="flex flex-col gap-4 text-gray-400 font-medium">
                            <li className="font-medium text-gray-400 hover:text-white transition-all">Tamil Nadu, India</li>
                            <li className="font-medium text-gray-400 hover:text-white transition-all"><a href="tel:+919025044947">+91 9025044947</a></li>
                            <li className="font-medium text-gray-400 hover:text-white transition-all"><a href="mailto:sales@leafedindia.com">sales@leafedindia.com</a></li>
                        </ul>
                    </div>

                    {/* About Links */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold">About</h3>
                        <ul className="flex flex-col gap-4 text-gray-400 font-medium">
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="/">Home</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="/products">Products</a></li>
                            <li className='hover:ml-2 hover:cursor-pointer hover:list-disc hover:text-white transition-all duration-200 font-medium'><a href="/products#faq">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-xl font-bold whitespace-nowrap">Connect With Us</h3>
                        <div className="flex flex-col gap-8">
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Join our community and stay updated with our latest sustainable innovations and packaging solutions.
                            </p>
                            {/* Social Icons */}
                            <div className="flex gap-5">
                                <a href="https://www.instagram.com/leafedindia/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/10 hover:bg-[#fb923c] hover:border-[#fb923c] transition-all text-white/80 hover:text-white group">
                                    <Instagram size={22} className="transition-transform group-hover:scale-110" />
                                </a>
                                <a href="https://www.linkedin.com/company/leafed-india/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/10 hover:bg-[#fb923c] hover:border-[#fb923c] transition-all text-white/80 hover:text-white group">
                                    <Linkedin size={22} className="transition-transform group-hover:scale-110" />
                                </a>
                                <a href="https://www.facebook.com/LeafedIndia/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/10 hover:bg-[#fb923c] hover:border-[#fb923c] transition-all text-white/80 hover:text-white group">
                                    <Facebook size={22} fill="currentColor" className="transition-transform group-hover:scale-110" />
                                </a>
                                <a href="mailto:sales@leafedindia.com" className="p-2.5 rounded-full border border-white/10 hover:bg-[#fb923c] hover:border-[#fb923c] transition-all text-white/80 hover:text-white group">
                                    <Globe size={22} className="transition-transform group-hover:scale-110" />
                                </a>
                            </div>

                            {/* Copyright */}
                            <p className="text-gray-500 text-sm mt-4">© 2026 Codac • All Rights Reserved</p>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
