import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import image from '/home/minato/Desktop/React/universe-app/src/Black and Gold Elegant Card Background  (2).png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { Outlet, useNavigate } from 'react-router-dom'
import { BASECOLOR } from '../ComponentsStyles/GlobalConsts';
import { revolveFunc } from '../UseContextsAndLoadersAndRouters/Loaders';

const CuratedButton = (props) => {
  return (
    <Button
      variant='contained'
      fullWidth
      sx={{
        m :{ lg :'10px' , xs : '5px'},
        backgroundColor :'transparent',
        border : '1px solid white',
        fontSize: { md : '15px',sm :'6px',xs :'8px'},
        color : BASECOLOR,
        fontWeight :'bold',
        width : {xs : '100%', sm : 'auto'},
        '&:Hover' : {
          backgroundColor : 'white',
          transform :'scale(1.03)'
        }
      }}
      onClick={() => props.navigate(props.route)}
    >
      {props.label}
    </Button>
  )
}


const MainComponent = () => {

    const navigate = useNavigate()
   

  const height = {
    //xl : '40vh',
    //lg : '70vh',
    //md : '45vh',
    //sm : '30vh',
    //xs : '100vh'
  }
  return (



      <Box 
        sx={{ 
          display : 'flex' , 
          //backgroundColor :'green',
          justifyContent :'space-evenly',
          flexDirection : 'column-reverse',
          alignItems:'center',
          p : '10px',
          backgroundImage : `url('${image}')`,
          color :'white',
          height : '85vh',
          
        }}
      >
        <Box
          sx={{ 
              display :'flex' , 
              flexDirection : 'column',
              flex : 0.7,
              alignItems : 'flex-start',
              justifyContent :'space-around',
              height : 'inherit',
          }}
        >
          <Typography 
            key={'title-description'}
            sx={{ 
              fontSize :{md : '25px' ,sm :'20px', xs : '15px'},
              m : {lg : '10px' , xs : '5px'},
              fontWeight : 'bold',
              textAlign :'center',
            }}
          >
            Connect to Institutes that are beyond your reach with Universe!
          </Typography>
          <Typography
            key={'short-description'}
            sx={{ 
              fontSize :{ md : '20px' ,sm :'16px', xs : '12px'},
              m : {lg : '10px' , xs : '5px'},
              fontWeight : 'bold',
              textAlign :'center',
            }}
          >
            All you need to know that happening around you is in Universe
          </Typography>
          <Box sx={{ 
                display :'flex' ,
                width : '100%',
                justifyContent :'space-around',
              }}
          >
            <CuratedButton 
              label='Sign Up with Email' 
              route='/universe-join'
              navigate={navigate}
            />
            <CuratedButton 
              label='Sign In' 
              route='/login'
              navigate={navigate}
            />
          </Box>
          <Button
            endIcon={<ArrowForwardIcon />}
            disableRipple
            sx={{
              m : { lg : '10px' , xs : '5px'},
              fontSize : {md : '18px', xs :'10px' },
              color : BASECOLOR,
              '&:Hover' : {
                color :'white',
                transform : 'scale(1.03)'
              }
            }}
            onClick={() => navigate('/all-posts')}
          >
            Dive into the Universe right away
          </Button>
        </Box>
        <Box
          sx={{ 
            display : 'flex', 
            flexDirection :'column',
            alignItems :'center',
            justifyContent :'center',
            flex :0.35
          }}
        >

          <BlurOnIcon 
            key={2}
            sx={{
              fontSize : { lg :'200px' , md : '150px' ,sm : '150px', xs : '65px'} ,              
              animation: "spin 3s infinite ",
              "@keyframes spin" : revolveFunc('Z')
                
            }}
          />
          <Typography
            key={'title'}
            sx={{
              fontSize :{ md : '35px' ,sm :'20px', xs : '15px'},
              ml : {lg : '10px' , xs : '5px'},
              textAlign :'center',
              //width : '100%',
              fontWeight : 'bold',
              letterSpacing : '5px'
            }}
          >
            Universe
          </Typography>
          

        </Box> 
        <Outlet key='single-outlet'/>
      </Box>  

  )
}

export default MainComponent