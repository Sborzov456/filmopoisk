import React from 'react';
import './style.scss'

type CardProps = {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
};

export function Card({ children, style, className }: CardProps) {
    return <div style={style} className={`card ${className ?? ''}`}>{children}</div>;
}
