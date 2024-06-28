import React, { MouseEventHandler } from 'react';
import './style.scss'

type ButtonProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick: MouseEventHandler;
    children: React.ReactNode;
};

export default function Button({ className, style, children, onClick }: ButtonProps) {
    return (
        <button style={style} className={`ui-button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
