import { Box } from '@mui/system'
import React from 'react'
import { BASECOLOR } from '../ComponentsStyles/GlobalConsts'
import { revolveFunc } from '../UseContextsAndLoadersAndRouters/Loaders'


const LoadingComponent = (props) => {
    const rings = []
    const colors = ['green' ,'#299617' ,'#32CD32','#009150','darkcyan']
    if(props.rings !== null && props.rings !== undefined){
        for(let i = 1 ; i <= props.rings ; i++){
            rings.push(i)
        }
    }else{
        rings = [1,2,3,4,5,6]
    }

    const generateAnimationFunction =(radius) => {

        
        const dynamicFunc = `@keyframes spin${radius}`
        const axis = (radius % 2) === 0 
                    ? 'X'
                    : 'Y'
                        
        const keyFrames = { [dynamicFunc] : revolveFunc(axis)}
        //console.log(keyFrames)
        return keyFrames
    }

  return (
    <Box
            sx={{
                position :'relative',
                alignItems :'center',
                justifyContent :'center',
                display :'flex',
                backgroundColor :'green',
                top : 0,
            }}
        >
            {rings.map((radius) => {
                return (
                    <Box 
                        key={radius}
                        sx={{
                            borderRadius : `${radius}rem`,
                            border : `${radius}px solid ${BASECOLOR}`,
                            fontSize : `${radius}rem`,
                            //color : (radius%2) === 1 ? 'green' : 'blue',
                            p : `${radius*6}px`,
                            position :'absolute',
                            animation: `spin${radius} 2.5s infinite `,
                            ...generateAnimationFunction(radius)
                        }}
                    />
                )
            })}
        </Box>
  )
}

export default LoadingComponent