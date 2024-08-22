const Rules = () => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Numbers in the bet</th>
                        <th>Correct numbers</th>
                        <th>Gain</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>10 points</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                        <td>10 points</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>2</td>
                        <td>20 points</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>1</td>
                        <td>10 points</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>2</td>
                        <td>20 points</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>3</td>
                        <td>30 points</td>
                    </tr>
                    <tr>
                        <td>1, 2 or 3</td>
                        <td>0</td>
                        <td>0 points</td>
                    </tr>
                </tbody>
            </table>
        </>
    )

}
export default Rules;