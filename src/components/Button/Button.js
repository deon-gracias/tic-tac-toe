import styles from './Button.module.scss';
import PropTypes from 'prop-types';

const Button = ({
  children,
  isSmall = false,
  isSecondary = false,
  isTertiary = false,
  ...props
}) => {
  const className = `
  ${styles.button}
  ${isSmall && styles.buttonSmall}
  ${isSecondary && styles.buttonSecondary}
  ${isTertiary && styles.buttonTertiary}
  }`;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  isSmall: PropTypes.bool,
  isSecondary: PropTypes.bool,
  isTertiary: PropTypes.bool,
};

export default Button;
