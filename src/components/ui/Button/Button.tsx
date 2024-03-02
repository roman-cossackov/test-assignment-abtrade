import { ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  theme: ButtonTheme;
}

export enum ButtonTheme {
  RED = 'red',
  BLUE = 'blue',
}

const Button = ({ theme, children }: ButtonProps) => {
  return <button className={`${styles.button} ${styles[theme]}`}>{children}</button>;
};

export default Button;
