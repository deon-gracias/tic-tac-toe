import { ReactComponent as Logo } from 'assets/logo.svg';
import { ReactComponent as IconX } from 'assets/icon-x.svg';
import { ReactComponent as IconO } from 'assets/icon-o.svg';
import { ReactComponent as Icon } from 'assets/icon-restart.svg';
import Button from 'components/Button/Button';
import styles from './Header.module.scss';
import { useState } from 'react';
import RestartModal from 'components/RestartModal/RestartModal';
import PropTypes from 'prop-types';

const Header = ({ currentMark, setIsDurringGame }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToSetup = () => {
    setIsDurringGame(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Logo />
        <div className={styles.turnCard}>
          {currentMark === 'X' ? (
            <IconX className={styles.icon} />
          ) : (
            <IconO className={styles.icon} />
          )}

          <span aria-label={`${currentMark} has current move`}>turn</span>
        </div>
        <Button
          isTertiary
          isSmall
          onClick={handleOpenModal}
          aria-label="restart"
        >
          <Icon />
        </Button>
      </div>
      {isModalOpen && (
        <RestartModal
          handleBackToSetup={handleBackToSetup}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

Header.propTypes = {
  currentMark: PropTypes.oneOf(['X', 'O']).isRequired,
  setIsDurringGame: PropTypes.func.isRequired,
};

export default Header;
