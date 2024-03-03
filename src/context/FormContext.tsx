import { createContext, ReactNode, useContext, useState } from 'react';

import { IForm } from '../types/interfaces';

interface FormContext {
  data: IForm;
  setData: (newObj: IForm) => void;
  addGroup: (formData: IForm) => void;
  deleteGroup: (groupId: number) => void;
  addProduct: (groupId: number) => void;
}

interface FormContextProvider {
  children: ReactNode;
}

export const FormContext = createContext({} as FormContext);

export const useFormContext = () => {
  return useContext(FormContext);
};

// const formData: IForm = {
//   sum: 111,
//   groups: [
//     {
//       id: 1,
//       sum: 10,
//       products: [
//         { id: 1, name: 'Продукт 1', sum: 6, count: 3, price: 2 },
//         { id: 2, name: 'Продукт 2', sum: 4, count: 2, price: 2 },
//       ],
//     },
//     {
//       id: 2,
//       sum: 10,
//       products: [
//         { id: 1, name: 'Продукт 1', sum: 1, count: 1, price: 1 },
//         { id: 2, name: 'Продукт 2', sum: 100, count: 1, price: 100 },
//       ],
//     },
//   ],
// };

const getFormData = (): IForm => {
  let data = localStorage.getItem('formData');
  if (!data) {
    data = `{"sum":0,"groups":[{"id":1,"sum":0,"products":[{"id":1,"name":"Продукт 1","sum":0,"count":0,"price":0}]}]}`;
  }
  const parsedData = JSON.parse(data);
  return parsedData;
};

export const FormContextProvider = ({ children }: FormContextProvider) => {
  const [formData, setFormData] = useState(getFormData());

  const setData = (newObj: IForm) => {
    localStorage.setItem('formData', JSON.stringify(newObj));
    setFormData(newObj);
  };

  const addGroup = () => {
    const newId =
      formData.groups.length > 0
        ? +formData.groups[formData.groups.length - 1].id + 1
        : 1;
    const newGroup = {
      id: newId,
      sum: 0,
      products: [{ id: 1, name: `Продукт ${newId}`, sum: 0, count: 0, price: 0 }],
    };
    const newFormData = {
      ...formData,
      groups: [...formData.groups, newGroup],
    };
    setData(newFormData);
  };

  const deleteGroup = (groupId: number) => {
    const newFormData = {
      ...formData,
      groups: formData.groups.filter((group) => group.id !== groupId),
    };
    setData(newFormData);
  };

  const addProduct = (groupId: number) => {
    const productList = formData.groups[groupId].products;
    const newId = productList.length > 0 ? +productList[productList.length - 1] + 1 : 1;
    const newProduct = { id: 1, name: `Продукт ${newId}`, sum: 0, count: 0, price: 0 };
    const newGroup = {
      ...formData.groups[groupId],
      products: [...productList, newProduct],
    };

    const newFormData = {
      ...formData,
      groups: formData.groups.map((group) => (group.id === groupId ? newGroup : group)),
    };

    setData(newFormData);
  };

  const contextValue: FormContext = {
    data: formData,
    setData,
    addGroup,
    deleteGroup,
    addProduct,
  };

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};
