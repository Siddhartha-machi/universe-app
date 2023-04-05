import { ErrorOutlineRounded } from '@mui/icons-material'
import React from 'react'
import { authenticate, getAuthState, LogoutUser } from './Loaders'

const UserContext = React.createContext()

const  UserProvider = ({children}) => {
  const state = {
    email : '',
    token : '',
    authenticated : false
  }
  const [authState, setauthState] = React.useState(state)
  const [loading, setloading] = React.useState(false)

  const alterState = (newState) => {

    if(newState === undefined){
      setauthState(state)
    }else {
      setauthState({...newState,authenticated : true})
    }
  }

  React.useEffect(() => {
    let set = true
    setloading(true)
    getAuthState().then((res) => {
      console.log('creds fetch from localforage', res)
      if(res.email !== undefined){
        authenticate(true).then((res) => {
          if(set){
            console.log('resfreshing authstate',res)
            alterState(res.data)
            setloading(false)
          }else{
            alterState()
          }
        }).catch((err) => {
          setloading(false)
          console.log('error occured while fetching profile',err)
        })
      }else{
        setloading(false)
      }
    }).catch((err) => {
          setloading(false)
    })

    return () => set = false
  },[])



 

  return (
    <UserContext.Provider 
      value={{ 
              data : authState , 
              setData : alterState , 
              loading : loading,
              setloading : setloading,

          }}
    >
        {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => React.useContext(UserContext)





export  { useUserContext , UserProvider }