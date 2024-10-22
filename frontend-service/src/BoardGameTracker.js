// src/BoardGameTracker.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = "http://127.0.0.1:7071/api"; // Update with your backend API endpoint

const BoardGameTracker = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ name: "", publisher: "", releaseYear: null, playerCount: null });
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ type: "danger", message: null, show: false });

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    try {
      const response = await axios.get(`${API}/games`);
      setGames(response.data);
    } catch (error) {
      showToast(`Get failed: ${error.message}`, "danger");
    }
  };

  const createGame = async () => {
    try {
      const response = await axios.post(`${API}/games`, newGame);
      setGames([...games, response.data]);
      showToast("Game added", "success");
    } catch (error) {
      showToast(`Create failed: ${error.message}`, "danger");
    } finally {
      setShowModal(false);
    }
  };

  const updateGame = async (index) => {
    try {
      await axios.put(`${API}/games`, games[index]);
      showToast("Game updated", "success");
    } catch (error) {
      showToast(`Update failed: ${error.message}`, "danger");
    }
  };

  const deleteGame = async (id, index) => {
    try {
      await axios.delete(`${API}/games/${id}`);
      const updatedGames = games.filter((_, i) => i !== index);
      setGames(updatedGames);
      showToast("Game deleted", "success");
    } catch (error) {
      showToast(`Delete failed: ${error.message}`, "danger");
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 3000);
  };

  return (
    <div>
      <header>
        <h1 className="title">Board Game Tracker</h1>
      </header>
      <button className="button is-info" onClick={() => setShowModal(true)}>
        + Add Board Game
      </button>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Publisher</th>
            <th>Release Year</th>
            <th>Player Count</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={game.id}>
              <td>
                <input
                  className="input"
                  type="text"
                  value={game.name}
                  onChange={(e) => {
                    const updatedGames = [...games];
                    updatedGames[index].name = e.target.value;
                    setGames(updatedGames);
                  }}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={game.publisher}
                  onChange={(e) => {
                    const updatedGames = [...games];
                    updatedGames[index].publisher = e.target.value;
                    setGames(updatedGames);
                  }}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="number"
                  value={game.releaseYear}
                  onChange={(e) => {
                    const updatedGames = [...games];
                    updatedGames[index].releaseYear = e.target.value;
                    setGames(updatedGames);
                  }}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="number"
                  value={game.playerCount}
                  onChange={(e) => {
                    const updatedGames = [...games];
                    updatedGames[index].playerCount = e.target.value;
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
                <button className="delete" onClick={() => deleteGame(game.id, index)}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {games.length < 1 && <h2 className="has-text-centered">Loading...</h2>}
      {toast.show && <div className={`notification is-${toast.type}`}>{toast.message}</div>}
      
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowModal(false)}></div>
          <div className="modal-content">
            <div className="box">
              <h3 className="title">Add Board Game</h3>
              <div className="field">
                <input
                  className="input"
                  type="text"
                  placeholder="Board Game Name"
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="text"
                  placeholder="Publisher"
                  value={newGame.publisher}
                  onChange={(e) => setNewGame({ ...newGame, publisher: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="number"
                  placeholder="Release Year"
                  value={newGame.releaseYear}
                  onChange={(e) => setNewGame({ ...newGame, releaseYear: e.target.value })}
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  type="number"
                  placeholder="Player Count"
                  value={newGame.playerCount}
                  onChange={(e) => setNewGame({ ...newGame, playerCount: e.target.value })}
                />
              </div>
              <button className="button is-info" onClick={createGame}>
                Add Game
              </button>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setShowModal(false)}></button>
        </div>
      )}
    </div>
  );
};

export default BoardGameTracker;
