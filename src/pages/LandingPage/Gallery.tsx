import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAssets } from "../../assets/Assets";
import InfiniteMenu, { type InfiniteMenuHandle } from "../../animations/InfiniteMenu";

const cupImages = productAssets["Cups"]?.variants || [];
const bowlImages = productAssets["Bowls"]?.variants || [];
const burgerImages = productAssets["BurgerBox"]?.variants || [];
const foodBoxImages = productAssets["FoodBox"]?.variants || [];
const foodTrayImages = productAssets["FoodTray"]?.variants || [];
const noodleImages = productAssets["NoodleBox"]?.variants || [];

export const images = [
    productAssets["Cups"]?.main || "",
    productAssets["Bowls"]?.main || "",
    productAssets["BurgerBox"]?.main || "",
    productAssets["FoodBox"]?.main || "",
    productAssets["FoodTray"]?.main || "",
    productAssets["NoodleBox"]?.main || ""
];

const categoriesConfig = [
    { name: 'Cups', images: cupImages, defaultImg: productAssets["Cups"]?.main || "", desc: 'Designed for drinks, crafted for brands.' },
    { name: 'Bowls', images: bowlImages, defaultImg: productAssets["Bowls"]?.main || "", desc: 'Serve hearty meals with confidence.' },
    { name: 'Burger Box', images: burgerImages, defaultImg: productAssets["BurgerBox"]?.main || "", desc: 'Packaging made for the ultimate bite.' },
    { name: 'Food Box', images: foodBoxImages, defaultImg: productAssets["FoodBox"]?.main || "", desc: 'Reliable boxes for every takeaway.' },
    { name: 'Food Tray', images: foodTrayImages, defaultImg: productAssets["FoodTray"]?.main || "", desc: 'Perfect trays for quick bites.' },
    { name: 'Noodles Box', images: noodleImages, defaultImg: productAssets["NoodleBox"]?.main || "", desc: 'Designed for flavors that travel.' },
];

const items = categoriesConfig.flatMap(cat => {
    const selection = cat.images.length > 0 ? cat.images.slice(0, 4) : [cat.defaultImg];
    
    // Map category names to actual product IDs in productData.tsx
    let productId = "";
    const name = cat.name.toLowerCase();
    if (name.includes('cup')) productId = 'cups';
    else if (name.includes('bowl')) productId = 'bowls';
    else if (name.includes('burger')) productId = 'burger-box';
    else if (name.includes('food box')) productId = 'food-box';
    else if (name.includes('tray')) productId = 'food-tray';
    else if (name.includes('noodles')) productId = 'noodle-box';
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