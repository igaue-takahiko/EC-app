import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, createStyles, makeStyles, Toolbar } from '@material-ui/core'
import { push } from 'connected-react-router'

import { getIsSignedIn } from '../../reducks/users/selectors'
import logo from '../../assets/img/icons/cartS2.png';
import { HeaderMenus, ClosableDrawer } from './index'

const useStyle = makeStyles(() => createStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444",
    },
    toolbar: {
        margin: "0 auto",
        maxWidth: 1024,
        width: "100%",
    },
    iconButton: {
        margin: "0 0 0 auto",
    }
}))

const Header = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const isSignedIn = getIsSignedIn(selector)

    const [ sideBarOpen, setSideBarOpen ] = useState(false)

    const handleDrawerToggle = useCallback((event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setSideBarOpen(!sideBarOpen)
    },[setSideBarOpen, sideBarOpen])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <Toolbar className={classes.toolbar}>
                    <img
                        alt="logo" src={logo} width="128px"
                        onClick={() => dispatch(push('/'))} role="button"
                    />
                    {isSignedIn && (
                        <div className={classes.iconButton}>
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open={sideBarOpen} onClose={handleDrawerToggle} />
        </div>
    )
}

export default Header
