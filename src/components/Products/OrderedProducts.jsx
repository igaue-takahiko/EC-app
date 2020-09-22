import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { push } from 'connected-react-router'
import { Divider, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { PrimaryButton } from '../UIkit'

const useStyle = makeStyles(() => ({
    list: {
        background: '#fff',
        height: 'auto',
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16px 8px 0',
        height: 96,
        width: 96,
    },
    text: {
        width: '100%'
    }
}))

const OrderedProducts = (props) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const products = props.products

    const goToProductPage = useCallback((id) => {
        dispatch(push('/product/' + id))
    },[])

    return (
        <List>
            {Object.keys(products).map(key => {
                const product = products[key]

                return(
                    <>
                        <ListItem className={classes.list} key={product.id}>
                            <ListItemAvatar>
                                <img className={classes.image} src={product.images[0].path} alt="商品のトップ画像" />
                            </ListItemAvatar>
                            <div className={classes.text}>
                                <ListItemText primary={product.name} secondary={`サイズ: ${product.size}`} />
                                <ListItemText primary={`¥ ${product.price.toLocaleString()}`} />
                            </div>
                            <PrimaryButton label={'商品詳細を見る'} onClick={() => goToProductPage(product.id)} />
                        </ListItem>
                        <Divider />
                    </>
                )
            })}
        </List>
    )
}

export default OrderedProducts
