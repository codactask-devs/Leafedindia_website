import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cup from "../assets/Main/cupMain.jpg";
import bowl from "../assets/Main/bowlMain.jpg";
import burgerbox from "../assets/Main/burgerBoxMain.jpg";
import foodbox from "../assets/Main/foodBoxMain.jpg";
import foodtray from "../assets/Main/foodTrayMain.jpg";
import noodlesbox from "../assets/Main/noodlesBoxMain.jpg";

import InfiniteMenu from "../animations/InfiniteMenu";
import SimpleCarousel from "../animations/SimpleCarousel";

// Asset folder mapping
const cupImages = Object.values(import.meta.glob('../assets/CUPS/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const bowlImages = Object.values(import.meta.glob('../assets/Main/bowl*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const burgerImages = Object.values(import.meta.glob('../assets/BURGER BOX/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const foodBoxImages = Object.values(import.meta.glob('../assets/FOOD BOX/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const foodTrayImages = Object.values(import.meta.glob('../assets/FOOD TRAY/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
const noodleImages = Object.values(import.meta.glob('../assets/NOODLES_BOX/*.{svg,jpg}', { eager: true, import: 'default' })) as string[];
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
            {/* <div style={{ width: 208, height: 208 }}>
                <Stack
                    randomRotation={false}
                    sensitivity={200}
                    sendToBackOnClick={true}
                    cards={images.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`card-${i + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            draggable="false"
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    ))}
                    autoplay={false}
                    autoplayDelay={3000}
                    pauseOnHover={false}
                />
            </div> */}

            <div style={{ height: '600px', position: 'relative' }} className="w-[90%] mx-auto bg-[#dcfce7] rounded-3xl overflow-hidden shadow-2xl ">
                <AnimatePresence mode="wait">
                    {viewMode === 'menu' ? (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full h-full"
                        >
                            <InfiniteMenu
                                items={items}
                                scale={1}
                                onButtonClick={handleOpenCarousel}
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