import { IProduct } from '../../types/interfaces';
import Field from '../Field/Field';
import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Product.module.scss';

interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  return (
    <div className={styles.product}>
      <Field
        groupId={+product.id}
        label="Название"
        type="text"
        value={product.name}
        changeValueHandler={() => {}}
      />
      <Field
        groupId={+product.id}
        label="Цена"
        type="number"
        value={product.price}
        changeValueHandler={() => {}}
      />
      <Field
        groupId={+product.id}
        label="Кол-во"
        type="number"
        value={product.count}
        changeValueHandler={() => {}}
      />
      <Field
        groupId={+product.id}
        label="Сумма"
        type="number"
        value={product.sum}
        changeValueHandler={() => {}}
      />
      <div className={styles.buttonContainer}>
        <Button theme={ButtonTheme.RED}>удалить</Button>
      </div>
    </div>
  );
};

export default Product;
