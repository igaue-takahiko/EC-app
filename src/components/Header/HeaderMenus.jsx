import React from 'react'
import { IconButton, Badge } from '@material-ui/core'
import { ShoppingCart, FavoriteBorder, Menu } from '@material-ui/icons';

const HeaderMenus = () => {
    return (
        <div>
            <IconButton>
                <Badge badgeContent={2} color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorder />
            </IconButton>
            <IconButton>
                <Menu />
            </IconButton>
        </div>
    )
}

export default HeaderMenus
