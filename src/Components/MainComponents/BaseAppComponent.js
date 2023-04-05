import { Box, Grid } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { scrollStyles } from "../ComponentsStyles/GlobalConsts";
import Header from "../HeaderComponents/Header";
import GenericFAB from "../SupportComponents/GenericFAB";
import FeedComponent from "./FeedComponent";
import MobileBottomNavigation from "./MobileBottomNavigation";
import Profile from "./Profile";
import SideBar from "./SideBar";



function BaseAppComponent() {

  
  const mainStyles ={
    display : 'flex',
    p : 0   ,
    flexDirection : 'column',
    overflowY :"scroll",
    "&::-webkit-scrollbar" :{
      display : "none"
    },
    //width : '100%',
    height :'100vh',
    justifyContent :'space-evenly' ,
    msOverflowStyle: "none",
    scrollbarWidth: "none" ,
  }

  const headerStyles ={
    display :'flex',
    position : 'sticky',
 
  }

  const bodyStyles ={
    display :'flex',
    flexDirection :'row',
    flex :1,
    width : '100%',
    justifyContent :'space-evenly' ,
    p :0,
    maxWidth : '1200px',
    mx : 'auto',
    ...scrollStyles,
  }


  

  return (
    <Box
      sx={{...mainStyles}}
    >
      <Header />
      <Box
        sx={{ ...bodyStyles}}
      >
      
        
        <SideBar />
        <FeedComponent />
        <Profile />
      </Box>
      <GenericFAB />
      <MobileBottomNavigation />
    </Box>
   
  );
}

export default BaseAppComponent