import React from 'react'

const ImagePreview = (props) => {
    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img alt="preview img" src={props.path} />
        </div>
    )
}

export default ImagePreview
