/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Badge } from '@material-ui/core'
import { ShoppingCart, FavoriteBorder, Menu } from '@material-ui/icons';
import { push } from 'connected-react-router';

import { db } from '../../firebase';
import { getProductsInCart, getUserId } from '../../reducks/users/selectors';
import { fetchProductInCart } from '../../reducks/users/operations';

const HeaderMenus = (props) => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const uid = getUserId(selector)
    let productsInCart = getProductsInCart(selector)

    useEffect(() => {
        const unsubscribe = db.collection('users').doc(uid).collection('cart').onSnapshot(snapshots => {
            snapshots.docChanges().forEach(change => {
                const product = change.doc.data()
                const changeType = change.type

                switch (changeType) {
                    case 'added':
                        productsInCart.push(product)
                        break
                    case 'modified':
                        const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                        productsInCart[index] = product
                        break
                    case 'removed':
                        productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)
                        break
                    default:
                        break
                }
            })
            dispatch(fetchProductInCart(productsInCart))
        })
        return () => unsubscribe()
    },[])

    return (
        <div>
            <IconButton onClick={() => dispatch(push('/cart'))}>
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorder />
            </IconButton>
            <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={(event) => props.handleDrawerToggle(event)}
            >
                <Menu />
            </IconButton>
        </div>
    )
}

export default HeaderMenus
