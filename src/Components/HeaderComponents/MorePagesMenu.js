import { IconButton, Menu } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NavigationConsts } from '../Constants/NavigationConstants'
import LinkComponent from '../SupportComponents/LinkComponent'
import MenuIcon from '@mui/icons-material/Menu';
import { ACUTECOLOR, COLOR } from '../ComponentsStyles/GlobalConsts'

const MorePagesMenu = (props) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={props.handleOpenNavMenu}
              color={'inherit'}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={props.anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(props.anchorElNav)}
              onClose={props.handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              {NavigationConsts.map((page) => (
                  <LinkComponent
                    setting={page}
                    key={page.id}
                    color={COLOR}
                  />
              ))}
            </Menu>
          </Box>
  )
}

export default MorePagesMenu