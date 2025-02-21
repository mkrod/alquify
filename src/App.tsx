declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import RootLayout from './layouts/RootLayout';
import Home from './pages/dash/home';
import Onboarding from './pages/onboarding';
import NotFound from './pages/not-found';
import DashLayout from './layouts/dashLayout';
import OnboardLayout from './layouts/onboard_layout';
import DocsLayout from './layouts/docsLayout';
import DocsHome from './pages/docs/docs_home';
import DashHomeLayout from './layouts/dashHomeLayout';
import AuthLayout from './layouts/authLayout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Auth from './pages/auth/auth';
import React, { useEffect } from 'react';
import { FBAppID } from './constant';
import Logout from './pages/auth/logout';
import ChatWizard from './pages/dash/chat_wizard';
import ChatHome from './pages/dash/chat_home';
import SettingsHome from './pages/dash/settings_home';
import SubHome from './pages/dash/subscriptions_home';

const App : React.FC = () => {


  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : FBAppID,
        xfbml            : true,
        version          : 'v21.0'
      });
    };
  }, []);



  const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<RootLayout />}>
          <Route path='*' element={<NotFound />}/>

        <Route path='/' element={<OnboardLayout />}>
              <Route index element={<Onboarding />} />
            <Route path='docs' element={<DocsLayout />}>
              <Route index element={<DocsHome />} />
            </Route>
        </Route>


        <Route path='dash' element={<DashLayout />}>
               <Route index element={<Home />} />
            <Route path='chats' element={<DashHomeLayout />}>
               <Route index element={<ChatHome />} />
               <Route path='wizard' element={<ChatWizard />} />
            </Route>      
            <Route path='settings' element={<DashHomeLayout />}>
               <Route index element={<SettingsHome />} />
            </Route>      
            <Route path='socials' element={<DashHomeLayout />}>
               <Route index element={<Home />} />
            </Route>      
            <Route path='subs' element={<DashHomeLayout />}>
               <Route index element={<SubHome />} />
            </Route>         
        </Route>


        <Route path='auth' element={<AuthLayout />}>
            <Route index element={<Auth />} />
            <Route path='log-in' element={<Login />} />
            <Route path='sign-up' element={<Register />} />
            <Route path='logout' element={<Logout />} />
        </Route>   
        


      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
