import { Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/API.mjs";
const BetGame = ({ isLoggedIn }) => {

    let numbers = Array(9).fill(null).map(() => Array(10).fill(null));
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 10; j++) {
            numbers[i][j] = (i * 10 + j + 1).toString().padStart(2, "0");
        }
    }
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
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
            // make array of numbers in the form of {number1:value, number2:value, number3:value}
            // if there are less than 3 numbers, fill the rest with null
            let bet = [];
            for (let i = 0; i < 3; i++) {
                // bet[`number${i + 1}`] = selectedNumbers[i] || null;
                bet[i] = selectedNumbers[i] || null;
            }
            if (isLoggedIn) await API.placeBet(bet);

            navigate("/");
        } catch (error) {
            // setError(error);
            console.log(error);
        }
    }
    useEffect(() => {
        console.log(selectedNumbers);

        setIsSubmitDisabled(selectedNumbers.length === 0);
    }, [selectedNumbers]);
    return (
        // each number is selectable, you can select up to 3 numbers
        // if you have at least 1 number selected, the submit button becomes enabled and you can submit your bet
        <div>
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
        </div>
    );
}

export default BetGame;