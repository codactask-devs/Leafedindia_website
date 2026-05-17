import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';

interface CardRotateProps {
    children: React.ReactNode;
    onSendToBack: () => void;
    sensitivity: number;
    disableDrag?: boolean;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [60, -60]);
    const rotateY = useTransform(x, [-100, 100], [-60, 60]);

    function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
        if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    if (disableDrag) {
        return (
            <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="absolute inset-0 cursor-grab"
            style={{ x, y, rotateX, rotateY }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.6}
            whileTap={{ cursor: 'grabbing' }}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

interface StackProps {
    randomRotation?: boolean;
    sensitivity?: number;
    sendToBackOnClick?: boolean;
    cards?: React.ReactNode[];
    animationConfig?: { stiffness: number; damping: number };
    autoplay?: boolean;
    autoplayDelay?: number;
    pauseOnHover?: boolean;
    mobileClickOnly?: boolean;
    mobileBreakpoint?: number;
    showHint?: boolean;
}

export default function Stack({
    randomRotation = false,
    sensitivity = 200,
    cards = [],
    animationConfig = { stiffness: 260, damping: 20 },
    sendToBackOnClick = false,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    mobileClickOnly = false,
    mobileBreakpoint = 768,
    showHint = true
}: StackProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [mobileBreakpoint]);

    const shouldDisableDrag = mobileClickOnly && isMobile;
    const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

    const [stack, setStack] = useState<{ id: number; content: React.ReactNode }[]>(() => {
        if (cards.length) {
            return cards.map((content, index) => ({ id: index + 1, content }));
        } else {
            return [
                {
                    id: 1,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format"
                            alt="card-1"
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    )
                },
                {
                    id: 2,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format"
                            alt="card-2"
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    )
                },
                {
                    id: 3,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format"
                            alt="card-3"
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    )
                },
                {
                    id: 4,
                    content: (
                        <img
                            src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format"
                            alt="card-4"
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    )
                }
            ];
        }
    });

    useEffect(() => {
        if (cards.length) {
            setStack(cards.map((content, index) => ({ id: index + 1, content })));
        }
    }, [cards]);

    const sendToBack = (id: number) => {
        setHasInteracted(true);
        setStack(prev => {
            const newStack = [...prev];
            const index = newStack.findIndex(card => card.id === id);
            const [card] = newStack.splice(index, 1);
            newStack.unshift(card);
            return newStack;
        });
    };

    useEffect(() => {
        if (autoplay && stack.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                const topCardId = stack[stack.length - 1].id;
                sendToBack(topCardId);
            }, autoplayDelay);

            return () => clearInterval(interval);
        }
    }, [autoplay, autoplayDelay, stack, isPaused]);

    const randomRotations = useMemo(
        () => stack.map(() => (randomRotation ? Math.random() * 10 - 5 : 0)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [stack.length, randomRotation]
    );

    return (
        <div
            className="relative w-full h-full"
            style={{ perspective: 600 }}
            onMouseEnter={() => {
                pauseOnHover && setIsPaused(true);
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                pauseOnHover && setIsPaused(false);
                setIsHovered(false);
            }}
        >
            <AnimatePresence>
                {showHint && !hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap"
                    >
                        <div className="bg-[#0d6e41] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            TAP OR SWIPE TO SHUFFLE
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {stack.map((card, index) => {
                const randomRotate = randomRotations[index] ?? 0;
                return (
                    <CardRotate
                        key={card.id}
                        onSendToBack={() => sendToBack(card.id)}
                        sensitivity={sensitivity}
                        disableDrag={shouldDisableDrag}
                    >
                        <motion.div
                            className="rounded-2xl overflow-hidden w-full h-full select-none"
                            onClick={() => shouldEnableClick && sendToBack(card.id)}
                            animate={{
                                rotateZ: (stack.length - index - 1) * (isHovered ? 8 : 4) + randomRotate,
                                scale: 1 + index * 0.06 - stack.length * 0.06,
                                x: isHovered ? (index - stack.length / 2) * 15 : 0,
                                transformOrigin: '50% 100%'
                            }}
                            initial={false}
                            transition={{
                                type: 'spring',
                                stiffness: animationConfig.stiffness,
                                damping: animationConfig.damping
                            }}
                        >
                            {card.content}
                        </motion.div>
                    </CardRotate>
                );
            })}
        </div>
    );
}
