import React, { useState, useEffect, useCallback } from "react";
import quoteBackground from "../assets/quote_background.png";

const quotes = [
    "Packaging as Premium as Your Recipe.",
    "Perform like plastic, but disappear like a leaf.",
    "Zero Leaks. Total Sustainability.",
    "Purely Paper. Truly Green. Totally Leafed.",
    "Healthy Food Deserves Honest Packaging.",
    "The End of Waste. The Beginning of Life.",
    "Plant-Based Strength. Plastic-Banned Performance.",
    "Turning over a new leaf for a plastic-free planet.",
];

const RotatingQuotes: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const goTo = useCallback((idx: number) => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentIndex(idx);
            setIsVisible(true);
        }, 400);
    }, []);

    const goNext = useCallback(() => {
        goTo((currentIndex + 1) % quotes.length);
    }, [currentIndex, goTo]);

    useEffect(() => {
        const interval = setInterval(goNext, 10000);
        return () => clearInterval(interval);
    }, [goNext]);

    return (
        <section
            className="w-full py-20 md:py-35x bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${quoteBackground})`,
            }}
        >
            <div className="max-w-4xl mx-auto px-6 text-center">

                {/* Minimal top accent */}
                <div className="flex justify-center mb-10">
                    <div className="w-15 h-[3px] bg-[#0d6e41] rounded-full" />
                </div>

                {/* Quote */}
                <p
                    className={`text-[#1a2b4b] text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight transition-all ${isVisible ? "opacity-100" : "opacity-0"}`}
                    style={{ transitionDuration: "400ms", fontFamily: "'Montserrat', sans-serif" }}
                >
                    {quotes[currentIndex]}
                </p>

                {/* Counter + progress */}
                <div className="mt-12 flex flex-col items-center gap-4">

                    <div className="flex gap-1.5">
                        {quotes.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goTo(idx)}
                                className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? "bg-[#0d6e41] w-7" : "bg-gray-400 w-1.5 hover:bg-gray-500"}`}
                                aria-label={`Go to quote ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RotatingQuotes;
