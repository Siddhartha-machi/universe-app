import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, createTheme, IconButton, Typography, useMediaQuery } from '@mui/material';
import noimage2 from "/home/minato/Desktop/React/universe-app/src/imagePlaceholder.jpg"
import { useFormik } from 'formik';
import CreatePostForm from '../FormComponents/CreatePostForm';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GenericStepper from '../SupportComponents/GenericStepper';
import { PostValidationSchema } from '../FormComponents/ValidationSchemas';
import { convertToSlug, doPost } from '../UseContextsAndLoadersAndRouters/Loaders';

export default function CreatePostDialog(props) {
  
    //console.log('In the post create dialog!', props.open)

    //const dynamicOverlay = useDynamicOverlayContext()
    //const user = useUserDataContext()



    const navigate = useNavigate()
    const [stepper, setstepper] = React.useState(0)
    const [result, setresult] = React.useState({})
    const [imageState, setimageState] = React.useState(
        {
          image_url : '',
          invalid : false
        }
      )
    const formik = useFormik({
      initialValues :{
          title :'',
          description : '',
          post_image : undefined,
      },
      validationSchema : PostValidationSchema,
      onSubmit : values => {
        formik.setSubmitting(true)
        const formData = new FormData()
        formData.append('title' , values['title'])
        formData.append('description' , values['description'])
        if(values['post_image']){
          formData.append('post_image',values['post_image'] , values.post_image.name)
        }
        formData.append('author' , { email : 'user.authState.email'})
        formData.append('post_slug' ,convertToSlug(values['title']))
        console.log('Sending form data' ,formData)
        const response = doPost('posts'  ,'user.authState.token' , formData)
        response.then((response) => {
          responseHandler(response)
        }).catch((error) => {
          console.log("Caught the error while reading the promise object",error)
        })
          
        
      }

  })

  const responseHandler = (response) => {
    if(response.request.status < 400){
      setresult({ message : 'Successfully created Post' , success : 2})
      resetHandler(formik)
      setimageState('')
    }else if(response.request.status !== 401){
      setresult({ message : 'Found one or more errors in data' , success : 1})
      try{
        setFieldErrors(Object.keys(formik.values) ,response.request.statustText)
      }catch(err){
        console.log('Error caught while setting field errors!', err)
      }
      
    }else {
      setresult(
          { 
            message : response.request.status >= 500 
              ?'Something went seriously wrong! Try again later'
              :'Seems you are offline or some unknown error occured!' , 
            success : 0 
          }
        )
    }
    
    formik.setSubmitting(false)

  }

  const setFieldErrors = (fields , errors) => {
    let newErrors = {}
    for( let field in fields){
      if( fields[field] in errors){
        newErrors[fields[field]] = errors[fields[field]]
      }else{
        newErrors[fields[field]] = ''
      }
    }
    formik.setErrors(newErrors)
    
  }
  
  const resetHandler = (formik) => {
    formik.handleReset()
    setimageState({image_url : '' , invalid : false})
  }


  
  const overlayHandler = () => {
    resetHandler(formik)
    navigate('/all-posts')
    //dynamicOverlay.setdynamicOverlayData(dynamicOverlay.dynamicOverlayData[0].id)
  }

  const theme = createTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    
  return (
    <Dialog 
    fullScreen={fullScreen}
    open={props.open ? props.open : false}
    onClose={(e) => overlayHandler()}
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
      
      <Container maxWidth='xs' >
      { result.message
            ? <Box
                sx={{
                  display :'flex',
                  alignItems: 'center',
                  position :'absolute',
                  zIndex : 1501,
                  top : '2%',
                  left: '2%',
                  right : "2%",
                  //margin : 'auto',
                  borderRadius : '10px',
                  p : '8px',
                  transition :"opacity 200ms ease-in",
                  backgroundColor :result.success === 2 
                    ? 'green' 
                    : result.success === 0 ? '#f00505' : 'orangered',
                  color : 'white',
                }}
              >
                <IconButton
                  sx={{ 
                    position : 'absolute',
                    top : 0,
                    right : 0,
                    p : 0,
                    //backgroundColor : 'green'
                  }}
                  onClick={() => setresult({})}
                >
                  <CloseOutlinedIcon sx={{color : 'white' ,}}/>
                </IconButton>
                <Box sx={{ display : 'flex' , flex : 0.95 , justifyContent :'stretch' ,alignItems :'center'}}>
                {
                  result.success 
                  ?<TaskAltIcon  fontSize='large'/>
                  :<ErrorIcon  fontSize='large'/>
                }
                <Typography
                    sx={{
                      textAlign : 'center',
                      fontWeight : 'bold',
                      px : '8px',
                      fontSize : {xs : '15px' , lg : '20px'},

                    }}
                  >
                    {result.message}
                  </Typography>
                </Box>
                
              </Box>
            : <></>
          }
        <IconButton
            sx={{
              position :'absolute',
              right : 0,
              p : '15px',

            }}
            onClick={(e) => {overlayHandler()}}
            
          >
            <CloseOutlinedIcon />
        </IconButton>

        <Box
          sx={{
            mt : '20px',
            width : 'auto'
          }}
        >
        
        
        <Typography sx={{ textAlign : "center" , fontWeight :'bold'}}>Create New Post</Typography>
        </Box>
        
        
        <Box  
            sx={{ 
                
                display :'flex' , 
                flexDirection :'column',
                justifyContent :'space-between',
                alignItems :'center',
                width :'100%',
                mt : '10px',
            }}
        >
          
          <CreatePostForm 
                formik={formik} 
                stepper={stepper}
                imageState={imageState}
                setimageState={setimageState}
                setstepper={setstepper}                
              />
            
              
        </Box>
        
      </Container>
    </Dialog>
  );
}