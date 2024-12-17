/*
    Space component
*/
'use client';


import React from 'react';
import './Space.scss';

interface SpaceProps {
    children?: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    spaceBetween?: boolean;
    margin?: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    }
}

const Space: React.FC<SpaceProps> = ({ children, spaceBetween, direction, margin }) => {
    return (
        <div className={`space ${direction} ${spaceBetween ? 'space-between' : ''}`} style={{ marginLeft: margin?.left, marginRight: margin?.right, marginTop: margin?.top, marginBottom: margin?.bottom }}>
            {children}
        </div >


    );
};

export default Space;