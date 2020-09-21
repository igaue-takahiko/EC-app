import React from 'react'

import  Router from './Router'
import { Header } from './components/Header'
import { Footer, ScrollToTop } from './components/UIkit'

const App = () => {
    return (
        <div>
            <ScrollToTop />
            <Header />
            <main className="c-main">
                <Router />
            </main>
            <Footer />
        </div>
    )
}

export default App

