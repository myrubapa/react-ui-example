import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import SvgIcon from 'material-ui/SvgIcon'
import IconButton from 'material-ui/IconButton'
import * as STYLE from '../styles/style'

const style = {
  sidebarIcon: {
    color: `${STYLE.SECOND_TEXT_COLOR} !important`
  }
}

const SidebarIcon = (props) => {
  const { classes, onTouchTap, position } = props
  const translate = position ? 'translate(250px)' : 'translate(50px) scale(-1)'
  return (
    <IconButton onTouchTap={onTouchTap} style={{ transform: translate, position: 'absolute' }}>
      <SvgIcon className={classes.sidebarIcon}>
        <path d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
      </SvgIcon>
    </IconButton>
  )
}

SidebarIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  onTouchTap: PropTypes.func.isRequired,
  position: PropTypes.bool
}

export default injectSheet(style)(SidebarIcon)
