import React, { useEffect, useState } from "react";
import "../styles/estimation.scss"
import { useDispatch, useSelector } from "react-redux";
import Algorithm from "../services/algorithm";

const Estimation = () => {
    const dispatch = useDispatch();
    const xArray = useSelector(state => state.generator.generatedArray);
    const [estValues, setEstValues] = useState({ estM: 1, estD: 1 })

    const getEstimation = async (array) => {
        const res = await Algorithm.estimation(array);
        dispatch({ type: "SET_ESTIMATION", payload: { ...res } })
        setEstValues({ estM: res.estimationOfMathExpectation, estD: res.estimationOfVariance });
    }

    useEffect(() => {
        getEstimation(xArray);
    }, [xArray])

    return (
        <div className="estimation-container">
            <div>
                <div>{String(estValues.estM)}</div>
                <label>Estimation of MathExpectation</label>
            </div>
            <div>
                <div>{String(estValues.estD)}</div>
                <label>Estimation of variance</label>
            </div>
        </div>
    )
}

export default Estimation;
