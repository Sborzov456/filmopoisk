import { redirect, } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import { Films } from '../../pages/films';
import { Film } from '../../pages/film';
import {
  createBrowserRouter,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            index: true,
            loader: async () => redirect('/films'),
        },
        {
            path: "/films",
            element: <Films/>,
        },
        {
            path: "/film/:id",
            element: <Film/>,
        }
    ]
  },
]);


