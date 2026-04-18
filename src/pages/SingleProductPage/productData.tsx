import { productAssets } from "../../assets/Assets";

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
    galleryImages?: string[];
}

export const products: Record<string, ProductData> = {
    "bowls": {
        id: "bowls",
        productName: "Bowls",
        catchPhrase: "Premium Sustainability",
        title: <>Serve <span className="text-[#fb923c]">Style</span> & <br />Sustainability</>,
        description: "Foodabox offers a versatile range of premium paper bowls designed for modern food brands who prioritize functionality without compromising on design.",
        heroImage: productAssets["Bowls"]?.main || "",
        variantsCatchPhrase: "CONSCIOUS DINING",
        variantsTitle: "Eco-Friendly Paper Bowls",
        variantsDescription: "Redefining convenience through sustainable craftsmanship. Our bowls are designed for the modern table, merging durability with earth-first materials.",
        variants: productAssets["Bowls"]?.variants.map((v, i) => ({
            name: `Bowl Variant ${i + 1}`,
            description: "Sustainable packaging solution for modern dining.",
            image: v
        })) || [],
        featuresImage: productAssets["Bowls"]?.whychoose || productAssets["Bowls"]?.main || "",
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
        ctaImage: productAssets["Bowls"]?.cta || productAssets["Bowls"]?.main || "",
        galleryImages: productAssets["Bowls"]?.gallery || []
    },
    "cups": {
        id: "cups",
        productName: "Paper Cups",
        catchPhrase: "Eco-Friendly Sips",
        title: <>Pure <span className="text-[#fb923c]">Taste</span>, <br />Zero Waste</>,
        description: "Our high-quality paper cups are designed for both hot and cold beverages, providing a leak-proof and planet-friendly experience for your customers.",
        heroImage: productAssets["Cups"]?.main || "",
        variantsCatchPhrase: "BETTER BEVERAGES",
        variantsTitle: "Sustainable Paper Cups",
        variantsDescription: "Engineered for excellence and designed for the planet. Our cup range provides the perfect vessel for every drink experience.",
        variants: productAssets["Cups"]?.variants.map((v, i) => ({
            name: `Cup Variant ${i + 1}`,
            description: "Eco-friendly beverage solution.",
            image: v
        })) || [],
        featuresImage: productAssets["Cups"]?.whychoose || productAssets["Cups"]?.main || "",
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
        ctaImage: productAssets["Cups"]?.cta || productAssets["Cups"]?.main || "",
        galleryImages: productAssets["Cups"]?.gallery || []
    },
    "burger-box": {
        id: "burger-box",
        productName: "Burger Box",
        catchPhrase: "Fresh & Secure",
        title: <>The <span className="text-[#fb923c]">Ultimate</span> <br />Burger Box</>,
        description: "Breathable, sturdy, and oil-resistant packaging that keeps your burgers fresh, hot, and perfectly presented from kitchen to customer.",
        heroImage: productAssets["BurgerBox"]?.main || "",
        variantsCatchPhrase: "FAST FEEDING",
        variantsTitle: "Premium Burger Packaging",
        variantsDescription: "Give your burgers the home they deserve. Our boxes maintain temperature and texture for the perfect bite.",
        variants: productAssets["BurgerBox"]?.variants.map((v, i) => ({
            name: `Burger Box ${i + 1}`,
            description: "Sturdy and oil-resistant packaging.",
            image: v
        })) || [],
        featuresImage: productAssets["BurgerBox"]?.whychoose || productAssets["BurgerBox"]?.main || "",
        specs: {
            volumeOptions: "Standard, Large, Extra Large",
            tableData: [
                { volume: "Standard", dimension: "100*100*70", pieces: "500pcs" },
                { volume: "Large", dimension: "120*120*80", pieces: "400pcs" },
                { volume: "Extra Large", dimension: "140*140*90", pieces: "200pcs" }
            ]
        },
        ctaImage: productAssets["BurgerBox"]?.cta || productAssets["BurgerBox"]?.main || "",
        galleryImages: productAssets["BurgerBox"]?.gallery || []
    },
    "food-box": {
        id: "food-box",
        productName: "Paper Food Box",
        catchPhrase: "Versatile Takeaway",
        title: <>Sustainable <br /><span className="text-[#fb923c]">Food Packaging</span></>,
        description: "Our multi-purpose food boxes are perfect for full meals, ensuring your food stays fresh while making a positive environmental impact.",
        heroImage: productAssets["FoodBox"]?.main || "",
        variantsCatchPhrase: "CATERING PROS",
        variantsTitle: "Eco Food Box Range",
        variantsDescription: "From quick snacks to full family meals, our food boxes offer the perfect balance of strength and sustainability.",
        variants: productAssets["FoodBox"]?.variants.map((v, i) => ({
            name: `Food Box ${i + 1}`,
            description: "Multi-purpose sustainable food box.",
            image: v
        })) || [],
        featuresImage: productAssets["FoodBox"]?.whychoose || productAssets["FoodBox"]?.main || "",
        specs: {
            volumeOptions: "500ml, 750ml, 1000ml, 1200ml",
            tableData: [
                { volume: "500ml", dimension: "120*100*50", pieces: "500pcs" },
                { volume: "750ml", dimension: "150*120*55", pieces: "400pcs" },
                { volume: "1000ml", dimension: "180*140*60", pieces: "300pcs" }
            ]
        },
        ctaImage: productAssets["FoodBox"]?.cta || productAssets["FoodBox"]?.main || "",
        galleryImages: productAssets["FoodBox"]?.gallery || []
    },
    "noodle-box": {
        id: "noodle-box",
        productName: "Noodle Box",
        catchPhrase: "Hot & Fresh",
        title: <>Premium <span className="text-[#fb923c]">Noodle</span> <br />Packaging</>,
        description: "Specialized packaging designed to keep noodles hot and prevent leaks, ensuring a perfect takeaway experience.",
        heroImage: productAssets["NoodleBox"]?.main || "",
        variantsCatchPhrase: "NOODLE PERFECTION",
        variantsTitle: "Gourmet Noodle Boxes",
        variantsDescription: "Leak-proof and heat-retentive boxes crafted for the perfect noodle serving.",
        variants: productAssets["NoodleBox"]?.variants.map((v, i) => ({
            name: `Noodle Box Variant ${i + 1}`,
            description: "Reliable and sturdy noodle packaging.",
            image: v
        })) || [],
        featuresImage: productAssets["NoodleBox"]?.whychoose || productAssets["NoodleBox"]?.main || "",
        specs: {
            volumeOptions: "16oz, 26oz, 32oz",
            tableData: [
                { volume: "16oz", dimension: "80*60*95", pieces: "500pcs" },
                { volume: "26oz", dimension: "95*80*110", pieces: "500pcs" },
                { volume: "32oz", dimension: "105*90*120", pieces: "500pcs" }
            ]
        },
        ctaImage: productAssets["NoodleBox"]?.cta || productAssets["NoodleBox"]?.main || "",
        galleryImages: productAssets["NoodleBox"]?.gallery || []
    },
    "food-tray": {
        id: "food-tray",
        productName: "Paper Tray",
        catchPhrase: "Effortless Serving",
        title: <>Elegance <br />in every <span className="text-[#fb923c]">Serving</span></>,
        description: "LeafedIndia Paper Trays offer the perfect balance of convenience and eco-consciousness. Designed for grab-and-go ease and presentation perfection.",
        heroImage: productAssets["FoodTray"]?.main || "",
        variantsCatchPhrase: "CATERING EXCELLENCE",
        variantsTitle: "Professional Serving Trays",
        variantsDescription: "Discover how our paper trays can transform your takeaway and event catering experience.",
        variants: productAssets["FoodTray"]?.variants.map((v, i) => ({
            name: `Tray ${i + 1}`,
            description: "Convenient and eco-friendly serving tray.",
            image: v
        })) || [],
        featuresImage: productAssets["FoodTray"]?.whychoose || productAssets["FoodTray"]?.main || "",
        specs: {
            volumeOptions: "Small, Medium, Large",
            tableData: [
                { volume: "Small", dimension: "140*90*40", pieces: "1000pcs" },
                { volume: "Medium", dimension: "180*120*45", pieces: "500pcs" },
                { volume: "Large", dimension: "220*150*50", pieces: "500pcs" }
            ]
        },
        ctaImage: productAssets["FoodTray"]?.cta || productAssets["FoodTray"]?.main || "",
        galleryImages: productAssets["FoodTray"]?.gallery || []
    },
    "hexagon-box": {
        id: "hexagon-box",
        productName: "Hexagon Box",
        catchPhrase: "Geometric Perfection",
        title: <>Premium <span className="text-[#fb923c]">Geometric</span> <br />Packaging</>,
        description: "Our Hexagon Boxes are a statement piece for your brand. Stand out on the shelf with packaging that combines structural integrity with avant-garde design.",
        heroImage: productAssets["HexagonBox"]?.main || "",
        variantsCatchPhrase: "SPECIALTY PACKAGING",
        variantsTitle: "Artistic Forms",
        variantsDescription: "The intersection of geometry and sustainability, perfect for gift sets and artisanal treats.",
        variants: productAssets["HexagonBox"]?.variants.map((v, i) => ({
            name: `Hexagon Variant ${i + 1}`,
            description: "Unique geometric packaging design.",
            image: v
        })) || [],
        featuresImage: productAssets["HexagonBox"]?.whychoose || productAssets["HexagonBox"]?.main || "",
        specs: {
            volumeOptions: "One Size",
            tableData: [
                { volume: "Premium Size", dimension: "100*100*100", pieces: "200pcs" }
            ]
        },
        ctaImage: productAssets["HexagonBox"]?.cta || productAssets["HexagonBox"]?.main || "",
        galleryImages: productAssets["HexagonBox"]?.gallery || []
    }
};

export const productList = Object.values(products);
