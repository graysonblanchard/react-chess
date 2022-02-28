import React, { useEffect, useState } from "react";
import "./App.css";
import { gameSubject, initGame, resetGame } from "./Game";
import Board from "./Board";

function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turn, setTurn] = useState();

  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
      setTurn(game.turn);
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);
  return (
    <div className="container">
      <h1>Chess</h1>
      {isGameOver && <h2 className="result-text game-over">GAME OVER</h2>}
      <div className="board-container">
        <Board board={board} turn={turn} />
      </div>
      <button onClick={resetGame}>
        <span>RESET GAME</span>
      </button>
      {result && <p className="result-text result">{result}</p>}
    </div>
  );
}

export default App;
