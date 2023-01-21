//CSS
import styles from '../Register/Register.module.css'

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import InputDate from '../../components/InputDate/InputDate'
import Image from '../../components/Image/Image'

//hooks 
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

//utils
import {
  validateFirstName,
  validateLastName,
  validateCountry,
  validateCity,
  validateEmail,
  validateSenha,
} from '../../Utils/regex'


const Register = () => {

  //STATE DE VALUE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  //STATE DE ERROR
  const [inputFirstNameErr, setInputFirstNameErr] = useState(false);
  const [inputLastNameErr, setInputLastNameErr] = useState(false);
  const [inputCountryErr, setInputCountryErr] = useState(false);
  const [inputCityErr, setInputCityErr] = useState(false);
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [inputPassordErr, setInputPasswordErr] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

  const navigate = useNavigate()

  //VALIDAÇÃO E CADASTRO DE USUÁRIO
  const handleRegister = () => {

    //RETORNA ERRO CASO FALTAR UM CAMPO PARA PREENCHER
    if (
      !firstName |
      !lastName |
      !birthDate |
      !country |
      !city |
      !email |
      !password |
      !passwordConf
    ) {

      return setError('Fill in all fields')
    }

    //VALIDA SE OS INPUTS ESTÃO CORRETOS DE ACORDO COM O REGEX
    if (!validateFirstName.test(firstName)) {
      return setInputFirstNameErr(true);

    } else {
      setInputFirstNameErr(false);
    }
    if (!validateLastName.test(lastName)) {
      return setInputLastNameErr(true);

    } else {
      setInputLastNameErr(false);
    }
    if (!validateCountry.test(country)) {
      return setInputCountryErr(true);

    } else {
      setInputCountryErr(false);
    }
    if (!validateCity.test(city)) {
      return setInputCityErr(true);

    } else {
      setInputCityErr(false);
    }
    if (!validateEmail.test(email)) {
      return setInputEmailErr(true);

    } else {
      setInputEmailErr(false);
    }
    if (!validateSenha.test(password)) {
      return setInputPasswordErr(true);

    } else {
      setInputPasswordErr(false);
    }

  //RETORNA ERRO CASO A CONFIRMAÇÃO DE SENHA FOR DIFERENTE DA SENHA
    if (password !== passwordConf) {
    return setError('Passwords must be the same')
    }

    //SE TUDO ESTIVER OK ELE CADASTRA O USUÁRIO
    if (
      firstName &&
      lastName &&
      birthDate &&
      country &&
      city &&
      email &&
      password &&
      passwordConf &&
      inputFirstNameErr &&
      inputLastNameErr &&
      inputCountryErr &&
      inputCityErr &&
      inputEmailErr &&
      inputPassordErr

    ) {

    }

    // //DADOS DO USUÁRIO SALVO NO LOCALSTORAGE E CADASTRO DO USUÁRIO
    const res = register(email, password, country, city )

    if (res) {
      setError(res)
      return
    }

    //REDIRECIONAMENTO PARA TELA DE LOGIN
    navigate('/')

  };

  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <form className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.title}>Welcome,</h1>
            <p className={styles.paragrafo}>Please, register to continue</p>
          </div>
          <Input
            Text='first name'
            type='text'
            placeholder='Your first name'
            value={firstName}
            required
            onChange={(e) => [setFirstName(e.target.value), setError('')]}
          />
          <div>
          {inputFirstNameErr && <p className={styles.InputError}>Please add a valid name!</p>}
          </div>
          <Input
            Text='last name'
            type='text'
            placeholder='Your last name'
            value={lastName}
            required
            onChange={(e) => [setLastName(e.target.value), setError('')]}
          />
          <div>
          {inputLastNameErr && <p className={styles.InputError}>Please add a valid last name!</p>}
          </div>
          <InputDate
            Text='birth date'
            type='date'
            max="9999-12-31"
            value={birthDate}
            required
            onChange={(e) => [setBirthDate(e.target.value), setError('')]}
          />
          <div>
          {/* COLOCAR ERRO DA DATA */}
          </div>
          <Input
            Text='Country'
            type='text'
            placeholder='Your Country'
            value={country}
            required
            onChange={(e) => [setCountry(e.target.value), setError('')]}
          />
          <div>
          {inputCountryErr && <p className={styles.InputError}>Please add a valid country!</p>}
          </div>
          <Input
            Text='City'
            type='text'
            placeholder='Your City'
            value={city}
            required
            onChange={(e) => [setCity(e.target.value), setError('')]}
          />
          <div>
          {inputCityErr && <p className={styles.InputError}>Please add a valid city!</p>}
          </div>
          <Input
            Text='e-mail'
            type='email'
            placeholder='A valid e-mail here'
            value={email}
            required
            onChange={(e) => [setEmail(e.target.value), setError('')]}
          />
          <div>
          {inputEmailErr && <p className={styles.InputError}>Please add a valid email!</p>}
          </div>
          <Input
            Text='password'
            type='password'
            placeholder='Your password'
            value={password}
            required
            onChange={(e) => [setPassword(e.target.value), setError('')]}
          />
          <div>
          {inputPassordErr && <p className={styles.InputError}>Please add a strong password!</p>}
          </div>
          <Input
            Text='password'
            type='password'
            placeholder='Comfirm your password'
            value={passwordConf}
            required
            onChange={(e) => [setPasswordConf(e.target.value), setError('')]}
          />
          <div className={styles.error}>
            <label className={styles.labelError}>{error}</label>
          </div>
          <div className={styles.button}>
            <Button Text='Register Now' onClick={handleRegister} />
            <div className={styles.acessoLogin}>
          <p className={styles.labelLogin}>
            Already have an account?
            <span>
              <Link to='/' className={styles.labelStrong}>&nbsp;Access here</Link>
            </span>
          </p>
        </div>
          </div>
        </form>
      </div>
      <Image />
    </div>
  )
}

export default Register