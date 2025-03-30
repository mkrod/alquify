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
import SettingsLayout from './layouts/settings_layout';
import SettingsBilling from './pages/dash/settings/billings';
import SettingsIntegration from './pages/dash/settings/integration';
import SettingsShortcuts from './pages/dash/settings/shortcuts';
import SettingsCustomize from './pages/dash/settings/customize';
import SettingsAgents from './pages/dash/settings/agents';
import SettingsGroup from './pages/dash/settings/groups';
import Notification from './pages/dash/settings/notification';
import Profile from './pages/dash/settings/profile';
import SocialLayout from './layouts/social_layout';
import SocialHome from './pages/dash/social/social_home';
import PublishHome from './pages/dash/social/publish/publish_home';
import PublishQueue from './pages/dash/social/publish/queue';
import PublishDraft from './pages/dash/social/publish/draft';
import PublishContents from './pages/dash/social/publish/contents';
import ErrorElement from './components/errorElement';

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
            <Route path='settings' element={<SettingsLayout />}>
               <Route index element={<SettingsHome />}/>
               <Route path='notification' element={<Notification />} />
               <Route path='billing' element={<SettingsBilling />} />
               <Route path='integration' element={<SettingsIntegration />} />
               <Route path='shortcuts' element={<SettingsShortcuts />} />
               <Route path='customize' element={<SettingsCustomize />} />
               <Route path='agents' element={<SettingsAgents />} />
               <Route path='groups' element={<SettingsGroup />} />
               <Route path='profile' element={<Profile />} />
            </Route>      
            <Route path='socials' element={<SocialLayout />}>
               <Route path='' element={<SocialHome />} />
               <Route path='publish' element={<PublishHome />}>
                 <Route path='' element={<PublishQueue />} />
                 <Route path='draft' element={<PublishDraft />} />
                 <Route path='contents' element={<PublishContents />} />
               </Route>
               
               <Route path='analyse' element={<SocialHome />} />
               <Route path='engage' element={<SocialHome />} />
               <Route path='start-page' element={<SocialHome />} />
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
    <ErrorElement>
          <RouterProvider router={router} />
    </ErrorElement>
  )
}

export default App
