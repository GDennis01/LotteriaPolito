import express from "express";
import { body } from "express-validator";
import UserDAO from "../dao/user.mjs";
import ErrorHandler from "../errors/ErrorHandler.mjs";

/**
 * Class representing the authentication routes
 */
class AuthRoutes {
  constructor(authenticator) {
    this.authenticator = authenticator;
    this.errorHandler = new ErrorHandler();
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
     * Authenticates the user
     * @route POST /api/sessions
     * @body {string} email - User email
     * @body {string} password - User password
     * @returns {Object} 201 - User object
     */
    this.router.post(
      "/",
      body("email").trim().isEmail(),
      body("password").isString().notEmpty({ ignore_whitespace: true }),
      this.errorHandler.validate,
      this.authenticator.login,
    );

    /**
     * Logs out the user
     * @route DELETE /api/sessions/current
     */
    this.router.delete("/current", this.authenticator.logout);

    /**
     * Fetches the current logged-in user
     * @route GET /api/sessions/current
     * @returns {Object} 200 - User object
     */
    this.router.get(
      "/current",
      this.authenticator.isLoggedIn,
      (req, res) => res.json(req.user),
    );

    /**
     * Fetches the total score of the user
     * @route GET /api/sessions/current/score
     * @returns {Object} 200 - User object with total score
     */
    this.router.get(
      "/current/score",
      this.authenticator.isLoggedIn,
      (req, res) => {
        console.log(req.user);
        res.json(req.user.points);
      },
    );
  }


}

export default AuthRoutes;
