import express from "express";
import { body, query } from "express-validator";
import GameDao from "../dao/game.mjs";
import ErrorHandler from "../errors/ErrorHandler.mjs";
import UserDAO from "../dao/user.mjs";

/**
 * Class representing the game routes
 */
class GameRoutes {
  constructor(authenticator) {
    this.errorHandler = new ErrorHandler();
    this.authenticator = authenticator;
    this.router = express.Router();
    this.initRoutes();
  }

  /**
   * @returns {express.Router} The router
   */
  getRouter() {
    return this.router;
  }

  /**
   * Initialize the routes
   */
  initRoutes() {
    /**
     * Fetches all games for a user, ordered by date ascending
     * @route GET /api/games?limit={limit}&offset={offset}
     * @returns {Array.<Object>} 200 - Array of games
     */
    this.router.get(
      "/",
      this.authenticator.isLoggedIn,
      query("limit").optional({ values: "falsy" }).isInt(),
      query("offset").optional({ values: "null" }).isInt({ min: 0 }),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const games = GameDao.getGames(
            req.user.id,
            req.query.limit || null,
            req.query.offset || null,
          );
          res.json(games);
        } catch (err) {
          next(err);
        }
      },
    );

    /**
     * Records a new bet or updates the existing one
     * @route POST /api/games
     * @body {numbers} - Array of numbers
     * @returns {Object} 200 - Game object
     */
    this.router.post(
      "/",
      this.authenticator.isLoggedIn,
      body("numbers").isArray().isLength({ gt: 0, lt: 4 }),
      this.errorHandler.validate,
      (req, res, next) => {
        try {
          const game = GameDao.recordGame(req.user.id, req.body.numbers);
          res.status(201).json(game);
        } catch (err) {
          next(err);
        }
      },
    );


    /**
     * Get the latest drawn numbers
     * @route GET /api/games/latest
     */
    this.router.get(
      "/latest",
      this.authenticator.isLoggedIn,
      (req, res, next) => {
        try {
          const drawnNumbers = GameDao.getLatestCompletedGame().numbers;
          res.json(drawnNumbers);
        } catch (err) {
          next(err);
        }
      },
    );

    /**
     * Get the top three users with the highest total score
     * @route GET /api/games/leaderboard
     */
    this.router.get(
      "/leaderboard",
      this.authenticator.isLoggedIn,
      (req, res, next) => {
        try {
          const leaderboard = GameDao.getLeaderboard();
          res.json(leaderboard);
        } catch (err) {
          next(err);
        }
      },
    );


  }
}

export default GameRoutes;
