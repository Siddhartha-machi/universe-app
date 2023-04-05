import { Box } from '@mui/system'
import React from 'react'
import { Typography } from '@mui/material';
import { revolveFunc } from '../UseContextsAndLoadersAndRouters/Loaders';
import { keyframes } from 'styled-components';
import LoadinComponent from './LoadingComponent';
import { ErrorStyles } from '../ComponentsStyles/HeaderStyles';

const LoadingPage = (props) => {


    const label = props.pageLabel.split('/')[1].replace('-' ,' ')
    
  return (
    <Box
        sx={{
           ...ErrorStyles

        }}
    >
        <LoadinComponent rings={5} />
        <Typography
            sx={{
                mt : '50px',
            }}
        >
            {`Loading ${label} page...`}
        </Typography>
        <Typography
            sx={{
                mt : '10px',
            }}
        >
            {`Please wait it'll be done in a jiff.`}
        </Typography>
        
    </Box>
  )
}

export default LoadingPage