import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ScrollToTop = () => {
    const selector = useSelector(state => state)
    const pathname = selector.router.location.pathname
    const search = selector.router.location.search

    useEffect(() => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            })
        } catch (error) {
            window.scrollTo(0, 0)
        }
    },[pathname,search])
    return null
}

export default ScrollToTop
