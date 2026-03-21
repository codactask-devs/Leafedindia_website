import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cup from "../../assets/Main/cupMain.jpg";
import bowl from "../../assets/Main/bowlMain.jpg";
import burgerbox from "../../assets/Main/burgerBoxMain.jpg";
import foodbox from "../../assets/Main/foodBoxMain.jpg";
import foodtray from "../../assets/Main/foodTrayMain.jpg";
import noodlesbox from "../../assets/Main/noodlesBoxMain.jpg";

import InfiniteMenu from "../../animations/InfiniteMenu";
import SimpleCarousel from "../../animations/SimpleCarousel";

// Asset folder mapping
//nothing
const cupImages = Object.values(import.meta.glob('../../assets/CUPS/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const bowlImages = Object.values(import.meta.glob('../../assets/Main/bowl*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const burgerImages = Object.values(import.meta.glob('../../assets/BURGER BOX/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const foodBoxImages = Object.values(import.meta.glob('../../assets/FOOD BOX/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const foodTrayImages = Object.values(import.meta.glob('../../assets/FOOD TRAY/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const noodleImages = Object.values(import.meta.glob('../../assets/NOODLES_BOX/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];

const folderMap: Record<string, string[]> = {
    'Cups': cupImages,
    'Bowls': bowlImages,
    'Burger Box': burgerImages,
    'Food Box': foodBoxImages,
    'Food Tray': foodTrayImages,
    'Noodles Box': noodleImages
};


export const images = [
    cup,
    bowl,
    burgerbox,
    foodbox,
    foodtray,
];

const items = [
    {
        image: cup,
        link: 'https://google.com/',
        title: 'Cups',
        description: 'Designed for drinks, crafted for brands.'
    },
    {
        image: bowl,
        link: 'https://google.com/',
        title: 'Bowls',
        description: 'Serve hearty meals with confidence.'
    },
    {
        image: burgerbox,
        link: 'https://google.com/',
        title: 'Burger Box',
        description: 'Packagine made for the ultimate bite.'
    },
    {
        image: foodbox,
        link: 'https://google.com/',
        title: 'Food Box',
        description: 'Reliable boxes for every takeaway.'
    },
    {
        image: foodtray,
        link: 'https://google.com/',
        title: 'Food Tray',
        description: 'Perfect trays for quick bites.'
    },
    {
        image: noodlesbox,
        link: 'https://google.com/',
        title: 'Noodles Box',
        description: 'Designed for flavors that travel.'
    }
];

const Gallery = () => {
    const [viewMode, setViewMode] = useState<'menu' | 'carousel'>('menu');
    const [activeCategory, setActiveCategory] = useState<{ title: string, images: string[] } | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleOpenCarousel = (item: any) => {
        const folderImages = folderMap[item.title] || [];
        setActiveCategory({
            title: item.title,
            images: folderImages
        });
        setViewMode('carousel');
    };

    return (
        <div className="my-30 w-full mx-auto ">
            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className=' text-[40px] font-bold text-[#12263a] mt-10 md:mt-25 lg:mt-35 mb-4  ml-[6%]' >Gallery</p>


            <div style={{ height: '600px', position: 'relative' }} className="w-[90%] mx-auto bg-[#dcfce7] rounded-3xl overflow-hidden shadow-2xl ">
                <AnimatePresence mode="wait">
                    {viewMode === 'menu' ? (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full h-full relative cursor-none"
                            onPointerDown={() => setHasInteracted(true)}
                            onPointerMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMousePos({
                                    x: e.clientX - rect.left,
                                    y: e.clientY - rect.top
                                });
                            }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <AnimatePresence>
                                {!hasInteracted && (isMobile || isHovering) && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={isMobile ? {
                                            left: '50%',
                                            top: '50%',
                                            x: "-50%",
                                            y: "-50%",
                                            position: "absolute"
                                        } : {
                                            left: mousePos.x,
                                            top: mousePos.y,
                                            x: 10,
                                            y: -11,
                                            position: "absolute"
                                        }}
                                        className="z-50 pointer-events-none"
                                    >
                                        <div className="bg-gray-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 whitespace-nowrap">
                                            <span className="text-[12px] md:text-[11px] font-bold tracking-tight uppercase">
                                                {isMobile ? "Swipe to Explore" : "Swipe"}
                                            </span>
                                            {isMobile && (
                                                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <InfiniteMenu
                                items={items}
                                scale={1}
                                onButtonClick={(item) => {
                                    setHasInteracted(true);
                                    handleOpenCarousel(item);
                                }}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="carousel"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full h-full"
                        >
                            {activeCategory && (
                                <SimpleCarousel
                                    title={activeCategory.title}
                                    images={activeCategory.images}
                                    onBack={() => setViewMode('menu')}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};

export default Gallery;