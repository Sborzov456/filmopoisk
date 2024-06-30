import React, { useState } from 'react';
import IconButton from '../icon-button/IconButton';
import starIcon from './star.svg';
import './style.scss';

type RatingProps = {
    onChange?: (rating: number) => void;
    rating?: number;
    max?: number;
};

const _isSelected = (hoveredItems: number, rating: number, index: number) => {
    if (hoveredItems) {
        return index + 1 <= hoveredItems
    }
    return index + 1 <= rating
    
}

export default function Rating({ onChange, rating: currentRating = 0, max = 5 }: RatingProps) {
    const [rating, setRating] = useState<number>(currentRating);
    const [_hoveredItems, _setHoveredItems] = useState<number>(0);
    console.log(_hoveredItems, rating);
    return (
        <div className='ui-rating'>
            {Array.from({ length: max }).map((_, index) => {
                return (
                    <IconButton
                        className={_isSelected(_hoveredItems, rating, index) ? 'selected' : ''}
                        icon={starIcon}
                        onClick={event => {
                            event.stopPropagation();
                            setRating(_hoveredItems as number);
                            onChange && onChange(index + 1);
                        }}
                        onMouseEnter={() => _setHoveredItems(index + 1)}
                        onMouseLeave={() => _setHoveredItems(0)}
                    />
                );
            })}
        </div>
    );
}
