// import { storage } from '../firebase'
import HTMLReactParser from 'html-react-parser'

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