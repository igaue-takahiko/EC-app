import React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

import { getLoadingState, getLoadingText } from '../../reducks/loading/selectors'

const Loading = ({children}) => {
    const selector = useSelector(state => state)
    const isBeingLoading = getLoadingState(selector)
    const loadingText = getLoadingText(selector)
    return (
        <div>
            {(isBeingLoading) && (
                <section className="c-section__loading">
                    <CircularProgress />
                    <p>{loadingText}</p>
                </section>
            )}
            {children}
        </div>
    )
}

export default Loading
