import React from 'react'
import { useSelector } from 'react-redux'
import {
    Divider,
    ListItem,
    ListItemText,
    ListItemAvatar,
    IconButton
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

import { getUserId } from '../../reducks/users/selectors';
import { db } from '../../firebase'

const useStyle = makeStyles(() => ({
    list: {
        height: 128
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 96,
        width: 96,
    },
    text: {
        width: '100%'
    }
}))

const CartListItem = (props) => {
    const classes = useStyle()
    const selector = useSelector(state => state)

    const image = props.product.images[0].path
    const price = props.product.price.toLocaleString()

    const removeProductFromCart = (id) => {
        const uid = getUserId(selector)
        return db.collection('users').doc(uid).collection('cart').doc(id).delete()
    }

    return (
        <div>
            <ListItem className={classes.list}>
                <ListItemAvatar>
                    <img className={classes.image} src={image} alt="商品のTOP画像" />
                </ListItemAvatar>
                <div className={classes.text}>
                    <ListItemText primary={props.product.name} secondary={`サイズ: ${props.product.size}`} />
                    <ListItemText primary={`¥${price}`}/>
                </div>
                <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
                    <Delete />
                </IconButton>
            </ListItem>
            <Divider />
        </div>
    )
}

export default CartListItem
