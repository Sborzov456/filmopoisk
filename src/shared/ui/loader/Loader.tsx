import React from 'react';
import loaderIcon from './loader.svg';
import './style.scss';

const Loader: React.FC = () => {
    return (
        <div className='ui-loader'>
            <img src={loaderIcon} />
        </div>
    );
};

export default Loader;
