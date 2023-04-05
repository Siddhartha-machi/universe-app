import { Box } from "@mui/system";
import { Children } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import CreatePostDialog from "../DialogComponents/CreatePostDialog";
import LoginDialog from "../DialogComponents/LoginDialog";
import Book from "../FeedComponents/Book";
import Club from "../FeedComponents/Club";
import DynamicPageComponent from "../FeedComponents/DynamicPageComponent";
import Event from "../FeedComponents/Event";
import Polls from "../FeedComponents/Polls";
import Post from "../FeedComponents/Post";
import BaseAppComponent from "../MainComponents/BaseAppComponent";
import MainComponent from "../SupportComponents/MainComponent";
import UpCommingPage from "../SupportComponents/UpCommingPage";
import { LoadData } from "./Loaders";

const loginAppendedPath = ( single ,Component ,authState ,redirectUrl) => {
    let newPaths = [
        {
            path : 'login',
            element :  <LoginDialog open={true}/>
        },
        
    ]
    

    if(single){
        return newPaths
    }else{
        newPaths.push(
            {
                path : 'create',
                element :authState.authenticated 
                            ? <Component open={true}/>
                            : <Navigate 
                                to={`/login?next=${redirectUrl}/create`}
                            />
                                //<LoginDialog open={true} redirectUrl={redirectUrl}/>
            },
        )
        return newPaths
    }
}


const protectedRoutes = (authState ) => createBrowserRouter(
[
    {
        path : '/',
        element : <BaseAppComponent />,
        children : [
            {
                path : '/',
                element : <MainComponent />,
                children : loginAppendedPath(true)
            },
            
            {
                path : '/all-posts',
                element : <DynamicPageComponent 
                            key='posts-page'
                            pageLabel='Posts'
                            Component={Post} 
                        />,
                loader : () => LoadData('posts'),
                children : loginAppendedPath(
                            false ,
                            CreatePostDialog ,
                            authState,
                            '/all-posts'
                        )
                
            },
            {
                path : '/all-events',
                element : <DynamicPageComponent 
                            key='Event-page'
                            pageLabel='Events'
                            Component={Event}
                        />,
                loader : () => LoadData('events'),
                children : loginAppendedPath(
                                false ,
                                CreatePostDialog,
                                authState,
                                '/all-events'
                            ),
                
            },
            {
                path : '/all-clubs',
                element : <DynamicPageComponent 
                            key='Clubs-page'
                            pageLabel='Clubs'
                            Component={Club}
                        />,
                loader : () => LoadData('clubs'),
                children : loginAppendedPath(
                                false ,
                                CreatePostDialog,
                                authState,
                                '/all-clubs'
                            )
            },
            {
                path : '/library-online',
                element : <DynamicPageComponent 
                            key='library-online-page'
                            pageLabel='Library Online'
                            Component={Book}
                        />,
                loader : () => LoadData('books_list'),
                children : loginAppendedPath(true)
            },
            {
                path : '/game-zone',
                element : <DynamicPageComponent 
                            key='game-zone-page'
                            pageLabel='GameZone'
                            Component={Box}
                        />,                
                loader : () => LoadData('gamezone'),
                children : loginAppendedPath(true)
            },
            {
                path : '/polls',
                element : <DynamicPageComponent 
                            key='polls-page'
                            pageLabel='Polls'
                            Component={Polls}
                        />,                
                loader : () => LoadData('polls'),
                children : loginAppendedPath(
                                false ,
                                CreatePostDialog,
                                authState,
                                '/polls'
                            )

            },
            {
                path : '/protected-path',
                key : 'protected-path',
                element : authState.authenticated 
                        ? <Box>Yo! You are viewing Secure connection page!<Outlet /></Box>
                        : <Box>Yo! You are not authorized to view this page!<Outlet /></Box>,
                children : loginAppendedPath(true)
            },
            {
                path : '/universe-join',
                key : 'universe-join',
                element : <UpCommingPage label={'University Join'}/>,
                //children : loginAppendedPath('', true)
            },
            {
                path : '/donate-to-us',
                key : 'donate',
                element : <UpCommingPage label={'Donate'}/>,
                children : loginAppendedPath(true)
            },
            {
                path : '/about-us',
                key : 'about-us',
                element : <UpCommingPage label={'About Us'}/>,
                children : loginAppendedPath(true)
            },
            {
                path : '/contact-us',
                key : 'contact-us',
                element : <UpCommingPage label={'Contatct Us'}/>,
                children : loginAppendedPath(true)
            }
        ]
    }
]
)

export {
    protectedRoutes
}