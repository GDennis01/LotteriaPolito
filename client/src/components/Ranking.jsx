import { useEffect, useState } from "react";
import API from "../api/API.mjs";

const Ranking = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let _users = await API.getLeaderboard();
            setUsers(_users);
            console.log(users);
        };
        fetchData();
    }, []);
    return (
        <>
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