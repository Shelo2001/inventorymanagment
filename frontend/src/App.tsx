import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateInventory from './pages/CreateInventory'
import 'bootstrap/dist/css/bootstrap.min.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/add',
    element: <CreateInventory />,
  },
])

export default router
