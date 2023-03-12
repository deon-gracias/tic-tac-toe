import ModalWrapper from 'components/ModalWrapper/ModalWrapper';
import Button from 'components/Button/Button';
import styles from './RestartModal.module.scss';
import PropTypes from 'prop-types';

const RestartModal = ({ handleBackToSetup, handleCloseModal }) => {
  return (
    <ModalWrapper>
      <h2 className={styles.header}>restart game?</h2>
      <div className={styles.buttonsWrapper}>
        <Button isSmall isTertiary onClick={handleCloseModal}>
          no, cancel
        </Button>
        <Button isSmall onClick={handleBackToSetup}>
          yes, restart
        </Button>
      </div>
    </ModalWrapper>
  );
};

RestartModal.propTypes = {
  handleBackToSetup: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

export default RestartModal;
