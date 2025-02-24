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
import BookingsHotels from './routes/bookings/hotel';
import BookingsAtHotel from './routes/bookings/bookings_at_hotel';

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
  },
  {
    path:'/bookings/hotel',
    element:<BookingsHotels/>
  },
  {
    path:'/bookings/hotel/:id',
    element:<BookingsAtHotel/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)