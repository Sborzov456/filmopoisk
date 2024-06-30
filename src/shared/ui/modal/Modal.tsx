// Modal.tsx
import React, { HTMLAttributes, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.scss'
import IconButton from '../icon-button/IconButton';
import closeIcon from '@/shared/icons/close.svg'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
    root?: Element;
    header?: string;
}

export const Modal: React.FC<ModalProps> = ({ root, isOpen, onClose, children, header }) => {
    useEffect(() => {
        const handleEscapeKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscapeKeyDown);

        return () => {
            window.removeEventListener('keydown', handleEscapeKeyDown);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='ui-modal'>
            <div className='ui-modal-content'>
                <div className='ui-modal-header'>
                    <h3> {header || ''} </h3>
                    <IconButton icon={closeIcon} onClick={onClose}/>
                </div>
                {children}
            </div>
        </div>,
        root ?? document.body
    );
};

export default Modal;
