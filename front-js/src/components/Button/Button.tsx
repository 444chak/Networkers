/*
    Button component
*/
'use client';


import React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    primary?: boolean;
    secondary?: boolean;
    textsize?: string;
    margin?:
    {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    }
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick
    , primary, secondary, textsize, margin, disabled
}) => {
    return (
        <button onClick={onClick} className={"button " + (primary ? "primary" : secondary ? "secondary" : "")} style={{ fontSize: textsize, marginLeft: margin?.left, marginRight: margin?.right, marginTop: margin?.top, marginBottom: margin?.bottom }} disabled={disabled}>
            <span className="text">{text}</span>
        </button >
    );
};

export default Button;