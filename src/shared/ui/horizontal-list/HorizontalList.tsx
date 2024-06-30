import React, { useRef } from 'react';
import './style.scss'; // Импорт CSS файла
import IconButton from '../icon-button/IconButton';
import leftArrowIcon from '@/shared/icons/left-arrow.svg';
import rightArrowIcon from '@/shared/icons/right-arrow.svg';
import { useState } from 'react';

interface HorizontalListProps<T> {
    items: T[];
    itemComponent: React.ComponentType<{ item: T }>;
}

function HorizontalList<T>({ items, itemComponent: ItemComponent }: HorizontalListProps<T>) {
    const containerRef = useRef<HTMLUListElement>(null);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);

    const updateStates = () => {
        if (!containerRef.current) {
            return;
        }
        if (containerRef.current.scrollLeft <= 0) {
            setCanScrollLeft(false);
        } else if (canScrollLeft === false) {
            setCanScrollLeft(true);
        }
        console.log(containerRef.current.scrollLeft, containerRef.current.scrollWidth / 2)
        if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
            setCanScrollRight(false);
        } else if (canScrollRight === false) {
            setCanScrollRight(true);
        }
    };
    const handleScroll = (offset: number) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += offset;
        }
    };

    return (
        <div className='list-container'>
            <IconButton
                onClick={() => handleScroll(-100)}
                className='prev-button'
                style={canScrollLeft ? {} : { display: 'none' }}
                icon={leftArrowIcon}
            />
            <IconButton
                onClick={() => handleScroll(100)}
                className='next-button'
                style={canScrollRight ? {} : { display: 'none' }}
                icon={rightArrowIcon}
            />
            <ul className='list-items' ref={containerRef} onScroll={() => updateStates()}>
                {items.map((item, index) => (
                    <React.Fragment key={index}>{React.createElement(ItemComponent, { item })}</React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default HorizontalList;
