import { debounce } from 'lodash';
import { HTMLInputTypeAttribute, useCallback } from 'react';

import styles from './Field.module.scss';

interface FieldProps {
  id: number;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  handleChangeValue?: (newValue: number | string) => void;
  isReadOnly?: boolean;
}

const Field = ({ id, label, type, value, handleChangeValue, isReadOnly }: FieldProps) => {
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
      />
    </legend>
  );
};

export default Field;
