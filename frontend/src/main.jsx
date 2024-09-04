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
      }
    ]
  },
  {
    path: '/login-register',
    element: <LoginRegister/>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
)
