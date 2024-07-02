import React from 'react';
import { Actor } from '../../model/Actor';
import './style.scss'
import HorizontalList from '@/shared/ui/horizontal-list/HorizontalList';

type ActorBarProps = {
    actors?: Actor[];
    className?: string;
};

export default function ActorsBar({actors, className}: ActorBarProps) {
    if (!actors) {
        return <>No actors</>
    }
    return (
        <div className={`${className || ''} actors-bar`}>
            <HorizontalList<Actor> items={actors} itemComponent={({item}) => (
                <div className='actor-item'>
                    <img className='actor-photo' src={item.photo}/>
                    <div className='actor-name'> 
                        {item.name}
                    </div>
                </div>
            )}/>
        </div>
    )
}
