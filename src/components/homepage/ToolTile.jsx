import React from 'react';

const ToolTile = ({ tool, index, progress }) => {
    // Stagger: Each tile starts animating a bit later
    // We map the global 0-1 progress to a local 0-1 progress for this specific tile.

    const stagger = index * 0.05;
    // The animation happens during a 0.3 slice of the total scroll
    const duration = 0.3;

    // Calculate when this tile should start and end
    const start = stagger;
    const end = start + duration;

    // Normalize progress to 0-1 range for this specific tile
    // If global progress < start, local is 0. If > end, local is 1.
    let localProgress = (progress - start) / (end - start);
    localProgress = Math.min(Math.max(localProgress, 0), 1);

    // Ease the progress for smooth physics
    // Cubic Bezier approx: easeOutBack-ish
    const eased = 1 - Math.pow(1 - localProgress, 3);

    // Directional offsets (Starting positions)
    const offsetAmount = 150;
    let translateX = 0;
    let translateY = 0;

    switch (tool.direction) {
        case 'left': translateX = -offsetAmount; break;
        case 'right': translateX = offsetAmount; break;
        case 'top': translateY = -offsetAmount; break;
        case 'bottom': translateY = offsetAmount; break;
        case 'top-left': translateX = -offsetAmount; translateY = -offsetAmount; break;
        case 'top-right': translateX = offsetAmount; translateY = -offsetAmount; break;
        case 'bottom-left': translateX = -offsetAmount; translateY = offsetAmount; break;
        case 'bottom-right': translateX = offsetAmount; translateY = offsetAmount; break;
        default: translateY = offsetAmount;
    }

    // Interpolate current position based on eased progress
    // At progress 0: we are at Offset. At progress 1: we are at 0.
    const currentX = translateX * (1 - eased);
    const currentY = translateY * (1 - eased);
    const currentScale = 0.8 + (0.2 * eased); // 0.8 -> 1.0
    const currentOpacity = eased; // 0 -> 1

    const isDark = tool.inverse;
    const hasBorder = tool.border;

    return (
        <div
            className={`
        relative overflow-hidden
        ${tool.span || 'col-span-1 row-span-1'}
        aspect-video md:aspect-auto md:min-h-[200px]
        flex flex-col items-center justify-center gap-4
        bg-white shadow-none rounded-none
        hover:scale-[1.02] hover:shadow-xl hover:z-10
        transition-all duration-300 ease-out
        cursor-pointer group
      `}
            style={{
                backgroundColor: tool.color,
                opacity: currentOpacity,
                transform: `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`,
                color: isDark ? 'white' : '#1a1a1a',
                border: hasBorder ? '1px solid #e5e5e5' : 'none'
            }}
        >
            <div className={`
        p-4 rounded-full bg-white/10 backdrop-blur-sm
        transition-transform duration-500 group-hover:rotate-12
      `}>
                <tool.icon size={32} strokeWidth={2} />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-center px-4">
                {tool.title}
            </h3>
        </div>
    );
};

export default ToolTile;
