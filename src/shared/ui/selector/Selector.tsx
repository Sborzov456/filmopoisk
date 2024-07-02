import React, { HTMLAttributes, Key } from 'react';
import { useState } from 'react';
import './style.scss';
import closedIcon from './icon-closed.svg';
import openedIcon from './icon-opened.svg';
import { isObject } from '../../lib/isObject';

type Item = Record<string, unknown> & {
    key: Key;
    data?: unknown;
};

interface SelectorProps extends HTMLAttributes<HTMLDivElement> {
    items?: Item[];
    placeholder?: string;
    itemTemplate?: (item: unknown) => React.ReactElement;
    onChange?: (data: unknown) => unknown;
}

export default function Selector({ items, placeholder, itemTemplate, onChange, className }: SelectorProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const onItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, key: Key) => {
        setValue(event.currentTarget.innerText);
        if (onChange && key) {
            onChange(items?.find(item => item.key === key));
        }
    };
    return (
        <div className={`ui-dropdown ${isOpen ? 'opened' : ''} ${className}`} onClick={() => setIsOpen(!isOpen)}>
            <span className={value ? '' : 'ui-dropdown-placeholder'}>{value ? value : placeholder ?? ''}</span>
            <img src={isOpen ? openedIcon : closedIcon} />
            {isOpen && (
                <ul className='ui-dropdown-menu'>
                    {items?.map(item => {
                        let JSXItem = null;
                        if (itemTemplate) {
                            JSXItem = itemTemplate(item.data);
                        } else if (!isObject(item.data)) {
                            JSXItem = item.data ? '' + item.data : '';
                        } else {
                            JSXItem = '';
                        }
                        return (
                            <li key={item['key']} onClick={(event) => onItemClick(event, item['key'])}>
                                {JSXItem}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
