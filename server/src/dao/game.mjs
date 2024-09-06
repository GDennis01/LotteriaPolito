import dayjs from "dayjs";
import JSON from "json5";
import db from "../db/db.mjs";

const POINTS_PER_NUMBER = 5;
/**
 * Data access object for the Game table.
 */
class GameDAO {
  /**
   * Fetch the latest game recorded by the server
   * @returns {Object} Latest game object with timestamp and numbers drawn
   * - {string} timestamp - Date of the game
   * - {number[]} numbers - Array of numbers drawn
   */
  static getLatestGame() {
    let sql = "SELECT * from Game where timestamp = (SELECT max(timestamp) from Game)";
    const row = db.prepare(sql).get();
    return {
      timestamp: row.timestamp,
      numbers: [row.number1, row.number2, row.number3, row.number4, row.number5]
    }
  }

  /**
   * Fetch all games played by users in a specific date
   * @param {string} date - Date of the game
   * @returns {Array.<Object>} Array of games played by users
   * - {number} id - User ID
   * - {string} timestamp - Date of the game
   * - {number[]} numbers - Array of numbers betted
   * with the timestamp and numbers betted
  */
  static getGamesByDate(date) {
    let sql = "SELECT * from user_game where timestamp = ?";
    const rows = db.prepare(sql).all(date);
    return rows.map((row) => ({
      id: row.id,
      timestamp: row.timestamp,
      numbers: [row.number1, row.number2, row.number3]
    }));
  }

  /**
   * Check if the user has already played the latest round
   * @param {number} user_id - User ID
   * @returns {string|null} Date of the latest game played by the user if it exists, null otherwise
   */
  static getLatestGameByUser(user_id) {
    // let sql = `SELECT max(timestamp) as date from Game`;
    console.log("--------------------");
    let sql = "SELECT MAX(timestamp) as date from game";
    const date = db.prepare(sql).get().date;
    console.log("Row: ", date);
    sql = `SELECT * from user_game where timestamp = ? and id = ?`;

    const row = db.prepare(sql).get(date, user_id);
    console.log("Row: ", row);
    console.log("--------------------");
    return {
      game: date,
      hasPlayed: row != null,
    }
  }

  /**
   * Records(or update) a bet by a user with the numbers selected. It also decreases the user's points accordingly
   * @param {number} user_id - User ID
   * @param {Array} numbers - Array of numbers betted by the user
   * @returns {number[]} Game ID of the newly recorded game
   */
  static recordGame(user_id, numbers) {
    let game = this.getLatestGameByUser(user_id);
    let hasPlayed = game.hasPlayed;
    let date = game.game;

    let sql = "INSERT INTO user_game (timestamp, id,number1,number2,number3) VALUES (?, ?,?,?,?)";
    let params = [date, user_id, numbers[0], numbers[1], numbers[2]];
    if (hasPlayed) {
      sql = "UPDATE user_game SET number1 = ?, number2 = ?, number3 = ? WHERE timestamp = ? and id = ?";
      params = [numbers[0], numbers[1], numbers[2], date, user_id];
    } else {
      sql = "INSERT INTO user_game (timestamp, id,number1,number2,number3) VALUES (?, ?,?,?,?)";
    }
    // let update_points = "UPDATE user SET points = points + ? WHERE id = ?";
    // let betted_numbers = numbers.reduce((acc, num) => {
    //   if (num != null) {
    //     return acc + 1;
    //   }
    // }, 0);
    // let betted_points = betted_numbers * 5;
    try {
      db.transaction(() => {
        db.prepare(sql).run(params);
        // if (!hasPlayed)
        //   db.prepare(update_points).run(0 - parseInt(betted_points), user_id);
      })();
    } catch (e) {
      console.log(e);
    }

    return date;
  }

  /**
   * Create a new game with the numbers drawn
   * @param {number[]} numbers - Array of numbers drawn
   */
  static createGame(numbers) {
    console.log("--------------------");
    console.log("CREATING GAME WITH NUMBERS: ", numbers);
    let sql = "INSERT INTO Game(timestamp,number1,number2,number3,number4,number5) VALUES (?,?,?,?,?,?)";
    let date = dayjs().format("YYYY-MM-DD HH:mm");
    let params = [date, numbers[0], numbers[1], numbers[2], numbers[3], numbers[4]];
    db.prepare(sql).run(params);
  }

  static updatePoints(user_id, date, hits, numbers) {
    let betted_numbers = numbers.filter((num) => num != null);
    console.log("Betted numbers: ", betted_numbers);
    betted_numbers = betted_numbers.length;
    // count the number of numbers betted
    let betted_points = betted_numbers * POINTS_PER_NUMBER;
    let points = (2 * (POINTS_PER_NUMBER * betted_numbers) * (hits) / (betted_numbers)) - betted_points;
    console.log("--------------------");
    console.log("UPDATING POINTS FOR USER: ", user_id, " WITH ", points, " POINTS");
    db.transaction(() => {
      let sql = "UPDATE user SET points = points + ? WHERE id = ?";
      db.prepare(sql).run(points, user_id);
      let sql2 = "UPDATE user_game SET win = ? where id = ? and timestamp = ?";
      db.prepare(sql2).run((points > 0 ? 1 : 0), user_id, date);
    })();
    console.log("--------------------");

  }
}






export default GameDAO;
