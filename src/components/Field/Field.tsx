import { HTMLInputTypeAttribute } from 'react';

import styles from './Field.module.scss';

interface FieldProps {
  id: number;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  handleChangeValue?: (newValue: number | string) => void;
  isReadOnly?: boolean;
  max?: number;
  min?: number;
}

const Field = ({
  id,
  label,
  type,
  value,
  handleChangeValue,
  isReadOnly,
  max,
  min,
}: FieldProps) => {
  return (
    <legend className={styles.field}>
      <label htmlFor={`${id}`}>{label}</label>
      <input
        type={type}
        id={`${id}`}
        name="name"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (handleChangeValue) {
            handleChangeValue(event.target.value);
          }
        }}
        readOnly={isReadOnly}
        max={max}
        min={min}
      />
    </legend>
  );
};

export default Field;
