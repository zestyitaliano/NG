import React from 'react';

const ToolTile = ({ tool, index, isVisible }) => {
    // Stagger delay based on index
    const delay = index * 50;

    return (
        <div
            className={`
        relative aspect-square rounded-2xl p-6 
        flex flex-col items-center justify-center gap-4
        bg-white shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1
        cursor-pointer transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className={`
        w-16 h-16 rounded-xl ${tool.color} 
        flex items-center justify-center text-white
        transition-transform duration-500 hover:rotate-12
      `}>
                <tool.icon size={32} />
            </div>

            <h3 className="text-lg font-bold text-neutral-800">
                {tool.title}
            </h3>
        </div>
    );
};

export default ToolTile;
