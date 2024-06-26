import { Outlet } from 'react-router-dom';
import { TopBar } from '../../widgets/TopBar';
import './global-styles.scss'

export default function RootLayout() {
    return (<>
        <TopBar/>
        <div className='page'>
            <Outlet />
        </div>
    </>
    );
}
