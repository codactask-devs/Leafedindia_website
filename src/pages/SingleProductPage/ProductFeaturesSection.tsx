import React from "react";
import { ShoppingBag, Users, Leaf, Edit3, MapPin, ShieldCheck } from "lucide-react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="flex flex-col gap-4">
        <div className="w-14 h-14 rounded-full border border-[#fb923c] flex items-center justify-center text-[#fb923c]">
            {icon}
        </div>
        <div className="space-y-2">
            <h3 className="text-xl font-black text-[#1a2b4b] tracking-tight">
                {title}
            </h3>
            <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[200px]">
                {description}
            </p>
        </div>
    </div>
);

interface ProductFeaturesSectionProps {
    productName: string;
    featuresImage: string;
    className?: string;
}

const ProductFeaturesSection: React.FC<ProductFeaturesSectionProps> = ({
    productName,
    featuresImage,
    className = ""
}) => {
    const features = [
        {
            icon: <ShoppingBag size={24} />,
            title: "Tear-resistant Paper",
            description: "Protected throughout delivery and takeaway."
        },
        {
            icon: <Users size={24} />,
            title: "Trusted by 3,000+ Brands",
            description: "From casual eateries to premium restaurants."
        },
        {
            icon: <Leaf size={24} />,
            title: "Eco-Friendly Materials",
            description: "Recyclable, biodegradable materials."
        },
        {
            icon: <Edit3 size={24} />,
            title: "Fully Customisable",
            description: "Choose your size, finish, and print to match your brand."
        },
        {
            icon: <MapPin size={24} />,
            title: "Locally Made in India",
            description: "Fast turnaround and quality you can trust."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Sturdy Construction",
            description: "Reliable support, even with heavier items."
        }
    ];

    return (
        <section
            className={`w-full py-20 px-6 lg:px-20 overflow-hidden relative ${className}`}

        >
            <div className="max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="max-w-4xl space-y-6 mb-16">
                    <div className="inline-block px-6 py-2 bg-[#7ab55c] text-white rounded-lg text-[11px] font-black uppercase tracking-widest">
                        {productName} FEATURES
                    </div>
                    <h2 className="text-[42px] md:text-[56px] font-black text-[#1a2b4b] leading-[1.1] tracking-tight">
                        Why Choose LeafedIndia {productName}?
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-5xl">
                        Your packaging is more than just a container, it's a walking advertisement.
                        With custom-printed solutions, every customer leaving your store becomes a brand ambassador.
                        From bold logos to creative full-colour designs, LeafedIndia helps you make every package
                        an extension of your brand identity.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Features List */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </div>

                    {/* Feature Image */}
                    <div className="flex-1 max-w-xl">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700">
                            <img
                                src={featuresImage}
                                alt={`LeafedIndia ${productName} Features`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto object-cover max-h-[600px] bg-gray-50"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductFeaturesSection;
