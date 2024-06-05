import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, Route, Navigate
} from "react-router-dom";

import App      from '../App';
import Home     from './Home';
import Products from './Products';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>} />
      <Route path="products" element={<Products/>} />
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />
}

export default Router;
