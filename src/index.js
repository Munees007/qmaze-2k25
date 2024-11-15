import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import ParticipantRegister from './pages/ParticipantRegister';
import ParticipantDashboard from './pages/ParticipantDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import NetMaze from './pages/NetMaze';
import ErrorPage from './pages/ErrorPage';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/schedule',
    element: <Schedule />
  },
  {
    path: '/register',
    element: <ParticipantRegister />
  },
  {
    path:'/dashboard',
    element:<ParticipantDashboard/>
  },
  {
    path:"/admin",
    element:<AdminLogin/>
  }
  ,
  {
    path:'/admin/dashboard/*',
    element:<AdminDashboard/>
  },
  {
    path:'/netmaze',
    element:<NetMaze/>
  },
  {
    path:'/*',
    element:<ErrorPage/>
  }
])
AOS.init({
  once: true
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
