import axios from "axios"
import localforage from "localforage"

const BASEURL = 'https://siddharthareddymachi.pythonanywhere.com'



const LoadData = async (path , creds) => {

    let config = {
        headers: {
          'Authorization': `Token ${creds}`
        }
    }
    try{
        const response = await axios.get(
            `${BASEURL}/${path}`,
            creds !== undefined ? config : null
        )
        return response
    }catch(err) {
        return err
    }
    
    
    
}

const doPost = async (path , data , token) => {


    try{
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post(
            `${BASEURL}/${path}/`,
            data,
            config
        )
        return response
    }catch(err){
        return err
    }
    
    
}

const authenticate = async (refresh  , data) => {
    let creds = {}
    let responseData = {}
    if(refresh){
        creds = await getAuthState()
    }else{
        try{
            const url = `${BASEURL}/token-auth/`
            const response = await axios.post(
                url,
                data
            )
            
            await localforage.setItem(
                'authToken' , 
                {   
                    email : data.get('username') , 
                    token : response.data.token
                }
            
            )
            creds = { 
                        email : data.get('username') , 
                        token : response.data.token 
                    }
        }catch(err){
            responseData = { data : err.response.data , status : err.request.status}
            return responseData
        }
    }

    try{
        const user = await LoadData(
            `userprofiles/${creds.email}/`, 
            creds.token
        )
        
        responseData = { data : {...user.data , token  : creds.token} , status : 200}
        return responseData
    }catch(err){
        responseData = { data : err.response.data , status : err.request.status}
        return responseData
    }
}


const getAuthState = async () => {
    let authData = {}
    try{
        authData = await localforage.getItem('authToken')
    }catch(err){
        console.log('error while fetching creds',err)
    }
    
    return authData
}

const LogoutUser = async () => {
    try{
        const logStatus = await localforage.removeItem('authToken')
        return logStatus
    }catch(err){
        console(`Error : failed logout user` , err)
    }
}

const genericFileUploadHandler = (event,setImage,formik) => {

    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            formik.setFieldValue('post_image' , event.target.files[0])
            setImage(
                URL.createObjectURL(event.target.files[0])
            )
        };
        reader.readAsDataURL(event.target.files[0]);
      }
}


const humanizeDate = (date) => {
    let newDate = new Date(date)
    let dateNow = new Date()
    if(
        newDate.getDay() !== dateNow.getDay() ||
        newDate.getFullYear() !== dateNow.getFullYear() ||
        newDate.getMonth() !== dateNow.getMonth() 
    ){
        newDate = newDate.toLocaleDateString('en-US' ,{month : 'short' , day : 'numeric' , year : 'numeric'})
    }else {
        newDate = `${newDate.getHours()}hrs`
    }
    
    
    return `${newDate}`
}


const revolveFunc = (axis) => {
    let frames = {}
    for ( let i = 1 , j = 1; i <= 360 && j <= 100; i = i + 3.6, j = j + 1){
      frames[`${j}%`] = { 
        transform : `rotate${axis}(${i}deg)`,
        //transform : `scale(${i})`,
        //opacity: `${i}`,
      }
    
    }
    return frames
}

const convertToSlug = (Text) => {
    return Text.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
  }

export {
    LoadData,
    doPost,
    getAuthState,
    authenticate,
    LogoutUser,
    convertToSlug,
    humanizeDate,
    genericFileUploadHandler,
    revolveFunc,
}