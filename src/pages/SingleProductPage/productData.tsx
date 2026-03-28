import React from "react";
import bowlMain from "../../assets/Main/bowlMain.webp";
import cupMain from "../../assets/Main/cupMain.webp";
import burgerBoxMain from "../../assets/Main/burgerBoxMain.webp";
import foodBoxMain from "../../assets/Main/foodBoxMain.webp";
import foodTrayMain from "../../assets/Main/foodTrayMain.webp";
import noodlesBoxMain from "../../assets/Main/noodlesBoxMain.webp";
import pizzaBox from "../../assets/FOOD BOX/pizzaBox.webp";

// Variant Assets
import foodBox1 from "../../assets/FOOD BOX/foodBox1.webp";
import foodBox2 from "../../assets/FOOD BOX/foodBox2.webp";
import foodBox3 from "../../assets/FOOD BOX/foodBox3.webp";
import burgerBox3 from "../../assets/BURGER BOX/burgerBox3.webp";
import burgerBox1 from "../../assets/BURGER BOX/burgerbox1.webp";
import drinkCupMockup from "../../assets/CUPS/Drink Cup Mockup.webp";
import singleWallCup from "../../assets/CUPS/SINGLE WALL CUP .webp";

export interface Variant {
    name: string;
    description: string;
    image: string;
}

export interface SizeRow {
    volume: string;
    dimension: string;
    pieces: string;
}

export interface SpecificationData {
    volumeOptions: string; // e.g. "500cc, 520cc, 700cc, 750cc, 850cc, 1000cc, 1100cc, 1200cc, 1300cc, and 1500cc"
    tableData: SizeRow[];
}

export interface ProductData {
    id: string;
    productName: string;
    catchPhrase: string;
    title: React.ReactNode;
    description: string;
    heroImage: string;
    variantsCatchPhrase: string;
    variantsTitle: string;
    variantsDescription: string;
    variants: Variant[];
    featuresImage: string;
    specs: SpecificationData;
    ctaImage: string;
}

export const products: Record<string, ProductData> = {
    "paper-bowls": {
        id: "paper-bowls",
        productName: "Bowls",
        catchPhrase: "Premium Sustainability",
        title: <>Serve <span className="text-[#fb923c]">Style</span> & <br />Sustainability</>,
        description: "Foodabox offers a versatile range of premium paper bowls designed for modern food brands who prioritize functionality without compromising on design.",
        heroImage: bowlMain,
        variantsCatchPhrase: "CONSCIOUS DINING",
        variantsTitle: "Eco-Friendly Paper Bowls",
        variantsDescription: "Redefining convenience through sustainable craftsmanship. Our bowls are designed for the modern table, merging durability with earth-first materials.",
        variants: [
            {
                name: "Paper Bowl",
                description: "Keeps meals fresh and spill-free with reinforced wall design.",
                image: bowlMain
            },
            {
                name: "Compartment Bowl",
                description: "Perfectly separated spaces for organized, balanced meals on the go.",
                image: foodBox2
            },
            {
                name: "Bowl Lid",
                description: "A secure, leak-proof seal crafted from plant-based polymers.",
                image: foodBox1
            },
            {
                name: "Customized Bowl",
                description: "Tailored branding solutions for businesses that value aesthetics and ethics.",
                image: foodBox3
            }
        ],
        featuresImage: bowlMain,
        specs: {
            volumeOptions: "500cc, 520cc, 700cc, 750cc, 850cc, 1000cc, 1100cc, 1200cc, 1300cc, and 1500cc",
            tableData: [
                { volume: "500cc / 16.91oz", dimension: "150*128*45", pieces: "300pcs" },
                { volume: "520cc / 17.58oz", dimension: "110*90*85", pieces: "1000pcs" },
                { volume: "700cc / 23.67oz", dimension: "137*115*70", pieces: "450pcs" },
                { volume: "750cc / 25.36oz", dimension: "150*128*60", pieces: "300pcs" },
                { volume: "850cc / 28.74oz", dimension: "140*110*90", pieces: "600pcs" },
                { volume: "1000cc / 33.81oz", dimension: "150*128*75", pieces: "300pcs" },
                { volume: "1100cc / 37.20oz", dimension: "165*144*68", pieces: "300pcs" },
                { volume: "1200cc / 40.58oz", dimension: "165*144*75", pieces: "300pcs" },
                { volume: "1300cc / 43.96oz", dimension: "185*160*65", pieces: "300pcs" },
                { volume: "1500cc / 50.72oz", dimension: "185*160*84", pieces: "300pcs" }
            ]
        },
        ctaImage: bowlMain
    },
    "paper-cups": {
        id: "paper-cups",
        productName: "Paper Cups",
        catchPhrase: "Eco-Friendly Sips",
        title: <>Pure <span className="text-[#fb923c]">Taste</span>, <br />Zero Waste</>,
        description: "Our high-quality paper cups are designed for both hot and cold beverages, providing a leak-proof and planet-friendly experience for your customers.",
        heroImage: cupMain,
        variantsCatchPhrase: "BETTER BEVERAGES",
        variantsTitle: "Sustainable Paper Cups",
        variantsDescription: "Engineered for excellence and designed for the planet. Our cup range provides the perfect vessel for every drink experience.",
        variants: [
            {
                name: "Single Wall Cup",
                description: "Classic design with premium coating for everyday hot and cold drinks.",
                image: singleWallCup
            },
            {
                name: "Double Wall Cup",
                description: "Enhanced insulation to keep beverages hot while protecting hands.",
                image: cupMain
            },
            {
                name: "Drink Mockup",
                description: "The ideal choice for icy cold refreshments and vibrant smoothies.",
                image: drinkCupMockup
            }
        ],
        featuresImage: drinkCupMockup,
        specs: {
            volumeOptions: "4oz, 6oz, 8oz, 12oz, 16oz, and 22oz",
            tableData: [
                { volume: "4oz / 120ml", dimension: "62*45*43", pieces: "1000pcs" },
                { volume: "6oz / 180ml", dimension: "70*50*70", pieces: "1000pcs" },
                { volume: "8oz / 240ml", dimension: "80*56*90", pieces: "1000pcs" },
                { volume: "12oz / 360ml", dimension: "90*60*110", pieces: "1000pcs" },
                { volume: "16oz / 480ml", dimension: "90*60*130", pieces: "500pcs" }
            ]
        },
        ctaImage: cupMain
    },
    "burger-box": {
        id: "burger-box",
        productName: "Burger Box",
        catchPhrase: "Fresh & Secure",
        title: <>The <span className="text-[#fb923c]">Ultimate</span> <br />Burger Box</>,
        description: "Breathable, sturdy, and oil-resistant packaging that keeps your burgers fresh, hot, and perfectly presented from kitchen to customer.",
        heroImage: burgerBoxMain,
        variantsCatchPhrase: "FAST FEEDING",
        variantsTitle: "Premium Burger Packaging",
        variantsDescription: "Give your burgers the home they deserve. Our boxes maintain temperature and texture for the perfect bite.",
        variants: [
            {
                name: "Classic Burger Box",
                description: "Secure, breathable design for standard sized gourmet burgers.",
                image: burgerBoxMain
            },
            {
                name: "Large Burger Box",
                description: "Extra space for loaded burgers with multiple patties and toppings.",
                image: burgerBox3
            },
            {
                name: "Vented Box",
                description: "Specialized ventilation to prevent sogginess and maintain crispness.",
                image: burgerBox1
            }
        ],
        featuresImage: burgerBox3,
        specs: {
            volumeOptions: "Standard, Large, Extra Large",
            tableData: [
                { volume: "Standard", dimension: "100*100*70", pieces: "500pcs" },
                { volume: "Large", dimension: "120*120*80", pieces: "400pcs" },
                { volume: "Extra Large", dimension: "140*140*90", pieces: "200pcs" }
            ]
        },
        ctaImage: burgerBoxMain
    },
    "food-box": {
        id: "food-box",
        productName: "Paper Food Box",
        catchPhrase: "Versatile Takeaway",
        title: <>Sustainable <br /><span className="text-[#fb923c]">Food Packaging</span></>,
        description: "Our multi-purpose food boxes are perfect for full meals, ensuring your food stays fresh while making a positive environmental impact.",
        heroImage: foodBoxMain,
        variantsCatchPhrase: "CATERING PROS",
        variantsTitle: "Eco Food Box Range",
        variantsDescription: "From quick snacks to full family meals, our food boxes offer the perfect balance of strength and sustainability.",
        variants: [
            {
                name: "Lunch Box",
                description: "The classic choice for midday meals and standard takeaway sets.",
                image: foodBoxMain
            },
            {
                name: "Meal Tray Box",
                description: "Flat design perfect for platters and organized food presentation.",
                image: foodBox1
            },
            {
                name: "Clamshell Box",
                description: "Easy-to-use hinged design for quick service and heat retention.",
                image: foodBox2
            }
        ],
        featuresImage: foodBox3,
        specs: {
            volumeOptions: "500ml, 750ml, 1000ml, 1200ml",
            tableData: [
                { volume: "500ml", dimension: "120*100*50", pieces: "500pcs" },
                { volume: "750ml", dimension: "150*120*55", pieces: "400pcs" },
                { volume: "1000ml", dimension: "180*140*60", pieces: "300pcs" }
            ]
        },
        ctaImage: foodBoxMain
    },
    "pizza-box": {
        id: "pizza-box",
        productName: "Pizza Box",
        catchPhrase: "Hot & Crisp",
        title: <>Premium <span className="text-[#fb923c]">Pizza</span> <br />Packaging</>,
        description: "Robust corrugated construction that maintains optimal temperature and prevents sogginess, keeping your pizzas exactly as they were intended.",
        heroImage: pizzaBox,
        variantsCatchPhrase: "PIZZA PERFECTION",
        variantsTitle: "Gourmet Pizza Boxes",
        variantsDescription: "Heavy-duty protection with artistic flair. Our pizza boxes are crafted for heat retention and brand impact.",
        variants: [
            {
                name: "Standard Pizza Box",
                description: "The industry standard for delivery, reliable and sturdy.",
                image: pizzaBox
            },
            {
                name: "Custom Printed Box",
                description: "Make your brand travel across the city with bespoke designs.",
                image: pizzaBox
            }
        ],
        featuresImage: pizzaBox,
        specs: {
            volumeOptions: "7 inch, 8 inch, 10 inch, 12 inch",
            tableData: [
                { volume: "7 inch", dimension: "180*180*40", pieces: "200pcs" },
                { volume: "10 inch", dimension: "250*250*45", pieces: "100pcs" },
                { volume: "12 inch", dimension: "300*300*45", pieces: "100pcs" }
            ]
        },
        ctaImage: pizzaBox
    },
    "paper-tray": {
        id: "paper-tray",
        productName: "Paper Tray",
        catchPhrase: "Effortless Serving",
        title: <>Elegance <br />in every <span className="text-[#fb923c]">Serving</span></>,
        description: "LeafedIndia Paper Trays offer the perfect balance of convenience and eco-consciousness. Designed for grab-and-go ease and presentation perfection.",
        heroImage: foodTrayMain,
        variantsCatchPhrase: "CATERING EXCELLENCE",
        variantsTitle: "Professional Serving Trays",
        variantsDescription: "Discover how our paper trays can transform your takeaway and event catering experience.",
        variants: [
            {
                name: "Standard Tray",
                description: "Deep-walled tray for mess-free dining and diverse portions.",
                image: foodTrayMain
            }
        ],
        featuresImage: foodTrayMain,
        specs: {
            volumeOptions: "Small, Medium, Large",
            tableData: [
                { volume: "Small", dimension: "140*90*40", pieces: "1000pcs" },
                { volume: "Medium", dimension: "180*120*45", pieces: "500pcs" },
                { volume: "Large", dimension: "220*150*50", pieces: "500pcs" }
            ]
        },
        ctaImage: foodTrayMain
    },
    "hexagon-box": {
        id: "hexagon-box",
        productName: "Hexagon Box",
        catchPhrase: "Geometric Perfection",
        title: <>Premium <span className="text-[#fb923c]">Geometric</span> <br />Packaging</>,
        description: "Our Hexagon Boxes are a statement piece for your brand. Stand out on the shelf with packaging that combines structural integrity with avant-garde design.",
        heroImage: foodBox2,
        variantsCatchPhrase: "SPECIALTY PACKAGING",
        variantsTitle: "Artistic Forms",
        variantsDescription: "The intersection of geometry and sustainability, perfect for gift sets and artisanal treats.",
        variants: [
            {
                name: "Hexagon Gift Box",
                description: "Sleek geometric design for high-end items and luxury presentation.",
                image: foodBox2
            }
        ],
        featuresImage: foodBox2,
        specs: {
            volumeOptions: "One Size",
            tableData: [
                { volume: "Premium Size", dimension: "100*100*100", pieces: "200pcs" }
            ]
        },
        ctaImage: foodBox2
    }
};

export const productList = Object.values(products);
