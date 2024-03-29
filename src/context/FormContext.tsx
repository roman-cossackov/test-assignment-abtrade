import { createContext, ReactNode, useContext, useState } from 'react';

import { IForm, IProduct } from '../types/interfaces';

interface FormContext {
  data: IForm;
  setData: (newObj: IForm) => void;
  addGroup: () => void;
  deleteGroup: (groupId: number) => void;
  addProductInLocalStorage: (groupId: number) => void;
  deleteProductInLocalStorage: (groupId: number, productId: number) => void;
  updateFieldsInLocalStorage: (
    groupId: number,
    productId: number,
    newProduct: IProduct,
  ) => void;
  logForm: () => void;
}

interface FormContextProvider {
  children: ReactNode;
}

const DEFAULT_DATA = `{"sum":0,"groups":[{"id":1,"sum":0,"products":[{"id":1,"name":"Продукт 1","sum":0,"count":0,"price":0}]}]}`;

export const FormContext = createContext({} as FormContext);

export const useFormContext = () => {
  return useContext(FormContext);
};

const getFormData = (): IForm => {
  let data: string = localStorage.formData;
  if (!data) {
    data = DEFAULT_DATA;
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

  const addProductInLocalStorage = (groupId: number) => {
    const data = getFormData();
    const productList = data.groups.find((group) => group.id === groupId)?.products;

    if (!productList) {
      return;
    }

    const newId = +productList[productList.length - 1].id + 1;
    const newProduct = {
      id: newId,
      name: `Продукт ${newId}`,
      sum: 0,
      count: 0,
      price: 0,
    };

    const prevGroup = data.groups.find((group) => group.id === groupId);

    if (!prevGroup) {
      return;
    }

    const newGroup = {
      ...prevGroup,
      products: [...productList, newProduct],
    };

    const newFormData = {
      ...data,
      groups: data.groups.map((group) => (group.id === groupId ? newGroup : group)),
    };

    localStorage.formData = JSON.stringify(newFormData);
    setFormData(newFormData);
  };

  const deleteProductInLocalStorage = (groupId: number, productId: number) => {
    let updatedFormData = {
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

    if (!updatedFormData.groups.find((group) => group.id === groupId)?.products.length) {
      updatedFormData = {
        ...formData,
        groups: formData.groups.filter((group) => group.id !== groupId),
      };
    }

    setData(updatedFormData);
    window.dispatchEvent(new Event('storage'));
  };

  const updateFieldsInLocalStorage = (
    groupId: number,
    productId: number,
    newProduct: IProduct,
  ) => {
    const data = getFormData();
    let updatedFormData: IForm = {
      ...data,
      groups: data.groups.map((group) => {
        if (group.id === groupId) {
          const updatedProducts = group.products.map((product) =>
            product.id === productId ? newProduct : product,
          );
          return { ...group, products: updatedProducts };
        }
        return group;
      }),
    };

    updatedFormData = countSum(updatedFormData);

    localStorage.formData = JSON.stringify(updatedFormData);
    window.dispatchEvent(new Event('storage'));
  };

  const logForm = () => {
    console.log(getFormData());
    setData(JSON.parse(DEFAULT_DATA));
    window.dispatchEvent(new Event('storage'));
  };

  const contextValue: FormContext = {
    data: formData,
    setData,
    addGroup,
    deleteGroup,
    addProductInLocalStorage,
    deleteProductInLocalStorage,
    updateFieldsInLocalStorage,
    logForm,
  };

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};
