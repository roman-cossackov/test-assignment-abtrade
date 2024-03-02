import Product from '../Product/Product';
import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Group.module.scss';

interface GroupProps {
  groupNumber: number;
}

const Group = ({ groupNumber }: GroupProps) => {
  return (
    <div className={styles.group}>
      <h2 className={styles.title}>Группа {groupNumber}</h2>
      <div className={styles.sum}>
        <label htmlFor="sum">Сумма групы {groupNumber}</label>
        <input type="text" id="sum" name="sum" disabled />
      </div>
      <Button theme={ButtonTheme.RED}>удалить группу</Button>
      <Product name={'Продукт 1'} price={10} quantity={3} />
      <Button theme={ButtonTheme.BLUE}>добавить продукт</Button>
    </div>
  );
};

export default Group;
