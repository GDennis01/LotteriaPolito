import { useEffect, useState } from "react";
import API from "../api/API.mjs";

const DrawnNumbers = () => {
    let [numbers, setNumbers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let _numbers = await API.getLatestDrawnNumbers();
            setNumbers(_numbers);
            console.log(numbers);
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