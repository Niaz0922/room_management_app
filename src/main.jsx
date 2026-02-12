import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Navbar from './components/Navbar'
import Hero_section from './components/Hero_Section'
import Room_Section from './components/Rooms_section'
import Middle from './components/middle_section'
import Footer from './components/Footer'
import Room_Book from './components/Room_Book'
import Dashboard from "./components/Admin Panel/dashborad.jsx"
import "./App.css";
import { BrowserRouter, createBrowserRouter, RouterProvider, Link } from 'react-router'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Room_details from './components/room_details.jsx'
import Room from './components/Admin Panel/room.jsx'
import Bookings from './components/Admin Panel/Bookings.jsx'
import Accounts from './components/Admin Panel/Accounts.jsx'
import Reports from './components/Admin Panel/Reports.jsx'
import Settings from './components/Admin Panel/Settings.jsx'
import Login from './components/login.jsx'
import Logout from './components/Logout.jsx'
import Access_Error from './components/Access_Error.jsx'
import Room_edit from './components/Admin Panel/room_edit.jsx'
import Booking_details from './components/Admin Panel/booking_details.jsx'
import React from 'react';



const router = createBrowserRouter([
  {
    path: "/",
    element: [
      <Navbar />,
      <Hero_section />,
      <Room_Section />,
      <Middle />,
      <Footer />,
    ],
  },

  {
    path: "/room_book",
    element: <PrimeReactProvider>
      <Room_Book />
    </PrimeReactProvider>,
  },

  {
    path: "/room_details",
    element:
      <PrimeReactProvider>
        <Room_details />
      </PrimeReactProvider>

  },

  {
    path: "/Dashboard",
    element:
      <Dashboard />
  },

  {
    path: "/Rooms",
    element:
      <Room />
  },


  {
    path: "/Bookings",
    element:
      <Bookings />
  },

  {
    path: "/Accounts",
    element:
        <Accounts />
  },

  {
    path: "/Reports",
    element:
      <Reports />
  },

  {
    path: "/Settings",
    element: <Settings />
  },

  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/logout",
    element: <Logout />
  },

  {
    path: "/access_error",
    element: <Access_Error />
  },

  {
    path: "/Room_edit/:id",
    element: <Room_edit />
  },

  {
    path: "/Booking_Details",
    element: <Booking_details />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />
  </StrictMode>,
)
