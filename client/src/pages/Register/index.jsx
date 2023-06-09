import './styles.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from 'shared/config/redux/slices/auth';

const Register = () => {
  const [registerError, setRegisterError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const { t } = useTranslation('register');

  if (isAuth) {
    navigate('/');
  }

  const handleChange = (event) => {
    setRegisterError(false);
    setFormData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await dispatch(fetchRegister(formData));
    if (data?.error) {
      console.warn(data.error.message);
      return setRegisterError(true);
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  return (
    <div className="container register">
      <div className="register_form">
        <h2>{t('account')}</h2>
        <form onSubmit={onSubmit}>
          <input
            onChange={handleChange}
            placeholder={t('name')}
            type={'text'}
            name={'fullName'}
            required
          />
          <input
            onChange={handleChange}
            placeholder={t('email')}
            type={'email'}
            name={'email'}
            required
          />
          <input
            onChange={handleChange}
            placeholder={t('mobile')}
            type={'text'}
            name={'mobilePhone'}
            required
          />
          <input
            onChange={handleChange}
            placeholder={t('password')}
            type={'password'}
            name={'password'}
            required
          />
          <button type='submit'>{t('register')}</button>
        </form>
        <span>-- {t('or')} --</span>
        <Link to={'/login'}>{t('login')}</Link>
        {
          registerError ? (
            <span className={'error_message'}>{t('error')}</span>
          ) : null
        }
      </div>
    </div>
  );
};

export default Register;
