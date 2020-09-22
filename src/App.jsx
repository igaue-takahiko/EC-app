import React from 'react'

import  Router from './Router'
import { Header } from './components/Header'
import { Footer, Loading, ScrollToTop } from './components/UIkit'

const App = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main className="c-main">
                <Router />
            </main>
            <Footer />
        </>
    )
}

export default App

