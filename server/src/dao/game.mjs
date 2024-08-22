import dayjs from "dayjs";
import JSON from "json5";
import db from "../db/db.mjs";

/**
 * Data access object for the Game table.
 */
class GameDAO {
  /**
   * Returns all games for a user, including corresponding rounds and memes.
   * @param {number} idUser - User ID
   * @param {number} limit - Maximum number of games to return
   * @param {number} offset - Number of games to skip
   * @returns {Object[]} Array of games, ordered by date descending
   */
  static getGames(idUser, limit, offset) {
    let sql = `
      SELECT
          Game.id,
          Game.idUser,
          Game.date,
          JSON_GROUP_ARRAY(
              JSON_OBJECT(
                  'id',        Round.id,
                  'idMeme',    Round.idMeme,
                  'tag',       Meme.tag,
                  'idCaption', Round.idCaption,
                  'caption',   Caption.caption,
                  'score',     Round.score
              )
          ) AS rounds
      FROM
          Game
          JOIN Round ON Game.id = Round.idGame
          LEFT JOIN Meme ON Round.idMeme = Meme.id
          LEFT JOIN Caption ON Round.idCaption = Caption.id
      WHERE
          Game.idUser = ?
      GROUP BY
          Game.id
      ORDER BY
          Game.date DESC`;

    if (limit) sql += ` LIMIT ${limit}`;
    if (offset) sql += ` OFFSET ${offset}`;

    const rows = db.prepare(sql).all(idUser);

    return rows.map((row) => ({
      id: row.id,
      idUser: row.idUser,
      date: row.date,
      rounds: JSON.parse(row.rounds),
    }));
  }

  static getLatestGame() {
    let sql = `
      SELECT max(timestamp) as date from Game`;

    const row = db.prepare(sql).get();

    return {
      game: row.date,
    }
  }

  /**
   * Records a new game with its corresponding rounds.
   * @param {number} user_id - User ID
   * @param {Array} numbers - Array of rounds
   * @returns {number[]} Game ID of the newly recorded game
   */
  static recordGame(user_id, numbers) {
    let latest_game = this.getLatestGame();
    const insertGame = db.prepare(
      "INSERT INTO user_game (timestamp, id,number1,number2,number3) VALUES (?, ?,?,?,?)",
    );

    let idGame;
    db.transaction(() => {
      insertGame.run(latest_game, user_id, numbers[0], numbers[1], numbers[2]);
    })();

    return idGame;
  }
}

export default GameDAO;
