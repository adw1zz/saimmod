import React, { useEffect, useState } from "react";
import "../styles/estimation.scss"
import { useDispatch, useSelector } from "react-redux";
import Algorithm from "../services/algorithm";

const Estimation = () => {
    const dispatch = useDispatch();
    const xArray = useSelector(state => state.generator.generatedArray);
    const [estValues, setEstValues] = useState({ estM: 1, estD: 1, estDv: 1, fisrt: 1, second: 1 })

    const getEstimation = async (array) => {
        const res = await Algorithm.estimation(array);
        const res2 = await Algorithm.inderectSigns(array);
        await Algorithm.periodAndAperiodicLength(array);
        dispatch({ type: "SET_ESTIMATION", payload: { ...res } })
        setEstValues({
            estM: res.estimationOfMathExpectation,
            estD: res.estimationOfDispersion,
            estDv: res.estimationOfDeviation,
            fisrt: res2.first,
            second: res2.second
        });
    }

    useEffect(() => {
        getEstimation(xArray);
    }, [xArray])

    return (
        <div className="estimation-container">
            <div>
                <div>{String(estValues.estM)}</div>
                <label>Math Expectation</label>
            </div>
            <div>
                <div>{String(estValues.estD)}</div>
                <label>Dispersion</label>
            </div>
            <div>
                <div>{String(estValues.estDv)}</div>
                <label>Deviation</label>
            </div>
            <div>
                <div>{String(estValues.fisrt)}</div>
                <label>PI/4</label>
            </div>
            <div>
                <div>{String(estValues.second)}</div>
                <label>2*K/PI</label>
            </div>
        </div>
    )
}

export default Estimation;
