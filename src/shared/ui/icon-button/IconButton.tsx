import React, { MouseEventHandler } from 'react';
import './style.scss'

type IconButtonProps = {
    className?: string;
    style?: React.CSSProperties;
    icon?: string;
    onClick: MouseEventHandler
};

export default function IconButton({ className, style, icon, onClick }: IconButtonProps) {
    return (
        <button style={style} className={`icon-button ${className}`} onClick={onClick}>
            <img src={icon}/>
        </button>
    );
}
