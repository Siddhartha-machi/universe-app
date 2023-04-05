import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { BASECOLOR, ELEVATION } from '../ComponentsStyles/GlobalConsts'
import { humanizeDate } from '../UseContextsAndLoadersAndRouters/Loaders'
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';


const Bar = (props) => {
    return (
        <Box
            sx={{
                display : 'flex',
                alignItems :'center',
                m : '10px',
                //backgroundColor : 'black',
            }}
        >
        <Typography
            sx={{
                display : 'flex',
                flex : 0.25,
                p : '8px',
                m : 'auto',
                fontWeight :'bold',
                justifyContent :'center',
                fontSize : {xs : '12px' , sm : '15px'}
                //backgroundColor : 'grey'
            }}
        >
            {props.label}
        </Typography>
        <Box
            sx={{
                position : 'relative',
                display :'flex',
                alignItems : 'center',
                p : { xs : '1rem' , sm : '1.2rem'},
                flex : 1,
                borderRadius : '30px',
                backgroundColor : props.color,
            }}
        >
            <Typography
            sx={{
                position : 'absolute',
                display :'flex',
                alignItems : 'start',
                py : '1rem',
                pl : '5px',
                fontWeight : 'bold',
                //color : 'white',
                left : 0,
                right : `${100 - props.value}%`,
                borderRadius : '30px',
                backgroundColor : 'rgba(255, 255, 255, 0.65)',
            }}
        >
            {`${props.value}%`}
        </Typography>
        </Box>
        
        </Box>
        
    )
}

const PollButton = (props) => {
    return (
        <Button
            fullWidth
            disabled={props.pollState['loading']}
            variant='contained'
            sx={{
                backgroundColor : props.color,
                textTransform : 'none',
                fontWeight : 'bold',
                mb : '10px',
                fontSize : { xs : '12px' , sm : '15px'}
            }}
            onClick={() => props.pollStateHandler(props.option.id)}
        >
            {props.option.tag}
        </Button>
    )
}
const Polls = (props) => {

    const colors = ['green' , 'red' , BASECOLOR]
    const [pollState, setpollState] = React.useState(
            { 
                state : props.data.poll_tags,
                loading : false
            })

    const pollStateHandler = (id) => {
        setpollState({
            state : pollState['state'],
            loading : true
        })

        
        let newState = [...pollState['state']]
        let totalpoll = 1
        
        for(let item of pollState['state']){
            totalpoll = totalpoll + item.tag_count
        }
        for(let item of newState){
            if(item.id === id){
                item.tag_count = item.tag_count + 1
                const avg = item.tag_count/totalpoll
                item.tag_value = Number((avg * 100).toFixed(2))
            }else{
                const avg = (item.tag_count)/totalpoll
                item.tag_value = Number((avg * 100).toFixed(2))
            }
        }
        setpollState({
            state : newState,
            loading : false
        })
        
    }
  return (
    <Paper
        elevation={ELEVATION}
        sx={{
            display : 'flex',
            my : '6px',
            flexDirection :'column',
            backgroundColor : 'white',
            borderRadius : '10px',
            mx : '10px',
            border : '1px solid grey'
        }}
    >
        <Typography
            key={'poll-question'}
            sx={{
                display : 'flex',
                fontWeight : 'bold',
                justifyContent :'center',
                p : '12px',
                textAlign :'center',
                fontSize : { xs : '16px' , sm : '20px'},
            }}
        >
            {`Poll : ${props.data.poll_question}`}
        </Typography>
        <Box
            key={'start-end-dates'}
            sx={{ 
                display :'flex',
                justifyContent :'space-evenly',
                alignItems :'center',
            }}
        >
            <Box
                key={'start-date'}
                sx={{ display : 'flex' , flexDirection :'column' , alignItems:'center'}}
            >
                <Typography 
                    key={'available-since'}
                    sx={{ 
                        display : 'flex',
                        alignItems :'center',
                        justifyContent :'center',
                        fontWeight : 550,
                        fontSize : {xs : '10px' , sm : '12px'}

                    }}
                >
                    Available Since 
                    <ScheduleIcon sx={{ml : '5px', fontSize : '20px'}} />
                </Typography>
                <Typography
                    key={'since-date'}
                     sx={{
                        fontSize : '12px'
                    }}
                >
                    {humanizeDate(props.data.start_date)}
                </Typography>

            </Box>
            
            <Box
                key={'end-date'}
                sx={{ display : 'flex' , flexDirection :'column',alignItems:'center'}}
            >
                <Typography 
                    key={'available-for'}
                    sx={{ 
                        display : 'flex',
                        alignItems :'center',
                        justifyContent :'center',
                        fontWeight : 550,
                        fontSize : {xs : '10px' , sm : '12px'}
                    }}
                >
                    Available for 
                    <AccessAlarmIcon sx={{ml : '5px' ,fontSize : '20px'}}/>
                </Typography>
                <Typography
                    key={'for-date'}
                    sx={{
                        fontSize : '12px'
                    }}
                >
                    {humanizeDate(props.data.end_date)}
                </Typography>
            </Box>

        </Box>
        <Paper
            key={'status-chart'}
            elevation={6}
            sx={{
                display : 'flex',
                flexDirection : 'column',
                backgroundColor : 'rgba(255,255,255,0.9)',
                m : '15px',
                borderRadius : '30px',
                //alignItems :'center',
                //justifyContent :'center',
            }}
        >
            <Typography
                key={'current-status'}
                sx={{
                    textAlign :'center',
                    p : '10px',
                    fontWeight : 600,
                    fontSize : {xs : '15px' , sm : '18px'}
                }}
            >
                Current Status
            </Typography>

            {props.data.is_binary_type 
                ?pollState['state'].map((option , index) =>{
                        return (
                            <Bar 
                                key={option.id}
                                label={option.tag}
                                value={option.tag_value}
                                color={colors[index]}
                            />
                        )
                    } )
                
                
                :pollState['state'].map((option) =>{
                    return (
                        <Bar 
                            key={option.id}
                            label={option.tag}
                            value={option.tag_value}
                            color={BASECOLOR}
                        />
                    )
                } )
                
            }
        
        </Paper>
        
        <Box
            key={'poll-user-options'}
            sx={{
                display :'flex',
                flexDirection :'column',
                justifyContent :'space-between',
                mx : '15px',
                my : '10px'

            }}
        >
            <Typography
                key={'user-options-label'}
                sx={{
                    p : '10px',
                    fontWeight : 600,
                    fontSize : {xs : '15px' , sm : '18px'}
                }}
            >
                What do you think?
            </Typography>
            {pollState['state'].map((option ) => {
                return (
                    <PollButton
                        key={option.id} 
                        pollState={pollState}
                        option={option}
                        pollStateHandler={pollStateHandler}
                    />
                )
            })}

        </Box>
        
    </Paper>
  )
}

export default Polls