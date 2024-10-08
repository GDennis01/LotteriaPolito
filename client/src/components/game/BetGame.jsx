import { Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { useEffect } from "react";
import API from "../../api/API.mjs";
import DrawnNumbers from "./DrawnNumber";
import LoggedInContext from "../contexts/LoggedInContext";
import PointsContext from "../contexts/PointsContext";
const BetGame = ({ setPoints, navigate }) => {
    const isLoggedIn = useContext(LoggedInContext);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const points = useContext(PointsContext);

    let numbers = Array(9).fill(null).map(() => Array(10).fill(null));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            numbers[i][j] = (i * 10 + j + 1).toString().padStart(2, "0");
        }
    }
    const selectNumber = (num) => {
        if (selectedNumbers.includes(num)) {
            setSelectedNumbers(oldSelectedNumbers => { return oldSelectedNumbers.filter(n => n !== num) });
        } else if (selectedNumbers.length < 3) {
            setSelectedNumbers(oldSelectedNumbers => { return oldSelectedNumbers.concat(num) });
        }
    };

    const makeBet = async () => {
        console.log(selectedNumbers);
        try {
            // navigate("/");
            if (!isLoggedIn) {
                console.log("User is not logged in");
                navigate("/");
                return;
            }
            let bet = [];
            for (let i = 0; i < 3; i++) {
                bet[i] = selectedNumbers[i] || null;
            }
            if (isLoggedIn) await API.placeBet(bet);

        } catch (error) {
            // setError(error);
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(selectedNumbers);

        setIsSubmitDisabled(selectedNumbers.length === 0);
    }, [selectedNumbers]);
    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const points = await API.getTotalScore();

                console.log(points);
                setPoints(points);
                console.log(points);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserPoints();
    }, []);
    return (
        <div>
            <DrawnNumbers setPoints={setPoints} />
            <table>
                <tbody>
                    {numbers.map((row, i) => (
                        <tr key={i}>
                            {row.map((num, j) => (
                                <td key={j}>
                                    <Button
                                        variant={selectedNumbers.includes(num) ? "primary" : "secondary"}
                                        onClick={() => selectNumber(num)}
                                    >
                                        {num}
                                    </Button>
                                </td>

                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button disabled={isSubmitDisabled} onClick={makeBet}>Place your bet!</Button>
            <div>
                Your points: {points ? points : "loading..."}
            </div>
        </div>
    );
}

export default BetGame;