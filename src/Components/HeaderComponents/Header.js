import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavigationConsts, UserSettings } from '../Constants/NavigationConstants';
import { ACUTECOLOR, BASECOLOR, COLOR, ELEVATION, SITEICON, SITENAME } from '../ComponentsStyles/GlobalConsts';
import { Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLinkComponent from '../SupportComponents/LinkComponent';
import { useUserContext } from '../UseContextsAndLoadersAndRouters/ContextProviders';
import LoginIcon from '@mui/icons-material/Login';
import { LogoutUser } from '../UseContextsAndLoadersAndRouters/Loaders';


const SignInButton = (props) => {
  return(
    <Button
      startIcon={<LoginIcon />}
      onClick={() => props.navigation('login')}
      sx={{
        textTransform : 'none',
        fontWeight : 'bold',
      }}
    >
      Login
    </Button>
  )
}

function Header() {

  const navigate = useNavigate()
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const authState = useUserContext()
  //console.log('authstate' , authState)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const userSettingsNavigator = (route) => {
    
    if(route === '/logout'){
      authState.setloading(true)
      LogoutUser().then((res) => {
        authState.setData()
        authState.setloading(false)
      }).catch((err) => { 
        authState.setloading(false) 
        console.log('failed to logout use',err) 
      })
      
    }
    else if(location.pathname === '/'){
      navigate(`${location.pathname}${route}`)
      console.log('location',`${location.pathname}${route}`)
      
    }else{
      navigate(`${location.pathname}/${route}`)
      console.log('location',`${location.pathname}/${route}`)
    }
    handleCloseUserMenu()
  }

  return (
    <Paper
      elevation={ELEVATION}
      sx={{
        position :'sticky',
        backgroundColor : ACUTECOLOR,
        top : 0,
        borderRadius : { xl : '10px'},
        mb : '10px',
        zIndex : 1200,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          
          <Button 
            disableRipple
            sx={{ 
              color : COLOR,
              display :'flex',
              alignItems :'center',
              display: { xs: 'none', md: 'flex' },
              fontSize : '50px', 
              '&:Hover' : {
                color : BASECOLOR,
                backgroundColor : ACUTECOLOR
              }               
            }} 
          >
            <SITEICON 
                sx={{
                  fontSize : '45px',
                  mr : '10px'
                }}
            />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 1000,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',

            }}
            onClick={() => navigate('/')}
          >
            
            {SITENAME}
          </Typography>

          </Button>
         

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon fontSize='small'/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {NavigationConsts.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SITEICON 
            sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                mr: 1,
                fontSize : '30px',
                color : BASECOLOR
            }} 
          />
          <Typography
            variant="h5"
            noWrap
            
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 1000,
              fontSize : '12px',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:Hover' : {
                color : BASECOLOR
              }
            }}
            onClick={() => navigate('/')}
          >
            {SITENAME}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {NavigationConsts.map((page) => (
              <NavLinkComponent key={page.id} page={page} />
            ))}
          </Box>

          {authState.loading 
                ? <Typography>loading...</Typography> 
                : <Box 
                    sx={{ 
                      flexGrow: 0 , 
                      display :'flex',
                      alignItems :'center',
                    }}
                  >
                    <Typography
                      sx={{
                        display : {xs : 'none' , lg : 'flex'},
                        borderRight : '2px solid black',
                        fontSize : '15px',
                        fontWeight :'bold',
                        mr : '10px',
                        pr : '5px',
                      }}
                    >
                      {authState.data.authenticated
                          ?`${authState.data.first_name} ${authState.data.last_name}`
                          :<SignInButton navigation={userSettingsNavigator} />
                      }
                    </Typography>
                    <Tooltip title="User settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar 
                          alt={authState.data.authenticated 
                                ? `${authState.data.first_name} ${authState.data.last_name}`
                                :`User's profile photo` 
                              }
                          src={
                                authState.data.authenticated 
                                  ?authState.data.profile === undefined || authState.data.profile === null
                                    ?`${authState.data.first_name}`
                                    :`${authState.data.profile.profile_pic}`
                                  :''
                              }
                          sx={{
                            width : {xs : '35px' , md : '40px'},
                            height : {xs : '35px' , md : '40px'}
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {UserSettings[authState.data.authenticated  ? 1 : 0].map((setting) => (
                          <Typography 
                            key={setting.id}
                            sx={{
                              display : 'flex',
                              alignItems :'center',
                              p : '10px',
                              px : '15px',
                              fontSize : { xs : '12px' , md : '15px'},
                              textDecoration :'none',
                              fontWeight : 600,
                              color :location.pathname.includes(setting.route)? BASECOLOR : COLOR,
                              '&:Hover' :{
                                color : BASECOLOR,
                                cursor : 'pointer'
                              }
                            }}
                            onClick={() => userSettingsNavigator(setting.route)}
                          >
                            <setting.Icon sx={{ pr : '10px' , fontSize : { xs : '20px' , md : '30px'}}}/>
                            {setting.label}
                          </Typography>
                      ))}
                      <Button 
                            disableRipple
                            variant='text'
                            key={3}
                            sx={{
                              display : { xs : authState.data.authenticated ? 'flex' : 'none', md : 'none'},
                              alignItems :'center',
                              p : '10px',
                              textTransform : 'none',
                              fontSize : { xs : '12px' , md : '15px'},
                              px : '15px',
                              fontWeight : 600,
                              color : COLOR,
        
                              '&:Hover' :{
                                color : BASECOLOR,
                                backgroundColor : ACUTECOLOR
                              }
                            }}
                            onClick={() => console.log('Clicked on the profile button!')}
                          >
                            <AccountCircleIcon sx={{ pr : '10px', fontSize : { xs : '20px' , md : '30px'}}}/>
                            {'Profile'}
                          </Button>
                    </Menu>
                  </Box>
              }
          
        </Toolbar>
      </Container>
      
    </Paper>
  );
}
export default Header;
