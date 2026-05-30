import type { RouteObject } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Platform from './pages/Platform'
import Industries from './pages/Industries'
import Trust from './pages/Trust'
import Deployment from './pages/Deployment'
import Pricing from './pages/Pricing'
import Company from './pages/Company'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true,          element: <Home /> },
      { path: 'platform',     element: <Platform /> },
      { path: 'industries',   element: <Industries /> },
      { path: 'trust',        element: <Trust /> },
      { path: 'deployment',   element: <Deployment /> },
      { path: 'pricing',      element: <Pricing /> },
      { path: 'company',      element: <Company /> },
    ],
  },
]
