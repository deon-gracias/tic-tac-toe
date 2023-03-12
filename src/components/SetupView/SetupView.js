import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as IconX } from 'assets/icon-x.svg';
import { ReactComponent as IconO } from 'assets/icon-o.svg';
import Button from 'components/Button/Button';
import { useState } from 'react';
import styles from './SetupView.module.scss';
import PropTypes from 'prop-types';

const SetupView = ({ setIsDurringGame = () => {}, setPlayers = () => {} }) => {
  const [playerFirstMark, setPlayerFirstMark] = useState('X');

  const handleSetup = (opponent) => {
    setPlayers({
      X: playerFirstMark === 'X' ? 'player' : opponent,
      O: playerFirstMark === 'O' ? 'player' : opponent,
    });

    setIsDurringGame(true);
  };

  const {
    wrapper,
    markPanel,
    header,
    markWrapper,
    markIcon,
    markButton,
    markButtonSelected,
    info,
    logoWrapper,
  } = styles;

  return (
    <div className={wrapper}>
      <div className={logoWrapper}>
        <Logo />
      </div>
      <div className={markPanel}>
        <h1 className={header}>pick player 1's mark</h1>
        <div className={markWrapper}>
          <button
            title="mark x"
            className={`${markButton} ${
              playerFirstMark === 'X' && markButtonSelected
            }`}
            onClick={() => setPlayerFirstMark('X')}
            aria-pressed={playerFirstMark === 'X'}
          >
            <IconX className={markIcon} />
          </button>
          <button
            title="mark o"
            className={`${markButton} ${
              playerFirstMark === 'O' && markButtonSelected
            }`}
            onClick={() => setPlayerFirstMark('O')}
            aria-pressed={playerFirstMark === 'O'}
          >
            <IconO className={markIcon} />
          </button>
        </div>
        <p className={info}>remember: x goes first</p>
      </div>

      <Button onClick={() => handleSetup('cpu')}>new game (vs cpu)</Button>
      <Button onClick={() => handleSetup('player')} isSecondary>
        new game (vs player)
      </Button>
    </div>
  );
};

SetupView.propTypes = {
  setIsDurringGame: PropTypes.func,
  setPlayers: PropTypes.func,
};

export default SetupView;
