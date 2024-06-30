import React from 'react';
import './style.scss'

type CardProps = {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

export function Card({ children, style, className, onClick }: CardProps) {
    return <div style={style} className={`card ${className ?? ''}`} onClick={onClick}>{children}</div>;
}
