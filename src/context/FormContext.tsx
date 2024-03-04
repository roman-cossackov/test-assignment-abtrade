import { createContext, ReactNode, useContext, useState } from 'react';

import { IForm, IGroup, IProduct } from '../types/interfaces';

interface FormContext {
  data: IForm;
  setData: (newObj: IForm) => void;
  addGroup: () => void;
  deleteGroup: (groupId: number) => void;
  addProduct: (groupId: number) => void;
  deleteProduct: (groupId: number, productId: number) => void;
  updateFields: (groupId: number, productId: number, newProduct: IProduct) => void;
}

interface FormContextProvider {
  children: ReactNode;
}

export const FormContext = createContext({} as FormContext);

export const useFormContext = () => {
  return useContext(FormContext);
};

const getFormData = (): IForm => {
  let data: string = localStorage.formData;
  if (!data) {
    data = `{"sum":0,"groups":[{"id":1,"sum":0,"products":[{"id":1,"name":"Продукт 1","sum":0,"count":0,"price":0}]}]}`;
  }
  const parsedData = JSON.parse(data);
  return parsedData;
};

export const FormContextProvider = ({ children }: FormContextProvider) => {
  const [formData, setFormData] = useState(getFormData());

  const countSum = (form: IForm): IForm => {
    form.sum = 0;
    for (const group of form.groups) {
      group.sum = 0;
      for (const product of group.products) {
        group.sum += product.sum;
      }
      form.sum += group.sum;
    }

    return form;
  };

  const setData = (newObj: IForm) => {
    newObj = countSum(newObj);
    localStorage.formData = JSON.stringify(newObj);
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
      products: [{ id: 1, name: `Продукт 1`, sum: 0, count: 0, price: 0 }],
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
    const productList = formData.groups.find((group) => group.id === groupId)?.products;

    if (!productList) {
      return;
    }

    const newId =
      productList.length > 0 ? +productList[productList.length - 1].id + 1 : 1;
    const newProduct = {
      id: newId,
      name: `Продукт ${newId}`,
      sum: 0,
      count: 0,
      price: 0,
    };
    const newGroup = {
      ...formData.groups.find((group) => group.id === groupId),
      products: [...productList, newProduct],
    };

    const newFormData = {
      ...formData,
      groups: formData.groups.map((group) => (group.id === groupId ? newGroup : group)),
    };

    setData(newFormData as IForm);
  };

  const deleteProduct = (groupId: number, productId: number) => {
    const updatedFormData = {
      ...formData,
      groups: formData.groups.map((group) => {
        if (group.id === groupId) {
          const updatedProducts = group.products.filter(
            (product) => product.id !== productId,
          );
          return { ...group, products: updatedProducts };
        }
        return group;
      }),
    };

    setData(updatedFormData as IForm);
  };

  const updateFields = (groupId: number, productId: number, newProduct: IProduct) => {
    const updatedFormData: IForm = {
      ...formData,
      groups: formData.groups.map((group) => {
        if (group.id === groupId) {
          const updatedProducts = group.products.map((product) =>
            product.id === productId ? newProduct : product,
          );
          return { ...group, products: updatedProducts };
        }
        return group;
      }),
    };

    setData(updatedFormData);
  };

  const contextValue: FormContext = {
    data: formData,
    setData,
    addGroup,
    deleteGroup,
    addProduct,
    deleteProduct,
    updateFields,
  };

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};
