import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit'
import { saveProduct } from '../reducks/products/operations'

const ProductEdit = () => {
    const dispatch = useDispatch()
    // let id = window.location.pathname.split('/product/edit')[1]
    // if (id !== "") {
    //     id = id.split('/')[1]
    // }

    const [ name, setName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ gender, setGender ] = useState("")
    const [ price, setPrice ] = useState("")

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName])

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    },[setPrice])

    const categories = [
        { id: "tops", name: "トップス" },
        { id: "shirts", name: "シャツ" },
        { id: "pants", name: "パンツ" },
    ]

    const genders = [
        { id: "all", name: "全て" },
        { id: "male", name: "メンズ" },
        { id: "female", name: "レディース" },
    ]

    return (
        <section>
            <h2 className="u-text-center u-text__headline">商品登録、編集</h2>
            <div className="c-section-container">
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    rows={1} value={name} type={"text"} onChange={inputName}
                />
                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    rows={5} value={description} type={"text"} onChange={inputDescription}
                />
                <SelectBox
                    label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
                />
                <SelectBox
                    label={"性別"} required={true} options={genders} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    rows={1} value={price} type={"number"} onChange={inputPrice}
                />
                <div className="module-spacer--medium" />
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductEdit
