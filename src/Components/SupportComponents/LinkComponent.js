import { Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASECOLOR } from '../ComponentsStyles/GlobalConsts'


const NavLinkComponent = (props) => {

    const naviagte = useNavigate()
    const location = useLocation()

    return (
        <Typography
            sx={{
                display :'flex',
                alignItems :'center',
                textDecoration :'none',
                color : location.pathname.includes(props.page.route) ? BASECOLOR :'black',
                fontWeight :600,
                px :'12px',
                py : '5px',
                '&:Hover' : {
                    color : BASECOLOR,
                    transition : 'color 150ms ease-in',
                    transform : 'scale(1.02)',
                    cursor : 'pointer'
                  }
                
            }}
            onClick={() => naviagte(props.page.route)}
        >
            <props.page.Icon 
                sx={{ 
                    m : '10px',
                    fontSize : '20px',
                }}
            />
            {props.page.label}
        </Typography>
    )
}

export default NavLinkComponent

