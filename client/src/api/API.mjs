const SERVER_URL = "http://localhost:3001/api";

function handleErrors(response) {
  let errorMessage = "";

  if (response.error) errorMessage += `${response.error}`;
  if (response.message) errorMessage += `${response.message}`;
  if (response.statusText) errorMessage += `${response.statusText}`;
  if (response.errors && Array.isArray(response.errors)) {
    const errorDetails = response.errors
      .map((err) => `${err.msg} (Field: ${err.path}, Value: ${err.value})`)
      .join(",");
    errorMessage += ` | Errors: ${errorDetails}`;
  }

  throw Error(errorMessage || "Something went wrong");
}

/** --------------------------- Access APIs --------------------------------- */

async function login(email, password) {
  const response = await fetch(`${SERVER_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  // return response.json();
  // TODO: rimetterlo
  if (response.ok) return response.json();

  handleErrors(await response.json());
}



async function logout() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "DELETE",
    credentials: "include",
  });

  if (response.ok) return response;

  handleErrors(await response.json());
}

async function getUserInfo() {
  const response = await fetch(`${SERVER_URL}/sessions/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

/** ---------------------------- Game APIs ---------------------------------- */

async function placeBet(numbers) {
  const response = await fetch(`${SERVER_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ numbers }),
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());

}




async function getLatestDrawnNumbers() {
  const response = await fetch(`${SERVER_URL}/games/latest`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}




async function getLeaderboard() {
  const response = await fetch(`${SERVER_URL}/games/leaderboard`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}

async function getTotalScore() {
  const response = await fetch(`${SERVER_URL}/sessions/current/score`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (response.ok) return response.json();

  handleErrors(await response.json());
}






const API = {
  login,
  logout,
  getUserInfo,
  placeBet,
  getLatestDrawnNumbers,
  getLeaderboard,
  getTotalScore,
};

export default API;
