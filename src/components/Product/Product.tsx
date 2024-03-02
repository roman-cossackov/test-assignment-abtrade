import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Product.module.scss';

interface ProductProps {
  name: string;
  price: number;
  quantity: number;
}

const Product = ({ name, price, quantity }: ProductProps) => {
  return (
    <div className={styles.product}>
      <div className={styles.field}>
        <label htmlFor="name">Название</label>
        <input type="text" id="name" name="name" value={name} />
      </div>
      <div className={styles.field}>
        <label htmlFor="price">Цена</label>
        <input type="number" id="price" name="price" value={price} />
      </div>
      <div className={styles.field}>
        <label htmlFor="quantity">Количество</label>
        <input type="number" id="name" name="name" value={quantity} />
      </div>
      <div className={styles.field}>
        <label htmlFor="sum">Сумма</label>
        <input type="number" id="name" name="name" value={price * quantity} />
      </div>
      <div className={styles.buttonContainer}>
        <Button theme={ButtonTheme.RED}>удалить</Button>
      </div>
    </div>
  );
};

export default Product;
