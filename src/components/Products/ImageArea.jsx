/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react'
// import { useDispatch } from 'react-redux'
import  IconButton from "@material-ui/core/IconButton"
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import { makeStyles } from '@material-ui/core'
import { storage } from '../../firebase'
import ImagePreview from './ImagePreview'

const useStyles = makeStyles({
    icon: {
        marginRight: 8,
        height: 48,
        width: 48
    }
})

const ImageArea = (props) => {
    const classes = useStyles()
    // const dispatch = useDispatch()
    const images = props.images

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？')
        if (!ret) {
            return false
        }else {
            const newImages = props.images.filter(image => image.id !== id)
            props.setImages(newImages)
            return storage.ref('images').child(id).delete()
        }
    },[props.images])

    const uploadImage = useCallback((event) => {
        // dispatch()
        const file = event.target.files
        let blob = new Blob(file, { type: "image/jpeg" })

        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName)
        const uploadTask = uploadRef.put(blob)

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = { id: fileName, path: downloadURL }
                props.setImages((prevState) => [...prevState, newImage])
            })
        }).catch(() => {
            // dispatch()
        })
    },[props.setImages])

    return (
        <div>
            <div className="p-grid__list-images">
                {images.length > 0 && (
                    images.map(image => <ImagePreview id ={image.id} key={image.id} path={image.path} delete={deleteImage} />)
                )}
            </div>
            <div className="u-text-right">
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input
                            className="u-display-none" type="file" id="image"
                            onChange={e => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea
