import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import RootLayout from '../ui/RootLayout';


export function Router() {
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === '/') {
            navigate('/films');
        }
    }, [navigate]);
    return (
        <>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route errorElement={<div> Error </div>}>
                        <Route path='/films' element={<div> home </div>} />
                        <Route path='/film/:id' element={<> films </>} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

