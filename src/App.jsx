import React from 'react'

import  Router from './Router'
import { Header } from './components/Header'
import { Footer, Loading, ScrollToTop } from './components/UIkit'

const App = () => {
    return (
        <Loading>
            <ScrollToTop />
            <Header />
            <main className="c-main">
                <Router />
            </main>
            <Footer />
        </Loading>
    )
}

export default App

