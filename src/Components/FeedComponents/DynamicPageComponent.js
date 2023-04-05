import { Box, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLoaderData, useLocation, useNavigation } from 'react-router-dom'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { scrollStyles } from '../ComponentsStyles/GlobalConsts';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import LoadingPage from '../SupportComponents/LoadingPage';
import UpCommingPage from '../SupportComponents/UpCommingPage';
import ErrorPage from '../SupportComponents/ErrorPage';

const PageLocComponent = (props) => {
    return (
        <Box
            sx={{
                position :'sticky',
                top : 0,
                backgroundColor :'rgba(255,255,255,0.95)',
                display :'flex',
                //justifyContent :'start',
                alignItems :'center',
                py: '10px',
                fontWeight : 500,
                zIndex : 1200,
                borderRadius :'5px',
            }}
        >
            
            <DoubleArrowIcon 
                sx={{
                    color : 'green',
                    mx : '10px',
                    transform : 'rotateZ(90deg)'
                }}
            />
            {`Universe ${props.label}`}
            
        </Box>
    )
}



const DynamicPageComponent = (props) => {

    const data = useLoaderData()
    const loading = useNavigation()
    const path = useLocation()
    //if(loading.state === 'loading'){}
    console.log('Data in DPC' , data)
    
    
    if(loading.state === 'loading'){
        return <LoadingPage pageLabel={loading.location.pathname}/>
    }else{
        return (
            <Box
                sx={{
                    display : 'flex',
                    flexDirection :'column',
                    width : '100%',
                    height :'91vh',
                    ...scrollStyles,
                    mt : '5px',
                    px : { xs : '10px' , sm : '0px'},
                }}
            >
                
        
                {
                      data !== undefined && data.status === 200 
                        ?<Box
                            key={'data-rendering-component'}
                            sx={{
                                display :'flex',
                                flexDirection :'column-reverse',
                                zIndex : 1,
                            }}
                            >
                            <Typography
                                sx={{
                                    display :'flex',
                                    flexDirection :'column',
                                    alignItems : 'center',
                                    justifyContent :'center',
                                    fontSize : {xs : '12px'},
                                    p : '10px',
                                }}
                            >
                                <CrisisAlertIcon />
                                You've reached the depths of our Universe!
                            </Typography>

                            {
                            data.data.length > 0
                                ?data.data.map((item) => {
                                    return (
                                        <props.Component key={item.id} data={item}/>
                                    )
                                })
                                :<Box>No data found</Box>
                                
                        }
                            <PageLocComponent label={props.pageLabel}/>
                        </Box>
                        :data.response.status === 404 
                            ? <UpCommingPage label={path.pathname.split('/')[1].replace('-',' ')} />
                            : <ErrorPage />
        
                }
                
                
                <Box
                    sx={{
                        display : 'flex',
                    }}
                >
                    <Outlet key='Secondary-outlet'/>
                </Box>
        
            </Box>
          )
    }
   
}

export default DynamicPageComponent