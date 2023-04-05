import { Button, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ACUTECOLOR, BASECOLOR } from '../ComponentsStyles/GlobalConsts'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { genericFileUploadHandler } from '../UseContextsAndLoadersAndRouters/Loaders';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

const CreatePostForm = (props) => {
  return (
    <Box
        component={'form'}
        onSubmit={(e) => {
            e.preventDefault()
            //console.log('post submitted!')
            props.formik.handleSubmit()
        }
        }
        sx={{
            display :'flex',
            flexDirection :'column',
            width : '100%',
            justifyContent :'space-evenly',
        }}
    >
        
        <TextField 
            fullWidth
            required
            id="outlined-basic" 
            label="Post title" 
            variant="outlined" 
            {...props.formik.getFieldProps('title')}
            helperText={props.formik.errors.title}
            error={props.formik.touched.title && props.formik.errors.title ? true : false}
            sx={{
                mb : '10px',
            }}
        />
        <TextField 
            fullWidth
            required
            multiline
            minRows={4}
            maxRows={4}
            {...props.formik.getFieldProps('description')}
            helperText={props.formik.errors.description}
            error={props.formik.touched.description && props.formik.errors.description ? true : false}
            id="outlined-basic" 
            label="Post Description" 
            variant="outlined" 
        />
        <Box
            sx={{
                display : 'flex',
                //backgroundColor :'green',
                mt : '10px',
                p :'10px',
            }}
        >

            {props.formik.values.post_image === undefined 
                ? <Box
                    sx={{
                        display :'flex',
                        alignItems :'center',
                    }}
                >
                    <ImageNotSupportedIcon sx={{mr : '10px' , color : 'red'}}/> 
                    No image selected 
                </Box>
                : <Box
                sx={{
                    display :'flex',
                    alignItems :'center',
                }}
            >
                <FileDownloadDoneIcon sx={{mr : '10px' , color : 'green'}}/> 
                Selected image {props.formik.values.post_image.name} 
            </Box>
            }
        </Box>
        

        <Box
            sx={{
                display :'flex',
                justifyContent :'space-between',
                position :'absolute',
                m : '8px',
                bottom : 0,left :0,right :0,
            }}
        >
            <IconButton
                component='label'
                key='add-image-button'
                sx={{
                    color : BASECOLOR,

                }}
            >
                <input 
                    hidden 
                    accept="image/*" 
                    type="file" 
                    onChange={(event) => genericFileUploadHandler(event , props.setimageState , props.formik)}
                />
                {props.formik.values.post_image === undefined 
                    ?<AddAPhotoIcon sx={{fontSize : '32px'}}/>
                    :<FlipCameraIosIcon sx={{fontSize : '32px'}}/>
                }
            </IconButton>
            <Button
                fullWidth
                type='submit'
                key='create-post-button'
                sx={{
                    display : 'flex',
                    flexGrow : 1,
                    ml : '10px',
                    textTransform :'none',
                    fontWeight : 'bold',
                    p : '5px',
                    color : ACUTECOLOR,
                    backgroundColor : BASECOLOR,
                    '&:Hover' :{
                        backgroundColor :BASECOLOR
                    }
                }}
            >
                {props.formik.isSubmitting ? 'loading...' : 'Create'}
            </Button>
        </Box>
    </Box>
  )
}

export default CreatePostForm