import React from 'react';
import './style.scss';

interface InputProps {
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
    children?: React.ReactNode;
    icon?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, children, icon, className}) => {
    return (
        <div className={`ui-input-wrapper ${className}`}>
            {icon && <span className='input-icon'>{<img src={icon} />}</span>}
            {children}
            <input type='text' placeholder={placeholder || ''} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    );
};

export default Input;
