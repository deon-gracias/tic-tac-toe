import styles from './Board.module.scss';
import BoardCard from 'components/BoardCard/BoardCard';
import EndGameModal from 'components/EndGameModal/EndGameModal';
import PropTypes from 'prop-types';

const Board = ({
  board,
  currentMark,
  winner,
  handleUpdateBoard,
  setIsDurringGame,
  isCPUSelecting,
  handleSetNextRound,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        {board.map((mark, index) => (
          <BoardCard
            isBlocked={Boolean(winner)}
            key={index}
            currentMark={currentMark}
            mark={mark}
            updateBoard={() => handleUpdateBoard(index)}
            isCPUSelecting={isCPUSelecting}
            index={index}
          />
        ))}
      </div>
      {winner && (
        <EndGameModal
          winnerMark={winner}
          setIsDurringGame={setIsDurringGame}
          handleSetNextRound={handleSetNextRound}
        />
      )}
    </>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])),
  currentMark: PropTypes.oneOf(['X', 'O']),
  winner: PropTypes.oneOf(['X', 'O', 'ties']),
  handleUpdateBoard: PropTypes.func.isRequired,
  setIsDurringGame: PropTypes.func,
  isCPUSelecting: PropTypes.bool,
  handleSetNextRound: PropTypes.func,
};

export default Board;
