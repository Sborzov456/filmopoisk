import React from 'react';
import './style.scss'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
    color?: string;
}

export default function IconButton({ className, icon, color, ...buttonProps }: IconButtonProps) {
    return (
        <button className={`icon-button ${className}`} {...buttonProps}>
            <img src={icon} color={color}/>
        </button>
    );
}
