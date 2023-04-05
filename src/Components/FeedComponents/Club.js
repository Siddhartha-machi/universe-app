import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import logo from '/home/minato/Desktop/React/universe-app/src/logo512.png'
import Groups3Icon from '@mui/icons-material/Groups3';
import EventIcon from '@mui/icons-material/Event';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ShareIcon from '@mui/icons-material/Share';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { BACKGROUNDCOLOR, BASECOLOR, ELEVATION } from '../ComponentsStyles/GlobalConsts';
import { convertToSlug, humanizeDate } from '../UseContextsAndLoadersAndRouters/Loaders';
import { useLocation, useNavigate } from 'react-router-dom';

const Club = (props) => {

    const navigate = useNavigate()
    const path = useLocation()
    const detailPathURL = `${path.pathname}/${convertToSlug(props.data.club_name)}`

    const clubData = [
        {
            id : 0,
            Icon : Groups3Icon,
            label : 'Members',
            value : '20',
            
        },
        {
            id : 1,
            Icon : EventIcon,
            label : 'Events',
            value : '5',
        },
        {
            id : 2,
            Icon : WebStoriesIcon,
            label : 'Posts',
            value : '10'
        },

    ]

    const clubActions = [
        {
            id : 0,
            label : 'Join Club',
            Icon : PersonAddAlt1Icon,
            route : '/all-clubs'
        },
        {
            id : 1,
            label : 'Share',
            Icon : ShareIcon,
            route : '/all-clubs'
        },
        {
            id : 2,
            label : 'Know More',
            Icon : ArrowForwardIcon,
            route : '/all-clubs'
        },
        {
            id : 3,
            label : 'Donate',
            Icon : CurrencyRupeeIcon,
            route : '/all-clubs'
        },
    ]

  return (
    <Paper
        elevation={ELEVATION}
        sx={{
            display : 'flex',
            flexDirection :'column',
            my : '6px',
            mx : { sm : '10px' , xs : '5px'},
            borderRadius : '10px',
            backgroundColor : 'white',
            border : '1px solid grey',
            '&:Hover' : {
                backgroundColor : BACKGROUNDCOLOR,
                cursor : 'pointer'
            }

        }}

    >

        <Box
            sx={{
                display :'flex',
                alignItems :'center',
                justifyContent :'space-between',
            }}
            onClick={() => navigate(detailPathURL)}
        >
            <Box 
                component={'img'}
                src={props.data.club_logo}
                alt={props.data.club_name}
                sx={{
                    maxWidth :{xs : '40%' , sm :  '50%'},
                    borderRadius :'50%',
                    p : '10px'
                }}
            />
            <Box
                sx={{
                    display : 'flex',
                    flexDirection : 'column',
                    alignItems :'center',
                    justifyContent :'center',
                    flex : 1,
                }}
            >
                <Typography
                    sx={{
                        display : 'flex',
                        fontWeight :'bold',
                        flex : 1,
                        fontSize : { xs : '12px' , sm : '20px'},
                        textAlign :'center'
                    }}
                >
                    {props.data.club_name}
                </Typography>
                <Typography
                    sx={{
                        fontSize : { xs : '10px' , sm : '12px'}
                    }}
                >
                    {humanizeDate(props.data.club_created_date)}
                </Typography>
            </Box>
        </Box>

        <Box
            sx={{
                display :'flex',
                alignItems : 'center',
                justifyContent :'space-around',
                pb : '15px',

            }}
            onClick={() => navigate(detailPathURL)} 
        >
            {clubData.map((item) => {
                return (
                    <Typography
                        key={item.id}
                        sx={{
                            display :'flex',
                            alignItems :'center',
                            fontWeight : 600,
                            fontSize : { xs : '10px' , sm : '15px'}
                        }}
                    >
                        {<item.Icon 
                            sx={{ 
                                mr : { xs : '6px' , sm : '10px'},
                                fontSize : { xs : '15px' , sm : 'auto' }
                            }}
                        />}
                        {`${item.label}(${item.value})`}
                    </Typography>
                )
            })}
        </Box>        
        
        <Box
            sx={{
                display :'flex',
                justifyContent :'space-between',
                p : {xs : '5px' , sm : '10px'},
                borderRadius : '0px 0px 10px 10px',
                backgroundColor : 'rgba(0, 0, 0, 0.9)'
            }}
        >
            {clubActions.map((action) => {
                return (
                    <Button
                        key={action.id}
                        sx={{
                            display : 'flex',
                            flexDirection : { xs : 'column' , sm : 'row'},
                            fontSize : { xs : '7px', sm : '12px'},
                            color : BASECOLOR,
                            fontWeight :'bold'
                        }}
                    >
                        <action.Icon 
                            sx={{
                                fontSize : { xs : '20px'},
                                pb : '5px'
                            }}
                        />
                        {action.label}
                    </Button>
                )
            })}


        </Box>
    </Paper>
  )
}

export default Club