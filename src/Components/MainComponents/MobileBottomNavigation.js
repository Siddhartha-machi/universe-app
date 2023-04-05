import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { SidebarConsts } from '../Constants/NavigationConstants';
import { ACUTECOLOR, BASECOLOR, COLOR, scrollStyles } from '../ComponentsStyles/GlobalConsts';
import { Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


export default function MobileBottomNavigation(props) {
    
    const path = useLocation()
    //console.log('Navigation : ',path.pathname.split('/'))
    const [value, setValue] = React.useState(path.pathname);
    const navigate = useNavigate()
    const navigating = useNavigation()
    const loadingStatus = (item) => navigating.state === 'loading' && navigating.location.pathname === item.route

    return (
    <Box
        aria-label="universe navigation bar"
        sx={{
            display : { xs : 'flex', sm : 'none'},
            position : 'sticky',
            bottom : 0,
            zIndex : 1300,
            ...scrollStyles,
            borderRadius : '30px 30px 0px 0px',
            backgroundColor : ACUTECOLOR,
        }}
    >
        {SidebarConsts.map((item) => {
            return (
                <Button 
                    startIcon={
                        navigating.state === 'loading' && navigating.location.pathname === item.route
                        ?<CircularProgress 
                            size={'1.2rem'}
                            sx={{
                                display : navigating.state === 'loading' && navigating.location.pathname === item.route
                                ? 'flex' : 'none',

                            }}
                            />
                        :<item.Icon />
                    }
                    key={item.id}
                    sx={{ 
                        color : path.pathname.includes(item.route) ? BASECOLOR : COLOR,
                        fontWeight : 'bold',
                        mx : '18px',
                        fontSize : '12px',
                        display : 'flex',
                        textTransform :'none',
                        alignItems :'center',
                        borderRadius : '10px',
                        p : '10px',
                        px : '15px',
                        '&:Hover':{
                            backgroundColor :'transparent',
                            color : BASECOLOR,
                            transform :'scale(1.03)',
                            transition :"color 100ms ease-out",
                            
                        },
                    }}
                    onClick={() => navigate(item.route)}
                >
                    
                    
                    {item.label}
                </Button>
            )

        })}
    </Box>
  );
}