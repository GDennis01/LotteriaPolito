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
