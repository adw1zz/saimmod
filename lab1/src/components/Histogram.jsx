import React, { useEffect, useState } from "react";
import "../styles/histogram.scss";
import { useSelector } from "react-redux";
import Algorithm from "../services/algorithm";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const Histogram = () => {

    const xArray = useSelector(store => store.generator.generatedArray);
    const [data, setData] = useState([]);

    const parseData = (array) => {
        const res = [];
        for (let i = 1; i <= 20; i++) {
            const str = `m${i}`;
            res.push({
                range: str,
                Xnum: array[i - 1]
            })
        }
        console.log(res);
        setData(res);
    }

    const getRanges = async (xArray) => {
        const res = await Algorithm.histogram(xArray);
        console.log(res);
        parseData(res);
    }

    useEffect(() => {
        getRanges(xArray);
    }, [xArray])

    return (
        <div className="histogram-container">
            <BarChart width={1000} height={500} data={data}>
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Xnum" fill="#8884d8" />
            </BarChart>
        </div>
    )
}

export default Histogram;