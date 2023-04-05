import { ACUTECOLOR, COLOR } from "./GlobalConsts"

const HeaderStyles = {
    display :'flex',
    alignItems :'center',
    JustifyContent :'space-between',
}

const LinkStyles =  {
        display : 'flex',
        alignItems :'center',
        textDecoration :'none',
        color : COLOR,
        fontWeight :600,
        px :'12px',
        py : '5px',
    
}

const HeaderNavStyles =  {
    display : 'flex',
    alignItems :'center',
    textDecoration :'none',
    color : COLOR,
    fontWeight :600,
    px :'12px',
    py : '5px',

}

const ErrorStyles = {
    
    display :'flex',
    flexDirection :'column',
    maxHeight : '1000px',
    height : '100vh',
    flex : 1,
    alignItems :'center',
    justifyContent :'center',

}
export {
    HeaderStyles,
    LinkStyles,
    HeaderNavStyles,
    ErrorStyles
}