import React from 'react'
import { useDispatch } from 'react-redux';
import { IconButton, Badge } from '@material-ui/core'
import { ShoppingCart, FavoriteBorder, Menu } from '@material-ui/icons';
import { push } from 'connected-react-router';

const HeaderMenus = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={2} color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorder />
            </IconButton>
            <IconButton
                aria-label="Menu Item"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={(e) => props.handleDrawerToggle(e, true)}
            >
                <Menu />
            </IconButton>
        </div>
    )
}

export default HeaderMenus
