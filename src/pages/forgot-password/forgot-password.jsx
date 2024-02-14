import styles from './forgot-password.module.scss';

import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { restorePasswordSlice } from '../../services/slices/restore-password';
import { validateEmail } from '../../utils/validators';
import { forgotPasswordAPI } from '../../services/actions/restore-password';


export const ForgotPasswordPage = () => {
  const { email, forgotPassword } = useSelector(store => store.restorePassword);
  const { forgotPasswordSetValue } = restorePasswordSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = ({ target }) => {
    dispatch(forgotPasswordSetValue(target.value));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      dispatch(forgotPasswordAPI(email))
        .then((res) => {
          if (res.error) {
            return;
          }
          navigate('/reset-password');
        })
    }
  };

  return (
    <section className={styles.forgot_password__section}>
      <h1 className={'text text_type_main-medium'}>
        Восстановление пароля
      </h1>
      <form className={`mt-6 ${styles.forgot_password__form}`}>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          isIcon={false}
          placeholder={'Укажите e-mail'}
        />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onSubmit}
          extraClass={'mt-6'}
          disabled={forgotPassword.loading}
        >
          <p className="text text_type_main-default">
            Восстановить
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
  )
};