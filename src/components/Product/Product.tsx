import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

import { useFormContext } from '../../context/FormContext';
import { IProduct } from '../../types/interfaces';
import Field from '../Field/Field';
import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Product.module.scss';

interface ProductProps {
  product: IProduct;
  groupId: number;
  updateGroupData: (productId: number, newProduct: IProduct) => void;
  deleteProduct: (productId: number) => void;
}

const ids = Array(4)
  .fill(null)
  .map(() => uuid());

const Product = ({ product, groupId, updateGroupData, deleteProduct }: ProductProps) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [count, setCount] = useState(product.count);
  const [sum, setSum] = useState(product.sum);

  const { updateFieldsInLocalStorage, deleteProductInLocalStorage } = useFormContext();

  useEffect(() => {
    setSum(price * count);
    const newProduct = { ...product, name, price, count, sum: price * count };
    updateGroupData(+product.id, newProduct);
    updateFieldsInLocalStorage(groupId, +product.id, newProduct);
  }, [price, count, name]);

  const fields = [
    {
      id: ids[0],
      label: 'Название',
      type: 'text',
      value: name,
      handleChangeValue: (newValue: string | number) => {
        setName(newValue.toString());
      },
    },
    {
      id: ids[1],
      label: 'Цена',
      type: 'number',
      value: price,
      handleChangeValue: (newValue: number | string) => {
        setPrice(+newValue);
      },
      min: 0,
    },
    {
      id: ids[2],
      label: 'Количество',
      type: 'number',
      value: count,
      handleChangeValue: (newValue: number | string) => {
        setCount(+newValue);
      },
      min: 0,
    },
    {
      id: ids[3],
      label: 'Сумма',
      type: 'number',
      value: sum,
      isReadOnly: true,
    },
  ];

  return (
    <div className={styles.product}>
      {fields.map((field) => (
        <Field
          key={field.id}
          id={+field.id}
          label={field.label}
          type={field.type}
          value={field.value}
          handleChangeValue={field.handleChangeValue}
          isReadOnly={field.isReadOnly}
          min={field.min}
        />
      ))}
      <div className={styles.buttonContainer}>
        <Button
          theme={ButtonTheme.RED}
          onClick={() => {
            deleteProduct(+product.id);
            deleteProductInLocalStorage(groupId, +product.id);
          }}
        >
          удалить
        </Button>
      </div>
    </div>
  );
};

export default Product;
