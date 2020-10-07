import { hideLoadingAction, showLoadingAction } from "../loading/actions"
import { CardElement } from '@stripe/react-stripe-js';
import { db } from "../../firebase";
import { updateUserStateAction } from "../users/actions";
import { push } from "connected-react-router";

const headers = new Headers()
headers.set('Content-type', 'application/json')
const BASE_URL = 'https://ec-app-65e4e.web.app'

const createCustomer = async (email, paymentMethodId, uid, username) => {
    const response = await fetch(`${BASE_URL}/v1/customer`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            paymentMethod: paymentMethodId,
            userId: uid,
            username: username
        })
    })
    const customerResponse = await response.json()
    return JSON.parse(customerResponse.body)
}

export const registerCard = (stripe, elements, customerId) => {
    return async (dispatch, getState) => {
        const user = getState().users
        const email = user.email
        const uid = user.uid
        const username = user.username

        dispatch(showLoadingAction("登録中..."))
        //**************** start validation **************/
        if (!stripe || !elements) {
            //Stripe.jsはまだロードされていません。必ず無効にしてください
            //Stripe.jsが読み込まれるまでフォームを送信します。
            console.error('ストライプまたは要素は存在しません')
            dispatch(hideLoadingAction())
            return
        }

        //マウントされたCardInputFormへの参照を取得します。
        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
            console.error('cardElementは存在しません')
            dispatch(hideLoadingAction())
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        })

        if (error) {
            dispatch(hideLoadingAction())
            alert(error.message)
            return
        }

        const paymentMethodId = paymentMethod.id

        //Stripeで顧客を作成する
        if (customerId === "") {
            const customerData = await createCustomer(email, paymentMethod, uid, username)

            if (!customerData.id) {
                dispatch(hideLoadingAction())
                alert('お客様情報の登録に失敗しました。')
            } else {
                const updateUserState = {
                    customer_id: customerData.id,
                    payment_method_id: paymentMethodId
                }
                db.collection('users').doc(uid).update(updateUserState).then(() => {
                    dispatch(updateUserStateAction(updateUserState))
                    dispatch(hideLoadingAction())
                    alert('お客様情報を登録しました。')
                    dispatch(push('/user/mypage'))
                }).catch(async (error) => {
                    console.error(error)
                    //ストライプから顧客データを削除する
                    const deleteCustomer = await fetch(`${BASE_URL}/v1/customer`, {
                        method: 'DELETE',
                        headers: headers,
                        body: JSON.stringify({ customerId: customerData.id })
                    })
                    await deleteCustomer.json()
                    dispatch(hideLoadingAction())
                    alert('お客様情報の登録に失敗しました。')
                })
            }
        } else {
            const prevPaymentMethodId = getState().users.payment_method_id
            const updatedPaymentMethod = await updatePaymentMethod(customerId, prevPaymentMethodId, paymentMethodId)

            if (!updatedPaymentMethod) {
                dispatch(hideLoadingAction())
                alert('お客様情報に失敗しました。')
            } else {
                const updateUserState = { payment_method_id: paymentMethodId }
                db.collection('users').doc(uid).update(updateUserState).then(() => {
                    dispatch(updateUserStateAction(updateUserState))
                    dispatch(hideLoadingAction())
                    alert('お客様情報を更新しました。')
                    dispatch(push('/user/mypage'))
                }).catch(() => {
                    dispatch(hideLoadingAction())
                    alert('お客様情報の登録に失敗しました。')
                })
            }
        }
    }
}

export const retrievePaymentMethod = async (paymentMethodId) => {
    const response = await fetch(`${BASE_URL}/v1/paymentMethod`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            paymentMethodId: paymentMethodId
        })
    })
    const cardResponse = await response.json()
    const paymentMethod = JSON.parse(cardResponse.body)
    return paymentMethod.card
}

export const updatePaymentMethod = async (customerId, prevPaymentMethodId, nextPaymentMethodId) => {
    const response = await fetch(`${BASE_URL}/v1/updatePaymentMethod`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            customerId: customerId,
            prevPaymentMethodId: prevPaymentMethodId,
            nextPaymentMethodId: nextPaymentMethodId,
        })
    })
    const paymentMethodResponse = await response.json()
    const paymentMethod = JSON.parse(paymentMethodResponse.body)
    return paymentMethod.card
}