import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { stackImages } from '../assets/Assets';
import Stack from '../animations/Stack';
import { Menu, ChevronDown, X } from 'lucide-react';

// NavBar Icons
import bowlIcon from '../assets/NavBarIcons/bowl.webp';
import burgerBoxIcon from '../assets/NavBarIcons/burger-box.webp';
import foodBoxIcon from '../assets/NavBarIcons/food-box.webp';
import hexagonBoxIcon from '../assets/NavBarIcons/hexagon-box.webp';
import paperCupIcon from '../assets/NavBarIcons/paper-cup.webp';
import pizzaBoxIcon from '../assets/NavBarIcons/pizza-box.webp';
const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsProductsOpen(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full relative">
      {/* navbar */}
      <div className={`fixed left-1/2 -translate-x-1/2 w-full md:w-[95%] max-w-7xl z-50 transition-all duration-300 ${isVisible ? ' opacity-100' : 'top-[-100px] opacity-0 pointer-events-none'}`}>
        <nav className="bg-white rounded-b-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] h-[70px] md:h-[90px] px-4 md:px-10 flex items-center justify-between">
          <div className="">
            <Link to="/" onClick={() => setIsProductsOpen(false)}>
              <img
                src={logo}
                alt="LeafedIndia Logo"
                width={180}
                height={60}
                decoding="async"
                className="h-15 md:h-25"
              />
            </Link>
          </div>

          <div style={{ fontFamily: "Montserrat" }} className="hidden lg:flex flex-1 justify-between pl-20 items-center gap-[2%] font-semibold text-[#333]">
            <Link to="/" onClick={() => setIsProductsOpen(false)} className="text-[#0a5d3c] hover:text-[#fb923c] transition-colors">Home</Link>
            <Link to="/#about" onClick={() => setIsProductsOpen(false)} className="text-[#0a5d3c] hover:text-[#fb923c] transition-colors">About Us</Link>

            <div
              className="group/mega flex items-center gap-1 cursor-pointer text-[#0a5d3c] hover:text-[#fb923c] transition-colors py-8"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 mt-0.5 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />

              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[850px] transition-all duration-300 z-50 ${isProductsOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex min-h-[380px]">
                  <div className="flex-1 p-10 pr-6">
                    <Link to="/products" onClick={() => setIsProductsOpen(false)} className="text-[#0d6e41] text-xl font-bold mb-8 hover:text-[#fb923c] transition-colors block">SEE All Products</Link>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                      <Link to="/product/food-box" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={foodBoxIcon} alt="Food Box" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper Food Box</span>
                        </div>
                      </Link>

                      <Link to="/product/bowls" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={bowlIcon} alt="Bowl" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Bowls</span>
                        </div>
                      </Link>

                      <Link to="/product/burger-box" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={burgerBoxIcon} alt="Burger Box" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Burger box</span>
                        </div>
                      </Link>

                      <Link to="/product/cups" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={paperCupIcon} alt="Paper Cup" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper cups</span>
                        </div>
                      </Link>

                      <Link to="/product/noodle-box" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={pizzaBoxIcon} alt="Noodle Box" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Noodle box</span>
                        </div>
                      </Link>

                      <div className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={hexagonBoxIcon} alt="Other Packaging" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <Link to="/products" onClick={() => setIsProductsOpen(false)} className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25] transition-colors">Other Food Packaging</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[300px] p-6 flex justify-center items-center">
                    <div style={{ width: 208, height: 208 }}>
                      <Stack
                        randomRotation={false}
                        sensitivity={200}
                        sendToBackOnClick={true}
                        cards={stackImages.map((src: any, i: number) => (
                          <img
                            key={i}
                            src={src}
                            alt={`card-${i + 1}`}
                            loading="lazy"
                            decoding="async"
                            width={208}
                            height={208}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            draggable="false"
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        ))}
                        autoplay={false}
                        autoplayDelay={3000}
                        pauseOnHover={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/#footer" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-1 cursor-pointer text-[#0a5d3c] hover:text-[#fb923c] transition-colors group">
              <span>Contact</span>
            </Link>
          </div>

          <div className="w-1/4 flex justify-end">
            <Link to="/studio">
              <button
                className="hidden lg:block group text-[14px] px-10  py-3  md:text-[16px]  text-center
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
              >          Customize Package
              </button>
            </Link>
            <button
              className="lg:hidden text-[#0d6e41] p-2 bg-white/80 rounded-xl hover:bg-gray-100 transition-colors pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu strokeWidth={3} className='w-7 h-7' />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Mobile Header */}
          <div className="p-6 flex items-center justify-between border-b-2 border-gray-100 bg-white sticky top-0 z-10">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img src={logo} alt="LeafedIndia Logo" className="h-15 w-auto" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#4b5563] hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto w-full">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-5 text-center text-lg font-medium text-[#1a2b4b] border-b border-gray-100"
            >
              Home
            </Link>

            {/* Mobile Products Accordion */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="w-full py-5 flex items-center justify-center gap-2 text-lg font-medium text-[#1a2b4b]"
              >
                <span>Product</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 bg-[#f9fafb] ${isMobileProductsOpen ? 'max-h-[1000px] opacity-100 py-8' : 'max-h-0 opacity-0 py-0'}`}>
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center text-[#86bc25] font-bold text-xl mb-10"
                >
                  SEE All Products
                </Link>
                <div className="grid grid-cols-2 gap-y-10 gap-x-4 px-4 w-full max-w-[320px] mx-auto">
                  {[
                    { to: "/product/food-box", name: "Paper Food Box", icon: foodBoxIcon },
                    { to: "/product/bowls", name: "Paper Bowls", icon: bowlIcon },
                    { to: "/product/cups", name: "Paper Cups", icon: paperCupIcon },
                    { to: "/product/burger-box", name: "Burger Box", icon: burgerBoxIcon },
                    { to: "/product/noodle-box", name: "Noodle Box", icon: pizzaBoxIcon },
                    { to: "/product/food-tray", name: "Other Food Packaging", icon: hexagonBoxIcon }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className="h-16 flex items-center justify-center">
                        <img src={item.icon} alt={item.name} className="w-16 h-16 object-contain mix-blend-multiply" />
                      </div>
                      <span className="text-sm font-semibold text-[#1a2b4b] border-b border-transparent group-hover:border-[#fb923c] pb-1 px-1 text-center transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-5 text-center text-lg font-medium text-[#1a2b4b] border-b border-gray-100"
            >
              About Us
            </Link>

            <Link
              to="/#blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-5 text-center text-lg font-medium text-[#1a2b4b] border-b border-gray-100"
            >
              Blog
            </Link>

            <Link
              to="/#footer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-5 text-center text-lg font-medium text-[#1a2b4b] border-b border-gray-100"
            >
              Contact
            </Link>


          </div>
        </div>

      </div>
    </header>
  );
};

export default NavBar;

