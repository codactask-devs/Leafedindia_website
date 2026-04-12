import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cup from "../../assets/Main/cupMain.webp";
import bowl from "../../assets/Main/bowlMain.webp";
import burgerbox from "../../assets/Main/burgerBoxMain.webp";
import foodbox from "../../assets/Main/foodBoxMain.webp";
import foodtray from "../../assets/Main/foodTrayMain.webp";
import noodlesbox from "../../assets/Main/noodlesBoxMain.webp";

import InfiniteMenu, { type InfiniteMenuHandle } from "../../animations/InfiniteMenu";

// Asset folder mapping
const cupImages = Object.values(import.meta.glob('../../assets/CUPS/*.{svg,webp}', { eager: true, import: 'default' })) as string[];
const bowlImages = Object.values(import.meta.glob('../../assets/Main/bowl*.{svg,webp}', { eager: true, import: 'default' })) as string[];
const burgerImages = Object.values(import.meta.glob('../../assets/BURGER BOX/*.{svg,webp}', { eager: true, import: 'default' })) as string[];
const foodBoxImages = Object.values(import.meta.glob('../../assets/FOOD BOX/*.{svg,webp}', { eager: true, import: 'default' })) as string[];
const foodTrayImages = Object.values(import.meta.glob('../../assets/FOOD TRAY/*.{svg,webp}', { eager: true, import: 'default' })) as string[];
const noodleImages = Object.values(import.meta.glob('../../assets/NOODLES_BOX/*.{svg,webp}', { eager: true, import: 'default' })) as string[];

export const images = [
    cup,
    bowl,
    burgerbox,
    foodbox,
    foodtray,
    noodlesbox
];

const categoriesConfig = [
    { name: 'Cups', images: cupImages, defaultImg: cup, desc: 'Designed for drinks, crafted for brands.' },
    { name: 'Bowls', images: bowlImages, defaultImg: bowl, desc: 'Serve hearty meals with confidence.' },
    { name: 'Burger Box', images: burgerImages, defaultImg: burgerbox, desc: 'Packaging made for the ultimate bite.' },
    { name: 'Food Box', images: foodBoxImages, defaultImg: foodbox, desc: 'Reliable boxes for every takeaway.' },
    { name: 'Food Tray', images: foodTrayImages, defaultImg: foodtray, desc: 'Perfect trays for quick bites.' },
    { name: 'Noodles Box', images: noodleImages, defaultImg: noodlesbox, desc: 'Designed for flavors that travel.' },
];

const items = categoriesConfig.flatMap(cat => {
    const selection = cat.images.length > 0 ? cat.images.slice(0, 4) : [cat.defaultImg];
    
    // Map category names to actual product IDs in productData.tsx
    let productId = "";
    const name = cat.name.toLowerCase();
    if (name.includes('cup')) productId = 'paper-cups';
    else if (name.includes('bowl')) productId = 'paper-bowls';
    else if (name.includes('burger')) productId = 'burger-box';
    else if (name.includes('food box')) productId = 'food-box';
    else if (name.includes('tray')) productId = 'paper-tray';
    else if (name.includes('noodles')) productId = 'hexagon-box'; // Using hexagon as proxy if noodles page missing
    else productId = 'products'; // Fallback to all products

    return selection.map(img => ({
        image: img,
        link: productId === 'products' ? '/products' : `/product/${productId}`,
        title: cat.name,
        description: cat.desc
    }));
});

const Gallery: React.FC = () => {
    const menuRef = useRef<InfiniteMenuHandle>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hasPulsed = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasPulsed.current) {
                    setTimeout(() => {
                        menuRef.current?.pulse();
                        hasPulsed.current = true;
                    }, 500);
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div id="collections" ref={containerRef} className="my-30 w-full mx-auto bg-[#fb923c] pb-20 rounded-[40px]">
            <p style={{ fontFamily: "'Montserrat', sans-serif" }} className='pt-10 text-[35px] md:text-[65px] text-[#fefbea] leading-none text-center font-extrabold mt-10 md:mt-25 lg:mt-35 mb-6 ml-[6%]' >Our Eco Collections</p>

            <div style={{ height: '600px', position: 'relative' }} className="w-[90%] mx-auto bg-[#dcfce7] rounded-3xl overflow-hidden shadow-2xl ">
                <InfiniteMenu
                    ref={menuRef}
                    items={items}
                    scale={1}
                    onButtonClick={(item) => navigate(item.link)}
                />
            </div>
        </div>
    );
};

export default Gallery;