import Header from "components/Header/Header";
import Board from "components/Board/Board";
import StatsPanel from "components/StatsPanel/StatsPanel";
import styles from "./GameView.module.scss";
import { useState, useEffect } from "react";
import produce from "immer";
import PropTypes from "prop-types";

const initBoard = [null, null, null, null, null, null, null, null, null];

const GameView = ({ players, setIsDurringGame }) => {
  const [currentMark, setCurrentMark] = useState("X");
  const [board, setBoard] = useState(initBoard);
  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    ties: 0,
  });
  const [winner, setWinner] = useState(null);
  const [isCPUSelecting, setIsCPUSelecting] = useState(false);

  useEffect(() => {
    if (winner) return;
    if (players[currentMark] === "cpu") {
      setIsCPUSelecting(true);

      const indexSelectedByCpu = selectCpuMove(board);
      handleUpdateBoard(indexSelectedByCpu);
      setIsCPUSelecting(false);
    }
  }, [currentMark, winner]);

  // Constants for score values
  const SCORE_WIN = 10;
  const SCORE_DRAW = 0;
  const SCORE_LOSS = -10;

  function minimax(board, maximizingMark, minimizingMark, depth, alpha, beta) {
    const winner = checkWinner(board);
    const availableMoves = getAvailableMoves(board);

    if (winner === maximizingMark) {
      return { score: SCORE_WIN - depth };
    } else if (winner === minimizingMark) {
      return { score: SCORE_LOSS + depth };
    } else if (winner === "ties" || availableMoves.length === 0) {
      return { score: SCORE_DRAW };
    }

    let bestMove;
    if (maximizingMark !== currentMark) {
      bestMove = { score: -Infinity };
      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const newBoard = updateBoard(board, move, maximizingMark);
        const result = minimax(
          newBoard,
          maximizingMark,
          minimizingMark,
          depth + 1,
          alpha,
          beta
        );
        bestMove =
          result.score > bestMove.score
            ? { move, score: result.score }
            : bestMove;
        alpha = Math.max(alpha, bestMove.score);
        if (beta <= alpha) break;
      }
    } else {
      bestMove = { score: Infinity };
      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const newBoard = updateBoard(board, move, minimizingMark);
        const result = minimax(
          newBoard,
          maximizingMark,
          minimizingMark,
          depth + 1,
          alpha,
          beta
        );
        bestMove =
          result.score < bestMove.score
            ? { move, score: result.score }
            : bestMove;
        beta = Math.min(beta, bestMove.score);
        if (beta <= alpha) break;
      }
    }

    return bestMove;
  }

  const getAvailableMoves = (board) => {
    const filteredIndexes = board
      .map((elem, index) => (elem === null ? index : null))
      .filter((elem) => elem !== null);

    return filteredIndexes;
  };

  function selectCpuMove(board) {
    const filteredIndexes = board
      .map((elem, index) => (elem === null ? index : null))
      .filter((elem) => elem !== null);

    const { move } = minimax(
      board,
      currentMark,
      currentMark === "X" ? "O" : "X",
      0,
      -Infinity,
      Infinity
    );
    return move;
  }

  const handleUpdateBoard = (index) => {
    if (isCPUSelecting) return;
    const nextBoard = updateBoard(board, index, currentMark);
    const checkedWinner = checkWinner(nextBoard);
    // console.log("Winner : ", players[checkedWinner]);
    if (checkedWinner === "X" || checkedWinner === "O") {
      incrementScoreToPlayer(currentMark);
      setWinner(currentMark);
    } else if (checkedWinner === "ties") {
      incrementScoreToPlayer("ties");
      setWinner("ties");
    } else {
      handleSetNextMark();
    }
  };

  const handleResetBoard = () => {
    setBoard(initBoard);
    setCurrentMark("X");
  };

  const handleSetNextRound = () => {
    handleResetBoard();
    setWinner(null);
  };

  const equals3 = (a, b, c) => {
    if (a === null || b === null || c === null) return false;
    return a === b && b === c;
  };

  function checkWinner(board) {
    // Columns
    for (let i = 0; i < 3; i++) {
      if (equals3(board[i], board[i + 3], board[i + 6])) return board[i];
    }
    // Rows
    for (let i = 0; i < 9; i += 3) {
      if (equals3(board[i], board[i + 1], board[i + 2])) return board[i];
    }
    // Diagonal
    if (equals3(board[0], board[4], board[8])) return board[0];
    if (equals3(board[2], board[4], board[6])) return board[2];

    if (!board.includes(null)) {
      return "ties";
    }
    return false;
  }

  const incrementScoreToPlayer = (player) => {
    setScores({ ...scores, [player]: scores[player] + 1 });
  };

  const handleSetNextMark = () => {
    setCurrentMark(currentMark === "X" ? "O" : "X");
  };

  const updateBoard = (board, index, mark) => {
    const nextBoard = produce(board, (draftBoard) => {
      draftBoard[index] = mark;
    });
    setBoard(nextBoard);
    return nextBoard;
  };

  return (
    <section className={styles.wrapper}>
      <Header currentMark={currentMark} setIsDurringGame={setIsDurringGame} />
      <Board
        board={board}
        currentMark={currentMark}
        winner={winner}
        handleUpdateBoard={handleUpdateBoard}
        updateBoard={updateBoard}
        setIsDurringGame={setIsDurringGame}
        isCPUSelecting={isCPUSelecting}
        handleSetNextRound={handleSetNextRound}
      />
      <StatsPanel scores={scores} />
    </section>
  );
};

GameView.propTypes = {
  players: PropTypes.shape({
    X: PropTypes.string.isRequired,
    O: PropTypes.string.isRequired,
  }).isRequired,
  setIsDurringGame: PropTypes.func,
};

export default GameView;
