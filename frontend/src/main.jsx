import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Index from './routes';
import 'bootstrap/dist/css/bootstrap.css'
import Login from './routes/login';
import Register from './routes/register';
import ViewBooking from './routes/bookings/id';
import ViewBookings from './routes/bookings';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Index/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/bookings/:bookingID',
    element:<ViewBooking/>
  },
  {
    path:'/bookings',
    element:<ViewBookings/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)