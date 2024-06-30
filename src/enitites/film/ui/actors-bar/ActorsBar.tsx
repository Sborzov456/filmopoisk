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
        <div className={`${className || ''} ui-actors-bar`}>
            <HorizontalList<Actor> items={[...actors, ...actors, ...actors, ...actors]} itemComponent={({item}) => <img className='actor-photo' src={item.photo}/>}/>
            {/* {[...actors, ...actors, ...actors, ...actors]?.map(el => {
                return (
                    <div>
                        <img src={el.photo}/>
                    </div>
                )
            })} */}
        </div>
    )
}
