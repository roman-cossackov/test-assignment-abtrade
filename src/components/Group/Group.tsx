import { useState } from 'react';

import { useFormContext } from '../../context/FormContext';
import { IGroup, IProduct } from '../../types/interfaces';
import Field from '../Field/Field';
import Product from '../Product/Product';
import Button, { ButtonTheme } from '../ui/Button/Button';
import styles from './Group.module.scss';

interface GroupProps {
  groupId: number;
}

const Group = ({ groupId }: GroupProps) => {
  const { data, deleteGroup, addProductInLocalStorage } = useFormContext();
  const [groupData, setGroupData] = useState(
    data.groups.find((group) => group.id === groupId),
  );

  if (!groupData) return <></>;

  const updateGroupData = (productId: number, newProduct: IProduct) => {
    const udpatedData: IGroup = {
      ...groupData,
      products: groupData.products.map((product) => {
        if (product.id === productId) {
          return newProduct;
        }
        return product;
      }),
    };

    let newSum = 0;
    udpatedData.products.forEach((product) => (newSum += product.sum));
    udpatedData.sum = newSum;

    setGroupData(udpatedData);
  };

  const deleteProduct = (productId: number) => {
    const udpatedData: IGroup = {
      ...groupData,
      products: groupData.products.filter((product) => product.id !== productId),
    };

    setGroupData(udpatedData);
  };

  const addProduct = () => {
    const productList = groupData.products;

    const newId =
      productList.length > 0 ? +productList[productList.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      name: `Продукт ${newId}`,
      sum: 0,
      count: 0,
      price: 0,
    };
    const udpatedData: IGroup = {
      ...groupData,
      products: [...productList, newProduct],
    };

    setGroupData(udpatedData);
  };

  return (
    <div className={styles.group}>
      <h2 className={styles.title}>Группа {groupData.id}</h2>
      <div className={styles.sum}>
        <Field
          id={+groupData.id}
          label={`Сумма группы ${groupData.id}`}
          type="text"
          value={groupData.sum}
        />
      </div>
      <Button
        theme={ButtonTheme.RED}
        onClick={() => {
          deleteGroup(+groupData.id);
        }}
      >
        удалить группу
      </Button>
      <ul className={styles.products}>
        {groupData.products.map((product) => (
          <li key={product.id}>
            <Product
              product={product}
              groupId={+groupData.id}
              updateGroupData={updateGroupData}
              deleteProduct={deleteProduct}
            />
          </li>
        ))}
      </ul>

      <Button
        theme={ButtonTheme.BLUE}
        onClick={() => {
          addProduct();
          addProductInLocalStorage(+groupData.id);
        }}
      >
        добавить продукт
      </Button>
    </div>
  );
};

export default Group;
