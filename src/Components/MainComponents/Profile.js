import { Avatar, Button, Link, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import NoAccountsOutlinedIcon from '@mui/icons-material/NoAccountsOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import { BASECOLOR, COLOR, ELEVATION } from '../ComponentsStyles/GlobalConsts';
import profileBackground from '/home/minato/Desktop/React/universe-app/src/profile_background.png';


const InlineButton = (props) => {
    return (
        <Link
        component={'button'}
        underline="none"
        
            sx={{
                textTransform :'none',
                fontSize :'16px',
                px :'5px',
                fontWeight :'1000',
                "&:Hover" : {
                    color : props.hColor ? props.hColor :'gold',
                    backgroundColor :'inherit'
                    }
                }}
                
                onClick={() => props.navigate(props.to) }
        >
            {props.label}
        </Link>
    )

}

const ActivityChip = (props) =>  {
    return (
        <Box
            sx={{ 
                display :'flex',
                flexDirection : 'column',
                alignItems :'center',
                px : '8px',
                color : 'grey',
                borderRight : props.border ?'1px solid grey' :'none',
            }}
        >
            <Typography 
                key={0}
                sx={{
                    fontWeight : 600,
                    color : COLOR
                }}
            >
                {props.value}
            </Typography>
            <Typography 
                key={1}
                sx={{fontWeight : 600, fontSize :'12px'}}
            >
                {props.label}
            </Typography>
        </Box>
    )
}

const BadgeIcon = (props) => {
    return (
        <props.Icon 
            sx={{ 
                position : 'absolute',
                bottom :0,
                right :0,
                color :'green',
            
            }}
            fontSize='large'
        />
    )
}

const badges = {
    Admin : AdminPanelSettingsTwoToneIcon ,
    User :VerifiedUserTwoToneIcon,
    Teacher : BadgeTwoToneIcon
}



const UserProfile = (props) => {
    const capFirst = (name) => {return name}
    const getDate = (date) => {return date}
    //const authState = useUserDataContext()
    const navigate = useNavigate()
   //console.log('in profile component' , authState.authState)

   const profileStyles = {
    display : { xs : 'none' , md : 'flex'},
    flex : 0.25,
    flexDirection :'column',
    alignItems : 'center',
    height : '650px',
    mt : '5px',
   }
    if (false){
        return (
            <Paper 
                elevation={ELEVATION}
                sx={{
                    pt :'50px',
                    ...profileStyles,
                }}
            >
                <CircularProgress sx={{ color :BASECOLOR}}/>
                <Typography sx={{p:'10px'}}>Fetching profile</Typography>
            </Paper>
            )
    }else if (false){
        return  (   
                    <Paper 
                        elevation={ELEVATION}
                        sx={{  
                            ...profileStyles,
                            pt :'25px',
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{
                               fontWeight :600 
                            }}
                        >
                            No Profile
                        </Typography>
                        <NoAccountsOutlinedIcon fontSize='large' color='warning'/>
                        <Typography sx={{ p : '10px' , textAlign :'center' ,fontWeight :600}}>
                            Huh, Seems like you are not logged in. Click  
                            <InlineButton label='here' navigate={navigate} to='/login'/> 
                            to login and see the latest or If you are new,<InlineButton label='join Universe' navigate={navigate} to='/register'/> 
                            community now!
                        </Typography>
                        
                    </Paper>
                )
    }else{
        return (
            <Paper
                elevation={0}
                sx={{ 
                    ...profileStyles,
                    position :'relative',
                    justifyContent :'space-between',
                }}
            >
            <Box
                sx={{
                    display :'flex',
                    position : 'absolute',
                }}
            >
                <Box
                    component={'img'}
                    src={profileBackground}
                    sx={{
                        //borderBottom :'3px solid gold',
                        //width :'100%'
                        backgroundColor :BASECOLOR,
                        width : '100%',
                        height : 'auto',
                        color :'white',
                        zIndex : 1,
                        borderRadius : '10px 10px 0px 0px',
                        objectFit :'contain',
                        
                    }}
                />
                <Box
                    sx={{
                        zIndex : 2,
                        position :'absolute',
                        top : '50%',
                        left : '35%',
                        right: '35%',
                        m : 'auto',

                    }}
                >
                    <Avatar 
                        alt={`${capFirst('Siddhartha Reddy')} ${'Machi'}'s profile`}
                        src={false//'authState.authState.profile' 
                            ?''// 'authState.authState.profile.profile_pic '
                            : ''//'no profile pic'
                        }
                        sx={{ 
                            width : '70px' , 
                            height :'70px' , 
                            //mr : '10px',
                            bgcolor :'purple',
                            //borderRadius : '10px',
                            border : '3px solid white'
                        }}
                    />
                    {'authState.authState.is_admin '
                        ?<BadgeIcon  Icon={badges.Admin} />
                        :'authState.authState.is_teacher'
                            ? <BadgeIcon Icon={badges.Teacher} />
                            : <BadgeIcon Icon={badges.User} />
                
                    }
                        
                    
                </Box>
                </Box>
                <Box sx={{ display:'flex',flex:0.2}}></Box>
                <Box
                sx={{
                    display :'flex',
                    flex:0.7,
                    flexDirection :'column',
                    alignItems : 'center',
                    justifyContent :'space-evenly',
                    color :'grey',
                    mx : '10px',
                    //borderBottom :'1px solid grey'
                }}
            >
                <Typography 
                    sx={{ 
                        p : '10px' , 
                        textAlign :'center' ,
                        fontWeight :600,
                        fontSize :'16px',
                        color : COLOR
                    }}
                >
                      {`${capFirst('Siddhartha Reddy')} ${capFirst('Machi')}`}      
                </Typography>

                <Typography 
                    sx={{
                        fontSize :'12px', 
                        textAlign :'center' ,
                        color :'grey',
                        mb :'5px'
                    }}
                >
                    {true  //'authState.authState.profile'
                        ? `From ${'Dr. BR. Ambedkar University'}`
                        :''
                    }
                </Typography>
            
                <Typography
                    sx={{
                        fontSize :'13px',
                    }}
                >
                    Active since {getDate('20th Jan 2023' , 'short')}
                </Typography>
            
                {true //'authState.authState.profile' 
                    ? <Typography sx={{ p : '10px',color :'grey' , textAlign :'center',fontSize :'15px' }}>
                            {'Hi Folks, My name is Siddhartha Reddy Machi. I am a tech enthusiast. My hobbies are reading Classics once in a while, browsing through web.'}
                    </Typography>
                    :<Typography 
                        sx={{ 
                            p : '10px' , 
                            textAlign :'center'  , 
                            //color :'darkcyan',
                            fontWeight :900
                        }}
                    >
                        Your profile is incomplete! People with good profile are tend to
                        get much notice. Complete it 
                        <InlineButton 
                            label='here' 
                            navigate={navigate} 
                            to={`/profile/${'authState.authState.email'}`}
                            hColor="white"
                        />
                            now!
                    </Typography>
                }
                <Box
                    sx={{
                        display :'flex',
                        alignItems :'center'
                    }}
                >
                
                    <ActivityChip
                        key={'posts'}
                        label={'Posts'}
                        value={250}
                        border
                    />
                    <ActivityChip
                        key={'followers'}
                        label={'Followers'}
                        value={80}
                        border
                    />
                    <ActivityChip
                        key={'following'}
                        label={'Following'}
                        value={15}
                    />
                </Box>
            </Box>
            
            <Button
                fullWidth
                sx={{

                    '&:Hover':{
                        backgroundColor :'transparent',
                    },
                    textTransform :'none',
                    borderTop :`1px solid ${BASECOLOR} `,
                    pb : '10px'
                }}
            >
                View Profile
            </Button>
            
            </Paper>
        
    )
}

}

export default UserProfile