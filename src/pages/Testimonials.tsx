import type { FC } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "Aghnia niaa",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        image: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    },
    {
        name: "Chiara shinta",
        text: "Sustainability is at the heart of everything they do. The packaging is premium and eco-friendly.",
        image: "https://xsgames.co/randomusers/assets/avatars/female/2.jpg",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
        name: "Nandha Nabil",
        text: "Great quality paper products. Our customers love the new burger boxes and cups!",
        image: "https://xsgames.co/randomusers/assets/avatars/male/3.jpg",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
        name: "Sarah Parker",
        text: "The best biodegradable solutions in the market. Highly recommended for modern brands.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
        name: "David Chen",
        text: "Fast delivery and exceptional customer support. The customized bowls are perfect.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        name: "Emily Watson",
        text: "I love the values of Leafedindia. Their products are both beautiful and good for the earth.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
    },
    {
        name: "Michael Rossi",
        text: "Reliable and sturdy packaging. We've seen a significant boost in our brand image.",
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop"
    },
    {
        name: "Linda Grova",
        text: "The designs are modern and clean. It fits our cafe's aesthetic perfectly.",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop"
    },
    {
        name: "Robert Fox",
        text: "Excellent service from start to finish. The bulk ordering process was seamless.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
        name: "Anna Smith",
        text: "Innovative packaging that really stands out. Thank you for your amazing work!",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
    }
];

const Testimonials: FC = () => {
    const scrollItems = [...testimonials, ...testimonials];

    return (
        <section className="w-full pt-10 pb-20 overflow-hidden">
            <div className=" mx-auto bg-[#fb923c] rounded-[40px] md:rounded-[60px] py-16 md:py-24 relative overflow-hidden">

                {/* Heading */}
                <div className="text-center mb-16 px-4">
                    <h2 style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-2xl mx-auto tracking-tighter">
                        Satisfied Customers <br className="hidden md:block" /> Are Our Best Ads
                    </h2>
                </div>

                {/* Infinite Slider Track */}
                <div className="relative flex overflow-hidden group">
                    <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused] whitespace-nowrap">
                        {scrollItems.map((item, index) => (
                            <div
                                key={index}
                                className="inline-block w-[300px] md:w-[350px] relative "
                            >
                                <div className="bg-[#fff9e6] rounded-[32px] p-8 pb-12 pt-12 shadow-xl flex flex-col items-center text-center relative">
                                    <div className="flex justify-center mb-4 text-[#0d6e41]">
                                        <Quote size={32} fill="currentColor" className="rotate-180" />
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-normal font-medium mb-6 line-clamp-3">
                                        "{item.text}"
                                    </p>
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>

                                    {/* Avatar overlapping bottom */}
                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                                        <div className="w-16 h-16 rounded-full border-4 border-[#fff9e6] overflow-hidden bg-white shadow-lg">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 text-center text-white font-bold text-lg opacity-90">
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decoratives */}
                <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-white opacity-5 rounded-full pointer-events-none" />
                <div className="absolute top-20 -left-20 w-[200px] h-[200px] bg-white opacity-5 rounded-full pointer-events-none" />
            </div>
        </section>
    );
};

export default Testimonials;
