import logo from '../assets/logo.svg';

const NavBar = () => {
  return (
    <header className="w-full relative">
      <div className="bg-[#0a5d3c] text-white py-3 px-4 flex justify-center items-center gap-12 text-[14px] font-medium min-h-[48px]">
        <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span>(+91) 9025044947</span>
        </div>
        <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <span>codec@gmail.com</span>
        </div>
        <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>Chennai, Tamilnad</span>
        </div>
      </div>

      {/* Main Navbar (Floating) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[32px] w-[95%] max-w-7xl">
        <nav className="bg-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.12)] h-[90px] px-10 flex items-center justify-between">
          <div className="w-1/4">
            <img src={logo} alt="LeafedIndia Logo" className="h-10" />
          </div>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-12 font-bold text-[#333]">
            <a href="#" className="text-[#0a5d3c] hover:text-[#fb923c] transition-colors">Home</a>
            <a href="#" className="hover:text-[#0a5d3c] transition-colors">About Us</a>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a5d3c] transition-colors group">
              <span>Services</span>
              <svg className="w-4 h-4 mt-0.5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#0a5d3c] transition-colors group">
              <span>Pages</span>
              <svg className="w-4 h-4 mt-0.5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="w-1/4 flex justify-end">
            <button className="bg-[#fb923c] text-white px-10 py-4 rounded-full font-extrabold shadow-[0_10px_20px_rgba(251,146,60,0.4)] hover:shadow-none hover:bg-orange-600 transition-all transform hover:-translate-y-1 active:translate-y-0">
              Contact Us
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;