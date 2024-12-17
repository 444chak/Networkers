/*
    Box component
*/
'use client';


import React from 'react';
import './Title.scss';

interface TitleProps {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    align?: 'left' | 'center' | 'right';
    margin?: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    }
    children: React.ReactNode;

}

const Title: React.FC<TitleProps> = ({ children, align, margin, level }) => {
    return React.createElement(
        `h${level}`,
        {
            className: `title ${align}`,
            style: {
                marginLeft: margin?.left,
                marginRight: margin?.right,
                marginTop: margin?.top,
                marginBottom: margin?.bottom
            }
        },
        children
    );
};

export default Title;