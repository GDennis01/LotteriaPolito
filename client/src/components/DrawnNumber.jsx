import { useContext, useEffect, useState } from "react";
import API from "../api/API.mjs";
import PointsContext from "./contexts/PointsContext";

const DrawnNumbers = ({ setPoints }) => {
    let [numbers, setNumbers] = useState([]);
    let points = useContext(PointsContext);
    useEffect(() => {
        const fetchData = async () => {
            let _numbers = await API.getLatestDrawnNumbers();
            let _points = await API.getTotalScore();
            setNumbers(_numbers);
            setPoints(_points);
            console.log(numbers);
            console.log(points);
        };
        const checkForUpdates = async () => {
            setInterval(fetchData, 10000);
        };
        fetchData();
        checkForUpdates();
    }, []);
    return (
        <div>
            <h2>Latest Drawn Numbers</h2>
            <ul>
                <li>{numbers[0]}</li>
                <li>{numbers[1]}</li>
                <li>{numbers[2]}</li>
                <li>{numbers[3]}</li>
                <li>{numbers[4]}</li>
            </ul>
        </div>
    );
};

export default DrawnNumbers;