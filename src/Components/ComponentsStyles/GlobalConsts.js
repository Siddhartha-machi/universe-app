import BlurOnIcon from '@mui/icons-material/BlurOn';


const BASECOLOR = '#1DA1F2'
const COLOR = '#14171A'
const BACKGROUNDCOLOR = '#E8F5FE'

const SITENAME = 'UNIVERSE'
const ACUTECOLOR = 'white'

const ELEVATION  = 8

const SITEICON = BlurOnIcon

const scrollStyles = {
    overflow :"scroll",
    "&::-webkit-scrollbar" :{
      display : "none"
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none" ,
}


export {
    BASECOLOR,
    COLOR,
    BACKGROUNDCOLOR,
    SITENAME,
    ACUTECOLOR,

    ELEVATION,

    SITEICON,

    scrollStyles
}