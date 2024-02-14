import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './login.module.scss';
import { validateEmail } from '../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { loginAPI } from '../../services/actions/user';

const formInitialState = {
  email: '',
  password: ''
};

export const LoginPage = () => {
  const [form, setForm] = useState(formInitialState);
  const userState = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.user) {
      navigate('/profile', {replace: true});
    }
  }, [userState.user]);

  const onChange = ({ target }) => {
    setForm(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (form.email.length && form.password.length && validateEmail(form.email)) {
      dispatch(loginAPI(form))
        .then((res) => {
          navigate('/profile', {
            replace: true
          })
        });
    }
  };

  return (
    <section className={styles.login__section}>
      <h1 className={'text text_type_main-medium'}>Вход</h1>
      <form className={`mt-6 ${styles.login__form}`}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}
          placeholder={'E-mail'}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass="mt-6"
          autoComplete={'password'}
          placeholder={'Пароль'}
        />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onSubmit}
          extraClass={'mt-6'}
          disabled={userState.loading}
        >
          <p className="text text_type_main-default">
            Войти
          </p>
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link
          className={'text text_type_main-default color-link ml-2'}
          to={'/register'}
        >
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link
          className={'text text_type_main-default color-link ml-2'}
          to={'/forgot-password'}
        >
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};
