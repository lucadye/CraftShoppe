import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, Route
} from "react-router-dom";

import App from '../App';
import Home from './Home';
import Contact from './Contact';
import About from './About';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Login from './Login';
import Logout from './Logout';
import SignUp from './SignUp';
import Cart from './Cart';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="about" element={<About/>} />
      <Route path="products" element={<Products/>} />
      <Route path="products/:productId" element={<ProductDetails/>} />
      <Route path="login" element={<Login/>} />
      <Route path="logout" element={<Logout/>} />
      <Route path="sign-up" element={<SignUp/>} />
      <Route path="cart" element={<Cart/>} />
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />
}

export default Router;
