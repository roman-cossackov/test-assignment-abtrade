import { useEffect, useState } from 'react';

import { IForm } from '../../types/interfaces';

interface TotalProps {
  initialSum: number;
}

const Total = ({ initialSum }: TotalProps) => {
  const [totalSum, setTotalSum] = useState(initialSum);

  const handleLocalStorageChange = () => {
    if (!localStorage.formData) {
      return;
    }

    const data: IForm = JSON.parse(localStorage.formData);
    const newTotalSum = data.sum;
    setTotalSum(newTotalSum);
  };

  useEffect(() => {
    window.addEventListener('storage', handleLocalStorageChange);

    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, []);

  return <h2>Total: {totalSum}</h2>;
};

export default Total;
