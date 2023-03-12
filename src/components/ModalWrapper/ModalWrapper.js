import styles from './ModalWrapper.module.scss';
import { useEffect } from 'react';
import reactDom from 'react-dom';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

const ModalWrapper = ({ children }) => {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);

    return () => modalRoot.removeChild(el);
  });

  return reactDom.createPortal(
    <>
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.shadow}></div>
    </>,
    el
  );
};

export default ModalWrapper;
