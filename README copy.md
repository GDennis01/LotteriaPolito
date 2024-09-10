# Exam #3: "Lottery Game"

## Student: s330438 Gobbi Dennis

- [Exam #3: "Lottery Game"](#exam-3-lottery-game)
	- [Student: s330438 Gobbi Dennis](#student-s330438-gobbi-dennis)
	- [React Client Application Routes](#react-client-application-routes)
	- [Main React Components](#main-react-components)
	- [API Server](#api-server)
	- [Database Tables](#database-tables)
		- [Short overview](#short-overview)
		- [Tables](#tables)
			- [user](#user)
			- [game](#game)
			- [user\_game](#user_game)
	- [Screenshots](#screenshots)
- [TODO!](#todo)
	- [Users Credentials](#users-credentials)

## React Client Application Routes

- Route `/`: home page that contains a log-in form and the rules
- Route `/play`: page where the game is played
- Route `/ranking`: page showing the ranking of the top three players with most budget/points.
- Route `/*`: sends to 404/"Page not found" page.

## Main React Components
- [`BetGame`](client/src/components/game/BetGame.jsx): component used to render the game, consisting in a clickable matrix that let's you place or update a bet
- [`CustomNavbar`](client/src/components/CustomNavbar.jsx): component used to render the navigation bar which includes the login/logout button and the home button(which redirects to `/play` if logged-in ).
- [`App`](client/src/App.jsx): main component of the application, contains the routing logic and the game component among many other sub-components(such as DrawnNumbers.jsx and Ranking.jsx)

## API Server

- POST `/api/sessions`: login
  - request body content: `{ email: string, password: string }`
  - response body content: `{ id: number, name: string, surname: string, email: string, totalScore: number }`
  - response status code: 201
  - possible errors: 401 (Unauthorized), 422 (Unprocessable Entity), 500 (Internal Server Error)
- DELETE `/api/sessions/current`: logout
  - response status code: 204
- GET `/api/sessions/current`: get current user
  - response body content: `{ id: number, name: string, surname: string, email: string, totalScore: number }`
  - response status code: 200
  - possible errors: 401 (Unauthorized), 500 (Internal Server Error)
- GET `/api/sessions/current/score`: get current user score
  - response body content: `points:number`
  - response status code: 200
  - possible errors: 401 (Unauthorized), 500 (Internal Server Error)
  
- POST `/api/games`: creates or update an already existing bet
  - request body content: `numbers:[number]`
  - response status code: 201
  - possible errors: 401 (Unauthorized), 500 (Internal Server Error)
- GET `/api/games/latest`: get the latest drawn numbers(that have yet to be shown)
  - response body content: `points:[number]`
  - response status code: 200
  - possible errors: 401 (Unauthorized), 500 (Internal Server Error)
- GET `/api/games/leaderboard`: get the top three players with most budget
  - response body content: `[{name:String,points:number}]`
  - response status code: 200
  - possible errors: 401 (Unauthorized), 500 (Internal Server Error)


## Database Tables

### Short overview

- Table `user` - contains information about the users and their budget
- Table `game` - contains information when and which number has been drawns
- Table `user_game` - contains information about the bet placed by users


### Tables

#### user

```sql
CREATE TABLE "user" (
	"email"	TEXT NOT NULL UNIQUE,
	"pw"	TEXT NOT NULL UNIQUE,
	"salt"	TEXT NOT NULL,
	"points"	INTEGER NOT NULL DEFAULT 100,
	"id"	INTEGER NOT NULL DEFAULT 0,
	"name"	TEXT NOT NULL DEFAULT 'A',
	PRIMARY KEY("id" AUTOINCREMENT)
)
```

#### game

```sql
CREATE TABLE "game" (
	"timestamp"	TEXT NOT NULL UNIQUE,
	"number1"	INTEGER NOT NULL,
	"number2"	INTEGER NOT NULL,
	"number3"	INTEGER NOT NULL,
	"number4"	INTEGER NOT NULL,
	"number5"	INTEGER NOT NULL,
	"completed"	INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("timestamp")
)
```

#### user_game

```sql
CREATE TABLE "user_game" (
	"timestamp"	TEXT,
	"id"	INTEGER,
	"number1"	INTEGER,
	"number2"	INTEGER,
	"number3"	INTEGER,
	"win"	INTEGER,
	PRIMARY KEY("timestamp","id"),
	CONSTRAINT "fkUser" FOREIGN KEY("id") REFERENCES "user"("id"),
	CONSTRAINT "fkGame" FOREIGN KEY("timestamp") REFERENCES "game"("timestamp")
)
```

## Screenshots
# TODO!
<!-- > The site has been designed to be friendly to screen color inverters (i.e. extensions like Dark Reader) so the screenshots show how the website looks both in light mode and dark mode through the extension. -->


## Users Credentials


| **Email**                  | **Password**  |
| -------------------------- | ------------- |
| s330438@studenti.polito.it | gobbi         |
| gambling@addicted.it       | casino        |
| politogaming@lottery.it    | politolottery |
