import { useEffect, useState } from "react";
import API from "../../api/API.mjs";

const Ranking = ({ navigate }) => {
    let _users = [{ name: "Loading...", points: "Loading..." }, { name: "Loading...", points: "Loading..." }, { name: "Loading...", points: "Loading..." }];
    const [users, setUsers] = useState(_users);
    useEffect(() => {
        const fetchData = async () => {
            let _users = await API.getLeaderboard();
            setUsers(_users);
        };
        const checkForUpdates = async () => {
            setInterval(fetchData, 10000);
        };
        fetchData();
        checkForUpdates();
    }, []);
    return (
        <>
            <h1>Ranking</h1>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td>1</td>
                        <td>{users[0].name}</td>
                        <td>{users[0].points}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{users[1].name}</td>
                        <td>{users[1].points}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{users[2].name}</td>
                        <td>{users[2].points}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Ranking;