import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CartProvider } from "react-use-cart";
import { WishlistProvider } from 'react-use-wishlist';
import store from './components/store';
import Home from "./components/Home"
import Products from "./components/Products"
import Product from "./components/Product"
import Brands from "./components/Brands"
import Clothes from "./components/Clothes"
import Shoes from "./components/Shoes"
import Bags from "./components/Bags"
import Beauty from "./components/Beauty"
import Ev from "./components/Ev"
import Login from "./components/Login"
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/kisiler", element: <Home /> },
  { path: "/qadinlar", element: <Home /> },
  { path: "/usaqlar", element: <Home /> },
  { path: "/butun-mehsullar", element: <Products /> },
  { path: "/brands", element: <Brands /> },
  { path: "/geyim", element: <Clothes /> },
  { path: "/ayaqqabı", element: <Shoes /> },
  { path: "/çanta və aksesuarlar", element: <Bags /> },
  { path: "/gözəllik", element: <Beauty /> },
  { path: "/ev", element: <Ev /> },
  { path: "/butun-mehsullar/:id", element: <Product /> },
  { path: "/geyim/:id", element: <Product /> },
  { path: "/ayaqqabı/:id", element: <Product /> },
  { path: "/çanta və aksesuarlar/:id", element: <Product /> },
  { path: "/gözəllik/:id", element: <Product /> },
  { path: "/ev/:id", element: <Product /> },
  { path: "/login", element: <Login /> },
  { path: "/basket", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> }
])

function App() {
  return (
    <>
      <Provider store={store}>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router}></RouterProvider>
          </WishlistProvider>
        </CartProvider>
      </Provider>
    </>
  )
}

export default App
