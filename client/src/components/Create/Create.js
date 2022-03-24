import { useState } from 'react';

import './Create.css';

import Animals from '../CategoryModels/Animals'
import Cars from '../CategoryModels/Cars'
import Clothes from '../CategoryModels/Clothes'

export default function Create() {

    const [value, setValue] = useState('');
    let model;

    const modelComponents = {
        cars: <Cars />,
        animals: <Animals />,
        clothings: <Clothes />,
    }

    const onChangeSelect = (e) => {
        e.preventDefault()
        setValue(e.target.value);
    }

    if (value !== "") {
        model = modelComponents[value];
    }

    return (
        <section className="create-article">
            <div className="create-article-box">
                <div className="create-art-text">
                    <h1 className="art-title">Create Article</h1>
                    <p className="create-art-untertitle">Please fill in this form to create an article.</p>
                </div>
                <form>
                    <label htmlFor="category">Choose a category:</label>
                    <select name="category" id="category" onChange={onChangeSelect}>
                        <option value=""></option>
                        <option value="cars">Cars</option>
                        <option value="animals">Animals</option>
                        <option value="clothings">Clothing</option>
                    </select>
                </form>
                {model}
            </div>
        </section>
    )
}
