import React, { useState } from "react";
import "../styles/input.scss";
import Algorithm from "../services/algorithm";
import { useDispatch } from "react-redux";

const Input = () => {

    const [values, setValue] = useState({ a: 125566, m: 276128, n: 200000, Rinp: 1 });

    const dispatch = useDispatch();

    const inputHandle = (e) => {
        const { name, value } = e.target;
        setValue({ ...values, [name]: value });
    }

    const buttonHandle = async (e) => {
        e.stopPropagation();
        dispatch({ type: 'SET_INPUT_DATA', payload: { ...values } })
        const res = await Algorithm.generator(values.a, values.n, values.m, values.Rinp)
        console.log("--Generated X array--");
        console.log(res);
        dispatch({ type: "SET_GENERATED_ARRAY", payload: res })
    }

    return (
        <div className="input-container">
            <div>
                <input placeholder="a value" type="number" name="a" value={values.a} onChange={inputHandle} />
                <label>a value</label>
            </div>
            <div>
                <input placeholder="m value" type="number" name="m" value={values.m} onChange={inputHandle} />
                <label>m value</label>
            </div>
            <div>
                <input placeholder="n value" type="number" name="n" value={values.n} onChange={inputHandle} />
                <label>n value</label>
            </div>
            <div>
                <input type="number" name="Rinp" value={values.Rinp} onChange={inputHandle} />
                <label>R0 value</label>
            </div>
            <div>
                <button onClick={buttonHandle}>Submit</button>
            </div>
        </div>
    )
}

export default Input;