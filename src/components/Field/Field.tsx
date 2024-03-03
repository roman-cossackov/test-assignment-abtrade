import { HTMLInputTypeAttribute } from 'react';

import styles from './Field.module.scss';

interface FieldProps {
  groupId: number;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  changeValueHandler: () => void;
}

const Field = ({ groupId, label, type, value, changeValueHandler }: FieldProps) => {
  return (
    <div className={styles.field}>
      <label htmlFor={`${label}${groupId}`}>{label}</label>
      <input
        type={type}
        id={`${groupId}`}
        name="name"
        value={value}
        onChange={changeValueHandler}
      />
    </div>
  );
};

export default Field;
