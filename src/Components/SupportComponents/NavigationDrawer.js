import { Drawer } from '@mui/material';
import React from 'react'


const NavigationDrawer = (props) => {

    
  return (
        <Drawer
            anchor={'left'}
            open={props.open}
            onClose={props.toggleDrawer(props.open)}
          >
            Profile
          </Drawer>
  )
}

export default NavigationDrawer