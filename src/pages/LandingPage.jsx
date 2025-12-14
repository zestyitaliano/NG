import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import GridLayout from '../components/homepage/GridLayout';

const LandingPage = () => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            // Logic: Calculate how far we've scrolled relative to the viewport height.
            // We want the animation to be fully physically complete by the time we scroll 1.5 viewport heights.
            // Total scrollable area is 300vh.

            const scrollY = window.scrollY;
            const innerHeight = window.innerHeight;

            // Calculate 0 to 1 progress based on first 100vh of scroll
            // Clamped between 0 and 1
            const rawProgress = scrollY / (innerHeight * 1.2);
            const newProgress = Math.min(Math.max(rawProgress, 0), 1);

            setProgress(newProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        // Scroll Track: 300vh to give plenty of room to "scrub" the animation
        <main ref={containerRef} className="relative h-[300vh] w-full bg-offwhite">

            {/* Sticky Viewport: Locks the content in place while we scroll */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* Layer 1: Hero / Header 
            Fades out and moves UP as progress increases.
        */}
                <header
                    className="absolute inset-0 flex flex-col items-center justify-center z-0 transition-transform duration-100 ease-out will-change-transform"
                    style={{
                        opacity: 1 - progress * 2, // Fades out fast (by 50% scroll)
                        transform: `translateY(-${progress * 200}px) scale(${1 - progress * 0.2})`,
                        filter: `blur(${progress * 10}px)`
                    }}
                >
                    <div className="text-center px-4 max-w-4xl">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-neutral-900">
                            Design<span className="text-primary">Suite</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-neutral-500 font-medium tracking-tight">
                            Ten essential tools. <span className="text-primary">One dashboard.</span>
                        </p>
                    </div>
                </header>

                {/* Scroll Hint: Disappears immediately on scroll */}
                <div
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 flex flex-col items-center gap-2"
                    style={{ opacity: 1 - progress * 3 }}
                >
                    <span className="text-sm font-semibold tracking-widest uppercase">Scroll to Open</span>
                    <ChevronDown size={20} className="animate-bounce" />
                </div>

                {/* Layer 2: Grid Container 
            The grid consumes the `progress` prop to drive its children's entrance.
        */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    {/* Enable pointers only when animation is reasonably started so we can click tools */}
                    <div className={`w-full max-w-7xl px-4 ${progress > 0.1 ? 'pointer-events-auto' : ''}`}>
                        <GridLayout progress={progress} />
                    </div>
                </div>

            </div>
        </main>
    );
};

export default LandingPage;
