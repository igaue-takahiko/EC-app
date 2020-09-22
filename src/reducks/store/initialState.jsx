const initialState = {
    loading: {
        state: false,
        text: "",
    },
    products: {
        list: []
    },
    users: {
        isSignedIn: false,
        role: "",
        uid: "",
        username: "",
        cart: [],
        orders: [],
        payment_method: "",
    }
}

export default initialState