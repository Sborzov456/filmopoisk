import React from 'react';
import './style.scss'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, style, children, onClick }: ButtonProps) {
    return (
        <button style={style} className={`ui-button ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}
