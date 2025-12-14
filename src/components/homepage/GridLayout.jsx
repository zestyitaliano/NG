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

// Specific tools as requested
const tools = [
    // Row 1
    { id: 1, icon: Palette, title: 'Color Picker', color: '#ff595e', span: 'col-span-1 md:col-span-2 md:row-span-2', direction: 'left' }, // Red/Large
    { id: 2, icon: Type, title: 'Case Converter', color: '#ffca3a', span: 'col-span-1 md:col-span-2 md:row-span-1', direction: 'top' }, // Yellow/Large

    // Row 2 (mixed with Row 1 spans)
    { id: 3, icon: Maximize, title: 'Proportion Scaler', color: '#1982c4', span: 'col-span-1 md:col-span-2 md:row-span-2', direction: 'right' }, // Blue/Large

    // Row 3 (Small tiles fill gaps)
    { id: 4, icon: Image, title: 'Image to Text', color: '#8ac926', span: '', direction: 'bottom-left' }, // Green
    { id: 5, icon: PenTool, title: 'Image Compressor', color: '#6a4c93', span: '', direction: 'bottom' }, // Purple

    // Row 4
    { id: 6, icon: Palette, title: 'Color Palette Gen', color: '#5dcbf0', span: '', direction: 'left' }, // Cyan
    { id: 7, icon: Grid, title: 'Vector Pattern Gen', color: '#202c39', inverse: true, span: '', direction: 'bottom-right' }, // Dark
    { id: 8, icon: Layers, title: 'SVG Library', color: '#efefef', inverse: false, border: true, span: '', direction: 'right' }, // Light

    // Row 5
    { id: 9, icon: Monitor, title: 'Site Map Extractor', color: '#1982c4', span: '', direction: 'top-left' }, // Blue
    { id: 10, icon: Share, title: 'Wireframe Modeler', color: '#ff595e', span: '', direction: 'top-right' }, // Red
];

const GridLayout = ({ progress }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-min gap-4 md:gap-6 w-full h-full pb-20">
            {tools.map((tool, index) => (
                <ToolTile
                    key={tool.id}
                    tool={tool}
                    index={index}
                    progress={progress}
                />
            ))}
        </div>
    );
};

export default GridLayout;
