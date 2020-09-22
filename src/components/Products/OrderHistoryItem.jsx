import React from 'react'
import { Divider } from '@material-ui/core'

import { datetimeToString, dateToString } from '../../function/common'
import { TextDetail } from '../UIkit'
import OrderedProducts from './OrderedProducts'

const OrderHistoryItem = (props) => {
    const orderedDatetime = datetimeToString(props.order.updated_at.toDate())
    const shippingDate = dateToString(props.order.shipping_date.toDate())
    const totalPrice = '¥' + props.order.amount.toLocaleString()
    const products = props.order.products

    return (
        <div>
            <div className="module-spacer--small" />
            <TextDetail label={"注文ID"} value={props.order.id} />
            <TextDetail label={"注文日時"} value={orderedDatetime} />
            <TextDetail label={"発注予定日"} value={shippingDate} />
            <TextDetail label={"注文金額"} value={totalPrice} />
            {Object.keys(products).length > 0 && (
                <OrderedProducts products={products} />
            )}
            <div className="module-spacer--extra-small" />
            <Divider />
        </div>
    )
}

export default OrderHistoryItem
