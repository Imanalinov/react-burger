import React from 'react';

export const useForm = <T>(initialForm: T): [T, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [form, setForm] = React.useState<T>(initialForm);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      throw new Error('Вы не передали ивент в функцию!');
    }
    const { name, value } = event.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return [form, onChange];
};
