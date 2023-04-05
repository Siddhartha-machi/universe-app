import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ACUTECOLOR } from '../ComponentsStyles/GlobalConsts'
import book from '/home/minato/Desktop/React/universe-app/src/Screenshot from 2023-03-04 11-17-47.png'
import { ELEVATION } from '../ComponentsStyles/GlobalConsts'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { convertToSlug } from '../UseContextsAndLoadersAndRouters/Loaders'

const Book = (props) => {

    const path = useLocation()
    const navigate = useNavigate()
    const bookDetailPath = `${path.pathname}/${convertToSlug(props.data.title)}`

  return (
    <Paper
        elevation={12}
        sx={{
            display :'flex',
            backgroundColor :ACUTECOLOR,
            //p : '10px',
            my : { xs : '10px' , sm :'15px'},
            mx : { sm :  '10px' , xs : '5px' } ,

            borderRadius :'10px',
            border : '2px solid skyblue',
        }}
    >
        <Paper 
            elevation={ELEVATION}
            component={'img'}
            src={props.data.book_image}
            alt={props.data.title}
            sx={{
                //width :{ xs : '100%' , sm : '50%'},
                maxWidth : '40%',
                m : '10px',
                border : '1px solid grey',
                borderRadius :'10px ',
                backgroundColor : 'grey',
                '&:Hover' : {
                    cursor : 'pointer'
                }
            }}
            onClick={() => navigate(bookDetailPath)}
        />
        <Box
            sx={{
                display :'flex',
                flexDirection :'column',
                alignItems :'center',
                flex : 1,
                
                justifyContent :'space-evenly',
            }}
        >
            <Typography
                key={'book-title'}
                component={'a'}
                href={bookDetailPath}
                sx={{
                    textAlign :'center',
                    fontWeight :'bold',
                    color : 'inherit',
                    // textDecoration : 'underline',
                    p : '10px',
                    fontSize : { xs : '12px' , sm : '15px'},
                }}
            >
                {props.data.title}
            </Typography>
            <Typography
                key={'book-department'}
                sx={{
                    textAlign :'center',
                    fontSize : { xs : '10px' , sm : '15px'},
                }}
            >
                {`For ${props.data.department} branch`}
            </Typography>
            <Typography
                key={'book-author(s)'}
                sx={{
                    textAlign :'center',
                    py : '10px',
                    fontSize : { xs : '10px' , sm : '15px'},
                }}
            >
                {`Author(s) : ${props.data.author}`} 
            </Typography>
            <Typography
            key={'book-publisher'}
                sx={{
                    textAlign :'center',
                    fontSize : { xs : '10px' , sm : '15px'},
                }}
            >
                {`Published by : ${props.data.publisher}`} 
            </Typography>
            <Typography
                key={'book-copies'}
                sx={{
                    textAlign :'center',
                    fontSize : { xs : '10px' , sm : '15px'},
                }}
            >
                {`${props.data.copies} copies Available`}
            </Typography>
            <Typography
                key={'book-length'}
                sx={{
                    textAlign :'center',
                    fontSize : { xs : '10px' , sm : '15px'},
                }}
            >
                {`Book length : ${props.data.pages} pages.`}
            </Typography>
            <Box
                sx={{
                    display :'flex',
                }}
            >
                {['Reserve' , 'SeeMore'].map((item) => {
                    return (
                        <Button 
                            fullWidth
                            key={item}
                            sx={{
                                fontSize : {xs :'10px' , sm : '15px'},
                                textTransform : 'none',
                                fontWeight :'bold'
                            }}
                        >
                            {item}
                        </Button>
                    )
                })}
            </Box>
        </Box>
    </Paper>
  )
}

export default Book