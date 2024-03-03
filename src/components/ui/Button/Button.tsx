import { ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  theme: ButtonTheme;
  onClick: () => void;
}

export enum ButtonTheme {
  RED = 'red',
  BLUE = 'blue',
}

const Button = ({ theme, children, onClick }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[theme]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
