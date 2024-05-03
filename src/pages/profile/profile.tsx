import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';

import { getUserAPI } from '../../services/actions/user';
import { useDispatch, useSelector } from '../../models/store.model';

export const ProfilePage: React.FC = (): React.ReactElement | null => {
  const userState = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('******');

  useEffect(() => {
    dispatch(getUserAPI());
  }, [])

  const onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  }

  const onIconClick = () => {

  }

  if (userState.loading && !userState.user) {
    return null;
  }

  return (
    <>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        icon={'EditIcon'}
        value={userState.user?.name || ''}
        name={'name'}
        onIconClick={onIconClick}
      />
      <EmailInput
        onChange={onFormChange}
        value={userState.user?.email || ''}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraClass="mt-6"
      />
      <PasswordInput
        onChange={onFormChange}
        value={password}
        name={'password'}
        extraClass="mt-6"
        icon={'EditIcon'}
      />
    </>
  )
};
