import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { images } from "../pages/LandingPage/Gallery"
import Stack from '../animations/Stack';
import { Menu, ChevronDown } from 'lucide-react';

// NavBar Icons
import bowlIcon from '../assets/NavBar/bowl.webp';
import burgerBoxIcon from '../assets/NavBar/burger-box.webp';
import foodBoxIcon from '../assets/NavBar/food-box.webp';
import hexagonBoxIcon from '../assets/NavBar/hexagon-box.webp';
import paperCupIcon from '../assets/NavBar/paper-cup.webp';
import pizzaBoxIcon from '../assets/NavBar/pizza-box.webp';
const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isProductsOpen, setIsProductsOpen] = useState(false);

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

  return (
    <header className="w-full relative">
      {/* <div className="bg-[#0d6e41] text-white py-4 px-4 leading-0 flex flex-col items-center gap-4 text-[13px] font-medium lg:flex-row lg:justify-center lg:gap-12 lg:h-[42px] lg:py-0">
        <div className="flex flex-wrap text-[14px] font-semibold md:text-[16px] items-center justify-center gap-x-6 gap-y-2 lg:gap-12">
          <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
            <Phone className='md:w-[16px] md:h-[16px] w-[14px] h-[14px]' />
            <span>(+91) 9502952951</span>
          </div>
          <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
            <MailPlus className='md:w-[16px] md:h-[16px] w-[14px] h-[14px]' />
            <span>sales@leafedindia.com</span>
          </div>
        </div>
        <div className="flex text-[14px] font-semibold md:text-[16px] items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
          <MapPin className='md:w-[16px] md:h-[16px] w-[14px] h-[14px]' />
          <span>Chennai, India</span>
        </div>
      </div> */}
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
            <a href="#" className="text-[#0a5d3c] hover:text-[#fb923c] transition-colors">About Us</a>

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

                      <Link to="/product/paper-bowls" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
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

                      <Link to="/product/paper-cups" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={paperCupIcon} alt="Paper Cup" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Paper cups</span>
                        </div>
                      </Link>

                      <Link to="/product/pizza-box" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-6 group/item cursor-pointer">
                        <div className="w-14 h-14 bg-[#fefbea] rounded-xl flex items-center justify-center overflow-hidden group-hover/item:bg-[#86bc25] transition-colors p-0.5">
                          <img src={pizzaBoxIcon} alt="Pizza Box" className="w-full h-full object-contain" />
                        </div>
                        <div className="border-b border-gray-100 flex-1 pb-3 group-hover/item:border-[#86bc25] transition-colors">
                          <span className="text-[#0d6e41] text-md font-bold group-hover/item:text-[#86bc25]">Pizza box</span>
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
                        cards={images.map((src: any, i: number) => (
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

            <div onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-1 cursor-pointer text-[#0a5d3c] hover:text-[#fb923c] transition-colors group">
              <span>Contact</span>
            </div>
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
            <button className="lg:hidden text-[#0d6e41] p-2">
              <Menu strokeWidth={3} className='w-8 h-8' />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;

