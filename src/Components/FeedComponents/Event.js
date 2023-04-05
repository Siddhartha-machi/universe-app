import { Button, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ACUTECOLOR, BASECOLOR, ELEVATION } from '../ComponentsStyles/GlobalConsts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertToSlug } from '../UseContextsAndLoadersAndRouters/Loaders';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import CommentIcon from '@mui/icons-material/Comment';





export default function Event(props) {

    const images = props.data.event_images
    const navigate = useNavigate()
    const location = useLocation()
    const eventDetailPath = `${location.pathname}/${props.data.event_slug}`
    const frameColor = 'black'
    const actionList = [
    
        
        {
            id : 0,
            label : 'Like',
            Icon : FavoriteBorderIcon,
            color : 'deeppink',
            value : props.data.event_likes.length
        },
        {
            id : 1,
            label : 'Comments',
            Icon : CommentIcon,
            color : BASECOLOR,
            value : props.data.event_comments_count
    
        },
        
        {
            id : 2,
            label : 'Share',
            Icon : ShareIcon,
            color : BASECOLOR,
            value : null
    
        },
        {
            id : 3,
            label : 'See More',
            Icon : ReadMoreIcon,
            color : 'green',
            value : null
        },
    ]




  return (
    <Paper 
        elevation={ELEVATION}
        sx={{
            flexGrow: 1 , 
            m : '10px',
            minWidth : '250px',
            borderRadius : '10px',
            backgroundColor : 'transparent',
            '&:Hover' : {
                cursor : 'pointer'
            }
        }}
        
    >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                //position : 'absolute',
                justifyContent :'space-between',              
                height: 50,
                pl: 2,
                borderRadius :'10px 10px 0px 0px',
                backgroundColor : frameColor
            }}
        >
            <Typography
                component={'a'}
                href={`${location.pathname}${convertToSlug(props.data.event_title)}`}
                sx={{
                    fontWeight :'bold',
                    color : ACUTECOLOR,
                    textDecoration : 'none'

                }}
            >
                {props.data.event_title}
            </Typography>
            <IconButton>
                <MoreVertIcon 
                    sx={{
                        color : ACUTECOLOR
                    }}
                />
            </IconButton>
        </Box>

        <Splide 
            aria-label={`${props.data.event_title} images`}
            options={{
                    rewind : true,
                    type : 'slide',   
                    autoplay : true,
                    interval : 2000
                }}
            onClick={() => navigate(eventDetailPath)}
        >
            {images.map((img,index) => {
                return(
                    <SplideSlide
                        key={index}
                        
                    >
                        <img
                            key={index}
                            src={img.img_src.full_size} 
                            alt="Image 1"
                            style={{ 
                                width: '100%' , 
                                backgroundColor : 'grey',
                                //borderRadius : '0px 0px 10px 10px',
                                '&:Hover' : {
                                    cursor : 'pointer'
                                },
                                
                            }}
                        />
                        
                    </SplideSlide>
        
                )
            })}
            
            
        </Splide>

       
        <Box
            key={'actions-list'}
            sx={{
                display : 'flex',
                borderRadius : '0px 0px 10px 10px',
                backgroundColor : frameColor,
                justifyContent : 'space-around'
            }}
        >
            {actionList.map((item) => {
                return (
                    <Button
                        aria-label={item.label} 
                        key={item.id}
                        sx={{
                            display : 'flex',
                            flexDirection : { xs : 'column' , sm : 'row'} ,
                            color : item.color,
                            justifyContent :'center',
                            fontSize : '10px',
                            px : '10px',
                            my : '10px',
                            textTransform : 'none',
                        }}
                    >
                        <item.Icon 
                            sx={{
                                fontSize:'18px',
                                mb : '3px',
                            }}
                        />
                        
                        
                        <Typography
                            key={'complete-values'}
                            sx={{
                                display : { xs : 'flex' , sm : 'flex'},
                                fontSize : { xs : '10px' , sm : '12px'},
                                fontWeight :'bold',
                                ml : '5px',
                            }}
                        >
                            {   
                                item.value !== null 
                                ? `${item.label}(${item.value})` 
                                : `${item.label}`
                            }
                        </Typography>
                        
                    </Button>
                )
            })}

        </Box>
    </Paper>
  );
}