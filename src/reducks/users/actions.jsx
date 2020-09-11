export const SIN_IN = "SIN_IN"
export const signInAction = (userState) => {
    return {
        type: "SIN_IN",
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const SING_OUT = "SIGN_OUT"
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignOut: false,
            uid: "",
            username: "",
        }
    }
}