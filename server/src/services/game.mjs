import GameDAO from "../dao/game.mjs";
function GameLoop() {
    console.log("--------------------");
    CheckWinners();
    CreateGame(DrawNumbers());
    console.log("--------------------");
}


function CheckWinners() {
    let game = GameDAO.getLatestGame();
    console.log("Checking winners for game: ", game.timestamp, game.numbers);
    let games_user = GameDAO.getGamesByDate(game.timestamp);
    console.log("Games played by users: ", games_user);
    for (let i = 0; i < games_user.length; i++) {
        let game_user = games_user[i];
        let hits = 0;
        for (let j = 0; j < game_user.numbers.length; j++) {
            if (game.numbers.includes(game_user.numbers[j])) {
                hits++;
            }
        }
        if (hits > 0) {
            console.log(`User ${game_user.id} has ${hits} hits!`);
        }
    }


}
function DrawNumbers() {
    // draw 5 unique numbers between 1 and 90
    let min_number = 1;
    let max_number = 90;
    let drawnNumbers = [];
    while (drawnNumbers.length < 5) {
        let number = Math.floor(Math.random() * max_number) + min_number;
        if (!drawnNumbers.includes(number)) {
            drawnNumbers.push(number);
        }
    }
    console.log("Drawn numbers: ", drawnNumbers);
    return drawnNumbers;
}
function CreateGame(numbers) {
    GameDAO.createGame(numbers);
}
export { GameLoop };