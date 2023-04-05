import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const FeedComponent = () => {
  return (
    <Box
        sx={{ 
            display : 'flex', 
            flexDirection :'column',
            flex : { xs : 1 , md : 0.55, sm : 0.75, lg : 0.45},
            

        }}
    >
        <Box
          sx={{
            display : 'flex',
            justifyContent :'space-evenly' ,
            mb : '10px',
          }}
        >
          <Outlet key={'primary-outlet'}/>
        </Box>
    </Box>
  )
}

export default FeedComponent