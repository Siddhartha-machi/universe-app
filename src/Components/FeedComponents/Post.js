import * as React from 'react';
import image from '/home/minato/Desktop/React/universe-app/src/Feature-Image-25-1-770x515.png';
import { Box } from '@mui/system';
import { Avatar, Button, createTheme, IconButton, Paper, Typography, useMediaQuery } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { ACUTECOLOR, BASECOLOR, COLOR, ELEVATION } from '../ComponentsStyles/GlobalConsts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { convertToSlug, humanizeDate } from '../UseContextsAndLoadersAndRouters/Loaders';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Post(props) {

  const postActions = [
    {
      id : 0,
      Icon : FavoriteIcon,
      label : 'Likes',
      value : props.data.post_like.length,
      color : 'deeppink'
    },
    {
      id : 1,
      Icon : CommentIcon,
      label : 'Comments',
      value : props.data.comments_count,
      color : 'green'
    },
    {
      id : 2,
      Icon : ShareIcon ,
      label : 'Share',
      value : null,
      color : BASECOLOR
    }
  ]


  const navigate = useNavigate()
  const path = useLocation()

  const postDetailPath = `${path.pathname}/${props.data.post_slug}`

  //const theme = createTheme()
  //const belowXs = useMediaQuery(theme.breakpoints.up['xs'])

  return (
    <Paper
      elevation={ELEVATION}
      sx={{
        display : 'flex',
        flexDirection : 'column',
        px : '15px',
        mb : { xs : '10px' , sm :'15px'},
        mx : { sm :  '10px' , xs : '5px' } ,
        pt : '15px',
        mt : '10px',
        borderRadius : '10px',
        border : '2px solid grey',
        backgroundColor : ACUTECOLOR,
        '&:Hover' : {
          backgroundColor : 'azure',
          cursor : 'pointer'
        }
      }}
    >
      <Box
        sx={{
          display :'flex',
          alignItems :'center',
          justifyContent :'space-between'
        }}

      >
        <Box
          sx={{ display :'flex' , alignItems :'center'}}
        >
        <Avatar 
          sx={{ 
            width :{ xs: '35px' , sm: '45px'},
            height : { xs: '35px' , sm: '45px'},
            mr : '12px',
            backgroundColor : 'green'
          }} 
        />
        <Box
          sx={{
            display :'flex',
            flexDirection : 'column',
          }}
        >
          
          <Typography
            sx={{
              fontWeight : 600,
              fontSize : {xs : '12px' , sm : '15px'}

            }}
            onClick={() => navigate(postDetailPath)}
          >
            {props.data.title}
          </Typography>
          <Typography
            //noWrap ={true}
            sx={{ 
              display : 'flex' ,
              alignItems :'center',
              fontSize : {xs : '10px' , sm : '15px'}
            }}
          >
            {`${props.data.author.first_name} ${props.data.author.last_name}`}
            <CircleIcon 
              sx={{ fontSize : '5px' ,color : 'grey' , mx : '8px'}}
            /> 
            {`${humanizeDate(props.data.created_at)}`}
          </Typography>
        </Box>
        </Box>
        
        <Box
          sx={{ 
            display :'flex'
          }}
        >
        <Button
          sx={{
            display : {xs : 'none' , sm : 'flex'},
            textTransform :'none',
            color : BASECOLOR,
            //backgroundColor : COLOR,
            borderRadius : '20px',
            fontWeight : 900,
          }}
        >
          Follow
        </Button>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
        </Box>
      </Box>
      <Typography
        sx={{
          textAlign : 'justify',
          p : '10px',
          fontSize : {xs : '10px' , sm : '12px'}
        }}
        onClick={() => navigate(postDetailPath)}
      >
        {`${props.data.description}`}
      </Typography>
      <Box 
        component={'img'}
        loading='lazy'
        src={props.data.post_image !== null ? props.data.post_image : ''}
        sx={{
          display : props.data.post_image !== null ? 'flex' : 'none',
          borderRadius : '10px',
          border : `1px solid grey`,
          backgroundColor : 'grey',
          maxWidth : '100%',
        }}
        onClick={() => navigate(postDetailPath)}
      />
      <Box
        sx={{ 
          display : 'flex' , 
          justifyContent : 'space-between',
          alignItems :'center',
          py : '10px'
        }}
      >
        {postActions.map((item) => {
          return (
            <Button
              disableRipple
              key={item.id}
              sx={{
                display : 'flex',
                alignItems :'center',
                fontSize :{xs : '10px' , sm : '15px'},
                fontWeight :600,
                textTransform :'none',
                color : item.color,
              }}
            >
              <item.Icon sx={{
                fontSize : {xs : '12px' , sm : '20px'},
                mr : '3px'
              }}/>
              <Typography
                sx={{
                  fontSize :{ xs : '10px' , sm : '15px'},
                  fontWeight : 600
                }}
              >
                {item.label}
              </Typography>
              {item.value !== null ?`(${item.value})`: ''}
            </Button>
          )
        })}
      </Box>
    </Paper>
  );
}
