/*
    Button component
*/


import React from 'react';
import './Layout.scss';

interface LayoutProps {
    children?: React.ReactNode;
    type?: string
}

const Layout: React.FC<LayoutProps> = ({
    children, type
}) => {
    return (
        <div className={type ? "layout background-" + type : "layout"}>
            {children}
        </div>
    );
};

export default Layout;