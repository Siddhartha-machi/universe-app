import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, createTheme, Grid, IconButton, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { LoginValidationSchema } from '../FormComponents/ValidationSchemas';
import LockIcon from '@mui/icons-material/Lock';
import { ACUTECOLOR, BASECOLOR, SITEICON, SITENAME } from '../ComponentsStyles/GlobalConsts';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoginAuthConst } from '../Constants/NavigationConstants';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useUserContext } from '../UseContextsAndLoadersAndRouters/ContextProviders';
import CircularProgress from '@mui/material/CircularProgress';
import { authenticate } from '../UseContextsAndLoadersAndRouters/Loaders';

export default function LoginDialog(props) {


    

    const navigate = useNavigate()
    const authState = useUserContext()
    const [open, setopen] = React.useState(props.open)
    //console.log('authstate' , authState)
    const [showPassword, setShowPassword] = React.useState(false);
    const location = useLocation()

    const formik = useFormik({
      initialValues :{
          username : '',
          password : '',
          non_field_errors : ''
      },
      validationSchema : LoginValidationSchema,
      onSubmit : values => {
        formik.setSubmitting(true)
        authState.setloading(true)
        const formData = new FormData()
        formData.append('username' , values['username'])
        formData.append('password' , values['password'])
        
        authenticate(false , formData)
            .then((response) => {
                if(response.status !== 200){
                    authState.setloading(false)
                    responseHandler(response)
                }else{
                    authState.setData(response.data)
                    authState.setloading(false)
                    formik.setSubmitting(false)
                    overlayHandler()
                }
                  
            }).catch((error) => {
                console.log("Caught the error while reading the promise object in login dialog",error)
                authState.setloading(false)
                formik.setSubmitting(true)  
            })
       
        
      }

    })
    const overlayHandler = () => {

        formik.resetForm()  
        setopen(!open)
        const redirectUrl = location.pathname
        console.log('Redirect Url',redirectUrl)
        navigate(redirectUrl)
        
        //navigate(-1)
    }


    

    React.useEffect(() => {
        // getAuthState().then((response) => {
        //     console.log('Creds from localforage' , response)
        //     if(response.email !== undefined){
        //         overlayHandler()
        //         return
        //     }
        // })
    } ,[])

  const responseHandler = (response) => {
    if(response.status < 400){
        formik.resetForm()
    }else if(response.status < 500){
      try{
        formik.setErrors(response.data)
      }catch(err){
        console.log('Error caught while setting field errors!', err)
      }
      
    }
    
    formik.setSubmitting(false)

  }


  



  
  

  const theme = createTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  
  const loginmargin = 1
  return (
    <Dialog 
        fullScreen={fullScreen}
        open={open}
        onClose={(e,action) => {
            if(action === 'backdropClick' || action === 'escapeKeyDown'){
                return
            }
            overlayHandler()
        }}
        PaperProps={{
        sx: { 
            borderRadius: { xs : '0px' , sm : "20px"} ,
            width :{ sm : '60%',md : '50%' , lg : '35%'},
            minHeight : '550px',
            display :'flex' , 
            flexDirection :'column',
            
        }   
    }}
    
  >
      
    <Box 
        sx={{
            display : 'flex',
            flexDirection : 'column',
            flex : 1,
            px : '10px',
            m  : 0,
            justifyContent : 'center',
            position : 'relative'
        }}
    >
        <IconButton
            disabled={formik.isSubmitting}
            sx={{
                position : 'absolute',
                right :0,top : 0,
                m : loginmargin
            }}
            onClick={() => overlayHandler()}
        >
            <CloseOutlinedIcon 
                sx={{ color : 'black'}}
            />
        </IconButton>
        <Typography 
                sx={{ 
                    fontWeight :'bold',
                    letterSpacing : '8px',
                    display :'flex',
                    flexDirection : 'column',
                    alignItems :'center',
                    justifyContent : 'start',
                    mb: loginmargin ,
                }}
            >    
                <SITEICON sx={{ mb : '10px' , fontSize : '50px'}}/>
                {SITENAME}
        </Typography>
        <Box
          sx={{
            display : 'flex',
            flexDirection : 'column',            
          }}
        >
        
            
            <Typography 
                sx={{ textAlign : "center" , fontWeight :'bold'}}
            >   
                <LockIcon 
                    sx={{ color : BASECOLOR}}
                /><br/>
                {props.redirectUrl === undefined 
                    ? `SignIn`
                    :`You need to signIn to create!`
                }
            </Typography>
        </Box>
        
        
        <Box  
            component={'form'}
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit()
            }}
            sx={{ 
                
                display :'flex' , 
                flexDirection :'column',
                //justifyContent :'space-evenly',
                alignItems :'center',
                //flex : 1,

                m : loginmargin,
            }}
        >
            
                {formik.errors.non_field_errors !== undefined
                    ?   <Box
                            sx={{
                                display : 'flex',
                                alignItems :'center',
                                my : '5px',
                            }}
                        >
                            <PriorityHighOutlinedIcon fontSize='small' sx={{color : 'red'}}/>
                            {formik.errors.non_field_errors.map((err , index) => {
                                return(
                                    <Typography
                                        key={index}
                                        sx={{ 
                                            fontSize : '12px',
                                            color : 'red'
                                        }}
                                    >
                                        {err}
                                    </Typography>
                                )
                            })}
                        </Box>

                    : false
                }
            
            
            <TextField
                fullWidth
                required
                autoComplete='current-email'
                helperText={(formik.errors.username && formik.touched.username) ? formik.errors.username : ''}
                label="Email Address"
                {...formik.getFieldProps('username')}
                error={(formik.errors.username && formik.touched.username) || formik.errors.non_field_errors ? true : false}
                id="user-email-id-field"
                placeholder='davian@email.com'
                
                sx={{ my: loginmargin }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>,
                }}
            />
            <TextField
                fullWidth
                autoComplete='current-password'
                helperText={(formik.errors.password && formik.touched.password) ? formik.errors.password : ''}
                required
                label="Password"
                {...formik.getFieldProps('password')}
                error={(formik.errors.password && formik.touched.password) || formik.errors.non_field_errors ? true : false}
                type={showPassword ? 'text' : 'password'}
                id="user-password-field"
                placeholder={showPassword ? 'password' : '**********'}
                sx={{ my: loginmargin  }}
                
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>,
                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>,
                }}
            />
            
            
            
            <Button
                type='submit'
                variant='contained'
                disabled={formik.isSubmitting}
                fullWidth
                sx={{
                    backgroundColor : BASECOLOR,
                    textTransform : 'none',
                    fontWeight : 'bold',
                    m  : loginmargin,
                    borderRadius : '12px',
                    py : '10px',
                    fontSize : '16px',
                }}
            >
                {formik.isSubmitting 
                    ? <CircularProgress size={'1.8rem'} sx={{color : BASECOLOR}}/> 
                    : 'SignIn'
                }
            </Button>
            
        </Box>
        
        <Grid
            container
        >
            <Button
                variant='text'
                
                sx={{
                    color : BASECOLOR,
                    textTransform : 'none',
                    fontSize : '15px',
                    
                    flex : 1,
                    display : 'flex',
                }}
            >
                SignUp Here!
            </Button>
            <Button
                variant='text'
                
                sx={{
                    color : BASECOLOR,
                    textTransform : 'none',
                    fontSize : '15px',
                    flex : 1,
                    display : 'flex',
                }}
            >
                Forgot password?
            </Button>
        </Grid>
        <Typography
            sx={{
                textAlign : 'center',
                fontSize : '15px',
                m  : loginmargin
            }}
        >
            Other login methods...
        </Typography>
        <Grid
            container
            justifyContent={'space-around'}
            sx={{
                m : loginmargin
            }}
        >
            {LoginAuthConst.map((authItem) => {
                return (
                    <Button
                        key={authItem.id}
                        sx={{
                            display : 'flex',
                            //flex : 1,
                            color : 'black',
                            px  : '10px',
                            py : '12px',
                            borderRadius : '10px',
                            '&:Hover' : {
                                color : ACUTECOLOR,
                                backgroundColor : authItem.color,
                            }
                        }}
                    >
                        <authItem.Icon />
                    </Button>
                )
            })}
        </Grid>
      </Box>
    </Dialog>
  );
}