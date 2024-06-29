// Modal.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.scss'
import IconButton from '../icon-button/IconButton';
import closeIcon from '@/shared/icons/close.svg'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    root?: Element;
    children: React.ReactNode;
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
        <div className='modal'>
            <div className='modal-content'>
                <div className='header'>
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
