/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, makeStyles } from '@material-ui/core'
import { getProductsInCart } from '../reducks/users/selectors'
import { CartListItem } from '../components/Products'
import { GreyButton, PrimaryButton } from '../components/UIkit'
import { push } from 'connected-react-router'

const useStyle = makeStyles(() => ({
    root: {
        margin:'0 auto',
        maxWidth: 512,
        width: '100%',
    }
}))

const CartList = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const productsInCart = getProductsInCart(selector)

    const getToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    },[dispatch])

    const backToTop = useCallback(() => {
        dispatch(push('/'))
    },[dispatch])

    return (
        <section className="c-section-wrapin">
            <h2 className="u-text__headline">ショッピングカート</h2>
            <List className={classes.root}>
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
                )}
            </List>
            <div className="module-spacer--medium" />
            <div className="p-grid__column">
                <PrimaryButton label={"レジへ進む"} onClick={getToOrder} />
                <div className="module-spacer--extra-small" />
                <GreyButton label={"ショッピングを続ける"} onClick={backToTop} />
            </div>
        </section>
    )
}

export default CartList
