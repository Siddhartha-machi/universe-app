import { IconButton } from '@mui/material'
import React from 'react'
import { ACUTECOLOR, } from '../ComponentsStyles/GlobalConsts';
import {  MobileCreateConsts } from '../Constants/NavigationConstants';
import { Box } from '@mui/system';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';

const GenericFAB = () => {

    const path = useLocation()
    const navigate = useNavigate()
    const navigating = useNavigation()
    
  return (
    <Box
        sx={{
            display : { xs : 'flex' , sm : 'none'},
            position : 'absolute',
            zIndex : 1300,
            bottom : 80, right : 25,
        }}
    >
    {
        MobileCreateConsts.map((item) => {
            return (
                <IconButton
                    disabled={navigating.state === 'loading'}
                    key={item.id}
                    sx={{
                        backgroundColor :'green',
                        display : path.pathname.includes(item.route) 
                            ? 'flex' : 'none',
                        color : ACUTECOLOR,
                        p: '10px',
                        '&:Hover' : {
                            backgroundColor : 'green',
                            color : ACUTECOLOR
                        },
                    }}
                    onClick={() => navigate(`${path.pathname}/create`)}
                >
                    <item.Icon 
                        key={item.id}
                        sx={{
                            color : ACUTECOLOR,
                            fontSize : '1.6rem',

                        }}
                    />
                    
                </IconButton>
            )
        })
    }
    </Box>
    
  )
}

export default GenericFAB