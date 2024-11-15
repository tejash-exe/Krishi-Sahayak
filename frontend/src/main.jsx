import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './context/context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginRegister from './pages/login-register/LoginRegister.jsx'
import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx'
import Orders from './pages/orders/Orders.jsx'
import FertilizerCalculator from './pages/fertilizerCalculator/FertilizerCalculator.jsx'
import Searchresults from './pages/searchresults/Searchresults.jsx'
import Cart from './pages/cart/Cart.jsx'
import ProductPage from './pages/productPage/ProductPage.jsx'
import ChangeAddress from './pages/changeAddress/ChangeAddress.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home/>,
      },
      {
        path: '/profile',
        element: <Profile/>,
      },
      {
        path: '/orders',
        element: <Orders/>,
      },
      {
        path: '/fertilizer-calculator',
        element: <FertilizerCalculator/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/searchresults/:search',
        element: <Searchresults/>,
      },
      {
        path: '/product/:productId',
        element: <ProductPage/>,
      },
      {
        path: '/change-address',
        element: <ChangeAddress/>,
      },
    ]
  },
  {
    path: '/login-register',
    element: <LoginRegister/>,
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
