import { storage } from '../firebase'
import HTMLReactParser from 'html-react-parser'

export const attachFiles = (id, type) => {
    if (type === 'remove') {
        return document.getElementById(id).removeEventListener('change', () => null)
    } else if (type === 'add') {
        document.getElementById(id).addEventListener('change', (event) => {
            const file = event.target.files
            let blob = new Blob(file, {type: 'image/jpeg'})

            const S ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            const N = 16
            const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length])

            const uploadRef = storage.ref('images').child(fileName)
            const uploadTask = uploadRef.put(blob)
            uploadTask.on('state_change', (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`アップロードは${progress}%完了しました。`)
            }, (error) => {
                console.error('ファイルのアップロードに失敗しました。:', error)
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('利用可能なファイル', downloadURL)
                    document.getElementById(`${id}-thumb`).setAttribute('src', downloadURL)
                })
            })
        })
    }
}

/**
 * キャリッジリターンとラインフィードを<br>タグに変換する
 * @param  {string} dt
 * @returns {void | string |never} フォーマットされたテキスト
 */
export const returnCodeToBr = (text) => {
    if (text === "") {
        return text
    } else {
        return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
    }
}

/**
 * 日時を文字列に変更します。
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const dateToString = (dt) => {
    return dt.getFullYear() + '-'
    + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
    + ('00' + dt.getDate()).slice(-2)
}

/**
 * 日時を文字列に変更します。
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const datetimeToString = (dt) => {
    return dt.getFullYear() + '-'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
        + ('00' + dt.getDate()).slice(-2) + ' '
        + ('00' + dt.getHours()).slice(-2) + ':'
        + ('00' + dt.getMinutes()).slice(-2) + ':'
        + ('00' + dt.getSeconds()).slice(-2)
};

/**
 * メールのバリデーション
 * @param email
 * @returns {boolean}
 */
export const isValidEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}

/**
 * 必要な入力が空白の場合にアラートを表示します
 * @param args Required input values
 * @returns {boolean}
 */
export const isValidRequiredInput = (...args) => {
    let validator = true
    for (let i = 0; i < args.length; i++) {
        if (args[i] === "") {
            validator = false
        }
        return validator
    }
}