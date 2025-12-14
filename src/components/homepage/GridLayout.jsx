import React from 'react';
import ToolTile from './ToolTile';
import {
    Palette,
    Type,
    Layout,
    Image,
    PenTool,
    Maximize,
    Grid,
    Layers,
    Monitor,
    Share
} from 'lucide-react';

const tools = [
    { id: 1, icon: Palette, title: 'Colors', color: 'bg-rose-500' },
    { id: 2, icon: Type, title: 'Typography', color: 'bg-orange-500' },
    { id: 3, icon: Layout, title: 'Layout', color: 'bg-amber-500' },
    { id: 4, icon: Image, title: 'Assets', color: 'bg-green-500' },
    { id: 5, icon: PenTool, title: 'Vectors', color: 'bg-emerald-500' },
    { id: 6, icon: Maximize, title: 'Scale', color: 'bg-teal-500' },
    { id: 7, icon: Grid, title: 'Grids', color: 'bg-cyan-500' },
    { id: 8, icon: Layers, title: 'Stacks', color: 'bg-sky-500' },
    { id: 9, icon: Monitor, title: 'Preview', color: 'bg-blue-500' },
    { id: 10, icon: Share, title: 'Export', color: 'bg-indigo-500' },
];

const GridLayout = ({ isVisible }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-8 max-w-6xl w-full">
            {tools.map((tool, index) => (
                <ToolTile
                    key={tool.id}
                    tool={tool}
                    index={index}
                    isVisible={isVisible}
                />
            ))}
        </div>
    );
};

export default GridLayout;
