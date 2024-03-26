import styles from './reset-password.module.scss';

import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { restorePasswordSlice } from '../../services/slices/restore-password';
import { resetPasswordAPI } from '../../services/actions/restore-password';
import { useDispatch, useSelector } from '../../models/store.model';

export const ResetPasswordPage = () => {
  const { password, token, resetPassword, email } = useSelector(store => store.restorePassword);
  const { resetPasswordSetValue } = restorePasswordSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password', { replace: true });
    }
  }, []);

  const onFormFieldChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(resetPasswordSetValue({
      field: target.name,
      value: target.value
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length && token.length) {
      dispatch(resetPasswordAPI({ token, password }))
        .then((res) => {
          // @ts-ignore
          if (res.error) {
            return;
          }
          navigate('/login', { replace: true, state });
        });
    }
  };

  return (
    <section className={styles.reset_password__section}>
      <h1 className={'text text_type_main-medium'}>
        Восстановление пароля
      </h1>
      <form
        className={`mt-6 ${styles.reset_password__form}`}
        onSubmit={onSubmit}
      >
        <PasswordInput
          onChange={onFormFieldChange}
          value={password}
          name={'password'}
          autoComplete={'new-password'}
          placeholder={'Введите новый пароль'}
          noValidate={true}
          required={true}
          minLength={3}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onFormFieldChange}
          value={token}
          name={'token'}
          extraClass={'mt-6'}
          required={true}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={'mt-6'}
          disabled={resetPassword.loading}
        >
          <p className="text text_type_main-default">
            Сохранить
          </p>
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
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
