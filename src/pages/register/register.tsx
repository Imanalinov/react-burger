import styles from './register.module.scss';

import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { validateEmail } from '../../utils/validators';
import { createUserAPI } from '../../services/actions/user';
import { useForm } from '../../hooks/use-form-hook';

const formInitialState = {
  name: '',
  email: '',
  password: ''
};

export const RegisterPage = () => {
  const [form, onChange] = useForm(formInitialState);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.name.length && form.email.length && form.password.length && validateEmail(form.email)) {
      // @ts-ignore
      dispatch(createUserAPI(form))
        .then(() => {
          navigator('/profile');
        });
    }
  };

  return (
    <section className={styles.register__section}>
      <h1 className={'text text_type_main-medium'}>
        Регистрация
      </h1>
      <form
        className={`mt-6 ${styles.register__form}`}
        onSubmit={onSubmit}
      >
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
          name={'name'}
          size={'default'}
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}
          placeholder={'E-mail'}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          autoComplete={'password'}
          placeholder={'Пароль'}
          extraClass="mt-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={'mt-6'}
        >
          <p className="text text_type_main-default">
            Зарегистрироваться
          </p>
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link
          to={'/login'}
          className={'text text_type_main-default color-link ml-2'}
        >
          Войти
        </Link>
      </p>
    </section>
  );
};
