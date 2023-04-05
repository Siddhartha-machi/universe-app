import './App.css';
import {  createBrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes, useLocation, useNavigation } from 'react-router-dom';
import { protectedRoutes } from './Components/UseContextsAndLoadersAndRouters/Routes';
import { Box, Typography } from '@mui/material';
import LoadingComponent from './Components/SupportComponents/LoadingComponent';
import { useUserContext } from './Components/UseContextsAndLoadersAndRouters/ContextProviders';
import BaseAppComponent from './Components/MainComponents/BaseAppComponent';
import MainComponent from './Components/SupportComponents/MainComponent';
import DynamicPageComponent from './Components/FeedComponents/DynamicPageComponent';
import Post from './Components/FeedComponents/Post';
import CreatePostDialog from './Components/DialogComponents/CreatePostDialog';
import Club from './Components/FeedComponents/Club';
import { Book } from '@mui/icons-material';
import Polls from './Components/FeedComponents/Polls';
import UpCommingPage from './Components/SupportComponents/UpCommingPage';
import LoginDialog from './Components/DialogComponents/LoginDialog';
import { LoadData } from './Components/UseContextsAndLoadersAndRouters/Loaders';

const GlobalLoading = () => {

  return (
    <Box
      sx={{
        display : 'flex',
        flexDirection :'column',
        flex : 1,
        height : '100vh',
        alignItems :'center',
        justifyContent :'center'
      }}
    >
      <LoadingComponent rings={8}/>
      <Typography
        sx={{
          fontWeight :'bold',
          mt : '80px',
          textAlign : 'center',
          fontSize : { xs : '15px' , md : '20px'}
        }}
      >
        Entering the Universe...<br />Brace yourself for the impact...
      </Typography>
    </Box>
  )
}




function App() {
  const authState = useUserContext()
  const universeRoutes = protectedRoutes(authState.data)

  
  return (
      <RouterProvider 
        router={universeRoutes}
        fallbackElement={<GlobalLoading />}
      />
  );
}

export default App;
