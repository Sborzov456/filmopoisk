import React, { HTMLAttributes } from 'react';
import './style.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ children, style, className, onClick }: CardProps) {
    return <div style={style} className={`ui-card ${className ?? ''}`} onClick={onClick}>{children}</div>;
}
