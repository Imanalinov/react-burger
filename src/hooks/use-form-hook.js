import { useState } from 'react';

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const onChange = (event) => {
    if (!event) {
      throw new Error('Вы не передали ивент в функцию!');
    }
    const { name, value } = event.target;

    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return [form, onChange]
};
