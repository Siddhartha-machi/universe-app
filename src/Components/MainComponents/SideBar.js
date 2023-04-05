import { Button, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ACUTECOLOR, BACKGROUNDCOLOR, BASECOLOR, COLOR, SITEICON, SITENAME } from '../ComponentsStyles/GlobalConsts'
import { SidebarConsts } from '../Constants/NavigationConstants'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

const SideBar = () => {

    const location = useLocation()
    const navigation = useNavigation()
    const navigate = useNavigate()
  
    //console.log(navigating.state === 'loading')
    const setCreateDisplay = () => {
        const paths = ['all-posts' , 'all-events' , 'all-clubs','polls']
        for(let path of paths){
            if(location.pathname.includes(path)){
                return true
            }
        }
        return false
    }
  return (
    <Paper
        elevation={0}
        sx={{ 
            display : { xs : 'none' , sm : 'flex'},
            flexDirection :'column',
            maxHeight : '650px',
            flex : { lg : 0.2,md : 0.10,sm : 0.15 },
            borderRadius : '10px',
            backgroundColor : ACUTECOLOR,
            mt : '5px'

        }}
    >
        <Box
            sx={{
                display :'flex',
                alignItems :'center',
                justifyContent : 'space-evenly',
                backgroundColor : 'black',
                color : 'white',
                borderRadius : '10px 10px 0px 0px',
                py : '6px',
            }}
        >
            <SITEICON
                sx={{
                    fontSize : '50px',
                    color : BASECOLOR,
                }}
            />
            <Typography
                sx={{
                    display : { xs : 'none' , lg : 'flex'},
                    fontWeight : 'bold',
                    fontSize : '18px',
                    ml : '15px',
                    letterSpacing : '8px'
                }}
            >
                {SITENAME}
            </Typography>
        </Box>
        
        {/* Large to extra large screens sidebar */}
        <Box
            sx={{
                display : { lg : 'flex' , xs : 'none'},
                flexDirection :'column',
                flex :1,
                justifyContent : 'space-evenly',
                px : '10px',
            }}
        >
        
            {SidebarConsts.map((item) => {
            return (
                <Button
                    key={item.id}
                    sx={{ 
                        display : 'flex' , 
                        alignItems :'center',
                        textTransform : 'none',
                        justifyContent :'start',
                        color : location.pathname === item.route? BASECOLOR : COLOR,
                        py : '10px',
                        borderRadius : '30px',
                        '&:Hover' : {
                            backgroundColor : BACKGROUNDCOLOR,
                            color : BASECOLOR,
                            borderRadius : '30px',
                            transform : 'scale(1.02)',
                            transition : 'color 100ms ease-out '
                        }
                    }}
                    onClick={() => navigate(item.route)}
                >
                    <item.Icon 
                        sx={{
                            display :navigation.state === 'loading' && navigation.location.pathname === item.route 
                                ? 'none' 
                                : 'flex',
                            color : location.pathname === item.route? BASECOLOR : 'inherit',
                            fontSize : '2rem' ,
                            ml : '10px',
        
                        }}
                    />
                    <CircularProgress
                        size='2rem'
                        sx={{
                            display :navigation.state === 'loading' && navigation.location.pathname === item.route
                            ? 'flex' : 'none',
                            color : BASECOLOR,
                            ml : '10px',
                        }}
                    />
                   
                    <Typography
                        component='h2'
                        variant='h2'
                        sx={{
                            fontWeight : 800,
                            fontSize : '20px',
                            ml : '15px',
                            borderRadius : '30px'
                        }}
                    >
                        {item.label}
                    </Typography>
                </Button>
            )
        })}
        <Button
            startIcon={<AddTwoToneIcon />}
            variant='contained'
            fullWidth
            sx={{
                display : setCreateDisplay() ? 'flex' : 'none',
                borderRadius :'30px',
                backgroundColor : BASECOLOR,
                border : 'none',
                fontSize : '20px',
                fontWeight : 900,
                textTransform :'none',
                height :'50px',
                mt : '20px',
            }}
            onClick={() => navigate(`${location.pathname}/create`)}
        >
            Create
        </Button>
        </Box>

        {/* Small to medium screens sidebar */}
        <Box
            sx={{
                display : { lg : 'none' , sm : 'flex'},
                flexDirection :'column',
                alignItems : 'center',
                flex : 1,
                px : '10px',
                justifyContent : 'space-evenly'
            }}
        >
             {SidebarConsts.map((item) => {
            return (
                <IconButton
                    key={item.id}
                    sx={{ 
                        display : 'flex' , 
                        //p : '10px',
                        '&:Hover' : {
                                borderRadius : '50%',
                                
                        }
                    }}
                    onClick={() => navigate(item.route)}
                >
                    <item.Icon 
                        sx={{
                            display :navigation.state === 'loading' && navigation.location.pathname === item.route 
                                ? 'none' 
                                : 'flex',
                            color : location.pathname === item.route? BASECOLOR : COLOR,
                            fontSize : '35px' ,
                            '&:Hover' : {
                                backgroundColor : BACKGROUNDCOLOR,
                                color : BASECOLOR,
                                borderRadius : '50%',
                                
                            }
                        }}
                    />
                    <CircularProgress
                        size='2rem'
                        sx={{
                            display :navigation.state === 'loading' && navigation.location.pathname === item.route
                            ? 'flex' : 'none',
                            color : BASECOLOR,
                        }}
                    />
                </IconButton>
            )
            })}
            
            <IconButton 
                sx={{
                    display : setCreateDisplay() ? 'flex' : 'none'
                }}
                onClick={() => navigate(`${location.pathname}/create`)}
            >
                <AddCircleTwoToneIcon 
                    sx={{ 
                        fontSize : '35px' , 
                        color : ACUTECOLOR , 
                        backgroundColor : BASECOLOR,
                        borderRadius :'30px',

                    }}
                />
            </IconButton>
        
            

        </Box>
        

        
        
    </Paper>
  )
}

export default SideBar