/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import List from "@material-ui/core/List";
import { getOrdersHistory } from '../reducks/users/selectors'
import { fetchOrdersHistory } from '../reducks/users/operations'
import { OrderHistoryItem } from '../components/Products'

const useStyle = makeStyles((theme) => ({
    orderList: {
        background: theme.palette.grey["100"],
        margin: '0 auto',
        padding: 32,
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: 768
        }
    }
}))

const OrderHistory = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const orders = getOrdersHistory(selector)

    useEffect(() => {
        dispatch(fetchOrdersHistory())
    },[])

    return (
        <section className="c-section-wrapin">
            <List className={classes.orderList}>
                {orders.length > 0 && (
                    orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
                )}
            </List>
        </section>
    )
}

export default OrderHistory
