import { signInAction, signOutAction } from './actions'
import { push } from 'connected-react-router'
import { db, FirebaseTimestamp, auth } from '../../firebase'
import { isValidRequiredInput } from '../../function/common'

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                db.collection('users').doc(uid).get()
                .then(snapshot => {
                    const data = snapshot.data()

                    dispatch(signInAction({
                        isSignedIn: true,
                        role: data.role,
                        uid: uid,
                        username: data.username,
                    }))
                    dispatch(push('/'))
                })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        if (!isValidRequiredInput(email, password)) {
            alert("必須項目が未入力です。")
            return false
        }

        return auth.signInWithEmailAndPassword(email, password)
                .then(result => {
                    const user = result.user

                    if (user) {
                        const uid = user.uid

                        db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username,
                            }))
                            dispatch(push('/'))
                        })
                    }
                })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (email === "") {
            alert("必須項目が未入力です。")
            return false
        } else {
            auth.sendPasswordResetEmail(email).then(() => {
                alert('入力されたアドレスにパスワードリセットを送信しました。')
                dispatch(push('/signin'))
            }).catch(() => {
                alert('パスワードリセットに失敗しました。通信環境がいい所で行って下さい。')
            })
        }
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        if (!isValidRequiredInput(email, password, confirmPassword)) {
            alert("必須項目が未入力です。")
            return false
        }

        if (password !== confirmPassword) {
            alert("パスワードが一致しません。もう一度お試し下さい。")
            return false
        }

        if (password.length < 6) {
            alert("パスワードは６文字以上で入力して下さい。")
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        create_at: timestamp,
                        email: email,
                        role: "customer",
                        idi: uid,
                        update_at: timestamp,
                        username: username,
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'))
                        })
                }
            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut().then(() => {
            dispatch(signOutAction())
            dispatch(push('/signin'))
        })
    }
}