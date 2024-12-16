/*
    Button component
*/

import React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            <span className="text">{text}</span>
            
        </button>
    );
};

export default Button;