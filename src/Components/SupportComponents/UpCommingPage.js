import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ErrorStyles } from '../ComponentsStyles/HeaderStyles'
import EngineeringIcon from '@mui/icons-material/Engineering';
import { BASECOLOR } from '../ComponentsStyles/GlobalConsts';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UpCommingPage = (props) => {
    const navigate = useNavigate()
  return (
    <Box
        sx={{
            ...ErrorStyles
        }}
    >
        <EngineeringIcon 
            sx={{
                fontSize :{md : '80px' , xs : '50px'},
            }}
        />
        <Typography
            sx={{
                p : '10px',
                textAlign : 'center',
                fontSize : { xs : '15px' , md : '20px'},
                fontWeight : 600,
                //display :'flex',
                // flexDirection :'column',
                // //alignItems : 'center',
            }}
        >
            Pardon us!, the page you are looking for isn't available yet.
            We understand your enthusiasm! But we are still working on the 
            <Typography 
                variant='overline'
                sx={{
                    color:BASECOLOR,
                    fontWeight : 600,
                    fontSize :{ xs : '12px' , md : '15px'},
                   
                }}
            >
                {` " ${props.label} " `}
            </Typography>
            page and it'll made available to you in no time.
            We deeply regret the inconvenience caused 
            <br/>Thanks for understanding.
        </Typography>
        <Button
            startIcon={<ArrowBackIcon />}
            sx={{
                color : BASECOLOR,
                fontSize :{ xs : '12px' , md : '15px'},
            }}
            onClick={() => navigate('/')}
        >
            Go back Home
        </Button>
        <Outlet />
    </Box>
  )
}

export default UpCommingPage