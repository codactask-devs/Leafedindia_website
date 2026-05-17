import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryAssets } from "../../assets/Assets";
import { products } from '../SingleProductPage/productData';
import InfiniteMenu, { type InfiniteMenuHandle } from "../../animations/InfiniteMenu";

// Helper to map gallery filenames (e.g. "cup1.webp") to Product IDs
const galleryFilenameToId = (filename: string): string => {
    const normal = filename.toLowerCase();
    if (normal.includes('cup')) return 'cups';
    if (normal.includes('bowl')) return 'bowls';
    if (normal.includes('burger')) return 'burger-box';
    if (normal.includes('foodbox')) return 'food-box';
    if (normal.includes('foodtray')) return 'food-tray';
    if (normal.includes('noodle')) return 'noodle-box';
    if (normal.includes('hexagon')) return 'hexagon-box';
    return 'products'; // Fallback
};

// Brand-specific catchy descriptions for the gallery
const galleryPhrases: Record<string, string> = {
    'cups': 'Designed for drinks, crafted for brands.',
    'bowls': 'Serve hearty meals with confidence.',
    'burger-box': 'Packaging made for the ultimate bite.',
    'food-box': 'Reliable boxes for every takeaway.',
    'food-tray': 'Perfect trays for quick bites.',
    'noodle-box': 'Designed for flavors that travel.',
    'hexagon-box': 'Artistic forms for special gifting.'
};

const items = Object.entries(galleryAssets).map(([path, imported]) => {
    const filename = path.split('/').pop()?.split('.')[0] || '';
    const productId = galleryFilenameToId(filename);
    const product = products[productId];
    
    return {
        image: imported as string,
        link: product ? `/product/${productId}` : `/products`,
        title: product?.productName || filename.charAt(0).toUpperCase() + filename.slice(1),
        description: galleryPhrases[productId] || product?.catchPhrase || "Eco-friendly packaging specialized for your brand."
    };
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