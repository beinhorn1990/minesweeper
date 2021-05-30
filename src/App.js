import "./App.css";
import { useState } from "react";

function App() {
  const [game, setGame] = useState({ board: [] });

  async function newEasyGameClick() {
    const response = await fetch(
      "https://minesweeper-api.herokuapp.com/games?difficulty=0",
      {
        method: "POST",
      }
    );

    const gameReponse = await response.json();
    setGame(gameReponse);
  }

  async function clickLeftie(x, y) {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${game.id}/check?row=${y}&col=${x}`,
      { method: "POST" }
    );
    const gameReponse = await response.json();
    setGame(gameReponse);
  }

  async function clickRightie(x, y) {
    const response = await fetch(
      `https://minesweeper-api.herokuapp.com/games/${game.id}/flag?row=${y}&col=${x}`,
      { method: "POST" }
    );
    const gameReponse = await response.json();
    setGame(gameReponse);
  }

  return (
    <>
      <h1>Minesweeper</h1>
      <button onClick={newEasyGameClick}>New Easy Game</button>
      <button>New Medium Game</button>
      <button>New Hard Game </button>
      <div className="game">
        {game.board.map((row, y) => (
          <div key={y} className="row">
            {row.map((col, x) => (
              <div
                onClick={() => clickLeftie(x, y)}
                key={x}
                className="column"
                onContextMenu={(e) => {
                  e.preventDefault();
                  clickRightie(x, y);
                }}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
      {game.state === "lost" && <h2>Sorry, try again</h2>}
      {game.state === "won" && <h2>Hey, you won and are really smart</h2>}
    </>
  );
}

export default App;

