import { useFormContext } from '../../context/FormContext';
import { IGroup, IProduct } from '../../types/interfaces';
import Field from '../Field/Field';
import Product from '../Product/Product';
import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Group.module.scss';

interface GroupProps {
  group: IGroup;
}

const Group = ({ group }: GroupProps) => {
  const { deleteGroup, addProduct } = useFormContext();

  return (
    <div className={styles.group}>
      <h2 className={styles.title}>Группа {group.id}</h2>
      <div className={styles.sum}>
        <Field
          id={+group.id}
          label={`Сумма группы ${group.id}`}
          type="text"
          value={group.sum}
        />
      </div>
      <Button
        theme={ButtonTheme.RED}
        onClick={() => {
          deleteGroup(+group.id);
        }}
      >
        удалить группу
      </Button>
      <ul className={styles.products}>
        {group.products.map((product) => (
          <li key={product.id}>
            <Product product={product} groupId={+group.id} />
          </li>
        ))}
      </ul>

      <Button
        theme={ButtonTheme.BLUE}
        onClick={() => {
          addProduct(+group.id);
        }}
      >
        добавить продукт
      </Button>
    </div>
  );
};

export default Group;
