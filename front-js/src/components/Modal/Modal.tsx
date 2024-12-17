'use client';

import React from 'react';
import './Modal.scss';

interface ModalProps {
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children
}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;