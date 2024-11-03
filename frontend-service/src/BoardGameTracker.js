// BoardGameTracker.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BoardGameTracker.css"; // Create a separate CSS file for custom styles if needed


const BoardGameTracker = () => {
  const [games, setGames] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);

  const [newGame, setNewGame] = useState({
    gameId: "",
    genre: "",
    playtime: "",
    players: "",
  });

  const [newUser, setNewUser ] = useState({
    username: "",
    email: "",
  });


  const [newSession, setNewSession] = useState({
    gameId: '',
    players: '',
    date: '',
    userId: ''
  });

  const [showGameModal, setShowGameModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "info", show: false });

  const EXTERNAL_URL=   process.env.REACT_APP_EXTERNAL_URL || "http://135.233.104.22"



  const gamesAPI = `${EXTERNAL_URL}/api/games`;
  const sessionAPI =  `${EXTERNAL_URL}/api/sessions`;
  const userAPI = `${EXTERNAL_URL}/api/users`;


  useEffect(() => {
    fetchGames();
    fetchSessions();
    fetchUsers();
  },[]);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${gamesAPI}/`);
      setGames(response.data);
    } catch (error) {
      showToast("Failed to fetch games.", "danger");
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${sessionAPI}/`);
      setSessions(response.data);
    } catch (error) {
      showToast("Failed to fetch sessions.", "danger");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${userAPI}/`);
      setUsers(response.data);
    } catch (error) {
      showToast("Failed to fetch users.", "danger");
    }
  };

  const createGame = async () => {
    try {
      const response = await axios.post(`${gamesAPI}/`, newGame);
      setGames([...games, response.data]);
      showToast("Game added successfully!", "success");
      setNewGame({ gameId: "", genre: "", playtime: "", players: "" });
      setShowGameModal(false);
    } catch (error) {
      showToast("Failed to add game.", "danger");
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post(`${userAPI}/register`, newUser);
      setUsers([...users, response.data]);
      showToast("User added successfully!", "success");
      setNewGame({ email: "", username: "" });
      setShowUserModal(false);
    } catch (error) {
      showToast("Failed to add user.", "danger");
    }
  };

  const createSession = async () => {
    try {
      const response = await axios.post(`${sessionAPI}/`, {
        gameId: newSession.gameId,
        players: newSession.players.split(','),
        date: newSession.date,
        userId: newSession.userId
      });
      setNewSession([...sessions, response.data]);
      showToast("Session added successfully!", "success");
      setShowSessionModal(false);
    } catch (error) {
      showToast("Failed to add Session.", "danger");
    }
  };

  const updateGame = async (index) => {
    try {
      await axios.put(`${gamesAPI}/${games[index].gameId}`,games[index] );
      showToast("Game updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update game.", "danger");
    }
  };

  const updateSession = async (index) => {
    try {
      await axios.put(`${sessionAPI}/${sessions[index]._id}`,sessions[index] );
      showToast("Session updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update session.", "danger");
    }
  };

  const updateUser = async (index) => {
    try {
      await axios.put(`${userAPI}/${users[index]._id}`,users[index] );
      showToast("User updated successfully!", "success");
    } catch (error) {
      showToast("Failed  to update user.", "danger");
    }
  };


  const deleteGame = async (id, index) => {
    try {
      await axios.delete(`${gamesAPI}/${id}`);
      setGames(games.filter((_, i) => i !== index));
      showToast("Game deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete game.", "danger");
    }
  };

  const deleteUser = async (id, index) => {
    try {
      await axios.delete(`${userAPI}/${id}`);
      setUsers(users.filter((_, i) => i !== index));
      showToast("User deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete user.", "danger");
    }
  };

  const deleteSession = async (id, index) => {
    try {
      await axios.delete(`${sessionAPI}/${id}`);
      setSessions(sessions.filter((_, i) => i !== index));
      showToast("Session deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete session.", "danger");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };


  return (
    <div>
      <header className="hero is-info is-bold">
        <div className="hero-body">
          <h1 className="title">Board Game Tracker</h1>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div style= {{ display: 'flex', justifyContent:'flex-start', flexWrap:'wrap', gap: "1rem" }}>
            <button className="button is-info" onClick={() => setShowGameModal(true)}>
              + Add Board Game
            </button>
            <button className="button is-info" onClick={() => setShowSessionModal(true)}>
              + Add Session 
            </button>
            <button className="button is-info" onClick={() => setShowUserModal(true)}>
              + Add User 
            </button>
          </div>
        
          <br/>
          <br/>

          <h2 className="title">Sessions</h2>

          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>date</th>
                <th>game</th>
                <th>Players</th>
                <th></th>
                <th></th>

              </tr>
            </thead>
            <tbody>
              { Array.isArray(sessions) && sessions?.map((session, index) => (
                <tr key={session.gameId}>
                 <td>
                 <input
                      type="date"
                      value={
                        session.date && !isNaN(new Date(session.date))
                          ? new Date(session.date).toISOString().split('T')[0]
                          : ""
                      }
                      onChange={(e) => {
                        const updatedSessions = [...sessions];
                        updatedSessions[index].date = e.target.value;
                        setSessions(updatedSessions);
                      }}
                    />

                </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={session.gameId}
                      onChange={(e) => {
                        const updatedSessions = [...sessions];
                        updatedSessions[index].gameId = e.target.value;
                        setSessions(updatedSessions);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={session.players} 
                      onChange={(e) => {
                        const updatedSessions = [...sessions];
                        updatedSessions[index].players = e.target.value;
                        setSessions(updatedSessions);
                      }}
                    />
                  </td>
                  <td>
                    <button className="button" onClick={() => updateSession(index)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete is-large has-background-danger"
                      onClick={() => deleteSession(session._id, index)}
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          <h2 className="title">Games</h2>

          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>genre</th>
                <th>Release Year</th>
                <th>Player Count</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(games) && games?.map((game, index) => (
                <tr key={game.gameId}>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={game.gameId}
                      onChange={(e) => {
                        const updatedGames = [...games];
                        updatedGames[index].gameId = e.target.value;
                        setGames(updatedGames);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={game.genre}
                      onChange={(e) => {
                        const updatedGames = [...games];
                        updatedGames[index].genre = e.target.value;
                        setGames(updatedGames);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      value={game.playtime}
                      onChange={(e) => {
                        const updatedGames = [...games];
                        updatedGames[index].playtime = e.target.value;
                        setGames(updatedGames);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="number"
                      value={game.players}
                      onChange={(e) => {
                        const updatedGames = [...games];
                        updatedGames[index].players = e.target.value;
                        setGames(updatedGames);
                      }}
                    />
                  </td>
                  <td>
                    <button className="button" onClick={() => updateGame(index)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete is-large has-background-danger"
                      onClick={() => deleteGame(game.gameId, index)}
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="title">Users</h2>

          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users?.map((user, index) => (
                <tr key={user._id}>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={user.username}
                      onChange={(e) => {
                        const updatedUser = [...users];
                        updatedUser[index].username = e.target.value;
                        setUsers(updatedUser);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="input"
                      type="text"
                      value={user.email}
                      onChange={(e) => {
                        const updatedUser = [...users];
                        updatedUser[index].email = e.target.value;
                        setUsers(updatedUser);
                      }}
                    />
                  </td>
                  <td>
                    <button className="button" onClick={() => updateUser(index)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete is-large has-background-danger"
                      onClick={() => deleteUser(user._id, index)}
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {games.length < 1 && (
            <h2 className="has-text-centered is-size-4 has-text-info">Loading...</h2>
          )}

          {toast.show && (
            <div id="toast" className={`notification is-${toast.type}`}>
              {toast.message}
            </div>
          )}
        </div>
      </section>

      {showGameModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowGameModal(false)}></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="is-size-3">Add Board Game</h3>
              <div className="field">
                <input
                  className="input"
                  type="text"
                  placeholder="Board Game Name"
                  value={newGame.gameId}
                  onChange={(e) => setNewGame({ ...newGame, gameId: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="text"
                  placeholder="genre"
                  value={newGame.genre}
                  onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="number"
                  placeholder="Release Year"
                  value={newGame.playtime}
                  onChange={(e) => setNewGame({ ...newGame, playtime: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="number"
                  placeholder="Player Count"
                  value={newGame.players}
                  onChange={(e) => setNewGame({ ...newGame, players: e.target.value })}
                />
              </div>
              <button className="button is-info" onClick={createGame}>
                Add Game
              </button>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowGameModal(false)}
          ></button>
        </div>
      )}

  {showSessionModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowSessionModal(false)}></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="is-size-3">Add a Session</h3>
                <div className="field">
                  <select
                              id="gameSelect"
                              value={newSession.gameId}
                              onChange={(e) => setNewSession({ ...newSession, gameId: e.target.value })}
                              required
                          >
                              <option value="">--Select a Game--</option>
                              {games.map(game => (
                                  <option key={game.gameId} value={game.gameId}>
                                      {game.gameId}
                                  </option>
                              ))}
                  </select>
              </div>
              <div className="field">
                <input
                  className="date-input-add" 
                  type="date"
                  placeholder="select a date"
                  value={newSession.date}
                  onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  />
              </div>
              <div className="field">
              <select
                            id="userSelect" 
                            value={newSession.userId} 
                            placeholder="select the user that submits the session"
                            onChange={(e) => setNewSession({ ...newSession, userId: e.target.value })}
                            >
                           <option value="">--Select a User--</option>

                            {users.map(user => (
                                <option key={user.username} value={user._id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>

              </div>
              <div className="field">
                <input
                    className="input"
                    type="text"
                    placeholder="Write players seperated by comma"
                    value={newSession.players}
                    onChange={(e) => setNewSession({ ...newSession, players: e.target.value })}
                    />
                </div>
              <button className="button is-info" onClick={createSession}>
                Add Session
              </button>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowSessionModal(false)}
          ></button>
        </div>
      )}


{showUserModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowUserModal(false)}></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="is-size-3">Add a User</h3>
              <div className="field">
                <input
                  className="input"
                  type="text"
                  placeholder="user Name"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="text"
                  placeholder="User email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
           
              <button className="button is-info" onClick={createUser}>
                Add User
              </button>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setShowGameModal(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default BoardGameTracker;
