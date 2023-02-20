//CSS
import styles from '../Register/Register.module.css'

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import InputDate from '../../components/InputDate/InputDate'
import Image from '../../components/Image/Image'

//hooks 
import { useState, useEffect } from 'react'

//utils
import {
  validateFirstName,
  validateLastName,
  validateCountry,
  validateCity,
  validateEmail,
  validateSenha,
} from '../../Utils/regex'

//axios
import http from '../../server/http'

const Register = () => {

  //STATE DE VALUE
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  //STATE DE ERROR
  const [inputFirstNameErr, setInputFirstNameErr] = useState(false);
  const [inputLastNameErr, setInputLastNameErr] = useState(false);
  const [inputCountryErr, setInputCountryErr] = useState(false);
  const [inputCityErr, setInputCityErr] = useState(false);
  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [inputPassordErr, setInputPasswordErr] = useState(false);
  
  const [error, setError] = useState('');

  const navigate = useNavigate()


  //VALIDAÇÃO FORA DO INPUT EMAIL E PASSWORD
  const onBlurHandler = (e) => {

    switch (e.target.name) {

      case 'firstName':
        if (!validateFirstName.test(firstName) && firstName.trim() !== '') {
          return setInputFirstNameErr(true);
    
        } else {
            return setInputFirstNameErr(false);
        }
        
      case 'lastName':
        if (!validateLastName.test(lastName) && lastName.trim() !== '') {
          return setInputLastNameErr(true);
    
        } else {
            return setInputLastNameErr(false);
        }

      case 'country':
        if (!validateCountry.test(country) && country.trim() !== '')  {
          return setInputCountryErr(true);
    
        } else {
            return setInputCountryErr(false);
        }

      case 'city':
        if (!validateCity.test(city) && city.trim() !== '')  {
          return setInputCityErr(true);
    
        } else {
            return setInputCityErr(false);
        }

      case 'email':
        if (!validateEmail.test(email) && email.trim() !== '') {
          return setInputEmailErr(true);
    
        } else {
            return setInputEmailErr(false);
        }

      case 'password':
        if (!validateSenha.test(password) && password.trim() !== '')  {
          return setInputPasswordErr(true);
    
        } else {
            return setInputPasswordErr(false);
        }
     
      }
  }

  //MENSAGEM DE ERRO DO INPUT
  useEffect(() => {
    if (!validateFirstName.test(firstName) && firstName.trim() !== '') {
      return setInputFirstNameErr(true);

    } else {
      setInputFirstNameErr(false);
    }

    if (!validateLastName.test(lastName) && lastName.trim() !== '') {
      return setInputLastNameErr(true);

    } else {
      setInputLastNameErr(false);
    }

    if (!validateCountry.test(country) && country.trim() !== '')  {
      return setInputCountryErr(true);

    } else {
      setInputCountryErr(false);
    }

    if (!validateCity.test(city) && city.trim() !== '')  {
      return setInputCityErr(true);

    } else {
      setInputCityErr(false);
    }
    
    if (validateEmail.test(email) || email.trim() === '') {
      setInputEmailErr(false);
    }

    if (validateSenha.test(password) || password.trim() === '') {
      setInputPasswordErr(false);
    }

  }, [firstName, lastName, country, city, email, password]);

  //API
  const registerSubmit = async () => {

    await http({
      method:'post',
      url: 'users/sign-up',
      data: {
        firstName,
        lastName,
        birthDate,
        country,
        city,
        email,
        password,
        confirmPassword
      }
    }) 

    .then((response) => {
      console.log(response)
      setTimeout(() => {
        navigate('/')
      }, 2000)

      toast.success('Successfully registered customer', {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })

    })

    


    .catch((error) => {
      console.log(error)
      toast.error('Email already registered', {
        className: "error-toast",
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })

  }

  //VALIDAÇÃO E CADASTRO DE USUÁRIO
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    //RETORNA ERRO CASO FALTAR UM CAMPO PARA PREENCHER
    if (
      !firstName |
      !lastName |
      !birthDate |
      !country |
      !city |
      !email |
      !password |
      !confirmPassword
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
    if (password !== confirmPassword) {
      
    return setError('Passwords must be the same')
    }

    //SE TUDO ESTIVER OK ELE CADASTRA O USUÁRIO
    if (registerSubmit()) {
      return
    }

  };

  return (
    <>
    <ToastContainer />
    <div className={styles.all}>
      <div className={styles.container}>
        <form className={styles.content} onSubmit={handleSubmit}>
          <div className={styles.text}>
            <h1 className={styles.title}>Welcome,</h1>
            <p className={styles.paragrafo}>Please, register to continue</p>
          </div>
          <Input
            name='firstName'
            Text='first name'
            type='text'
            placeholder='Your first name'
            value={firstName}
            required
            onChange={(e) => [setFirstName(e.target.value), setError('')]}
            onBlur={onBlurHandler}
          />
          <div>
          {inputFirstNameErr && <p className={styles.InputError}>Please add a valid name!</p>}
          </div>
          <Input
            name='lastName'
            Text='last name'
            type='text'
            placeholder='Your last name'
            value={lastName}
            required
            onChange={(e) => [setLastName(e.target.value), setError('')]}
            onBlur={onBlurHandler}
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
            name='country'
            Text='Country'
            type='text'
            placeholder='Your Country'
            value={country}
            required
            onChange={(e) => [setCountry(e.target.value), setError('')]}
            onBlur={onBlurHandler}
          />
          <div>
          {inputCountryErr && <p className={styles.InputError}>Please add a valid country!</p>}
          </div>
          <Input
            name='city'
            Text='City'
            type='text'
            placeholder='Your City'
            value={city}
            required
            onChange={(e) => [setCity(e.target.value), setError('')]}
            onBlur={onBlurHandler}
          />
          <div>
          {inputCityErr && <p className={styles.InputError}>Please add a valid city!</p>}
          </div>
          <Input
            name='email'
            Text='e-mail'
            type='email'
            placeholder='A valid e-mail here'
            value={email}
            required
            onChange={(e) => [setEmail(e.target.value), setError('')]}
            onBlur={onBlurHandler}
          />
          <div>
          {inputEmailErr && <p className={styles.InputError}>Please add a valid email!</p>}
          </div>
          <Input
            name='password'
            Text='password'
            type='password'
            placeholder='Your password'
            value={password}
            required
            onChange={(e) => [setPassword(e.target.value), setError('')]}
            onBlur={onBlurHandler}
          />
          <div>
          {inputPassordErr && <p className={styles.InputError}>Please add a strong password!</p>}
          </div>
          <Input
            Text='password'
            type='password'
            placeholder='Comfirm your password'
            value={confirmPassword}
            required
            onChange={(e) => [setconfirmPassword(e.target.value), setError('')]}
          />
          <div className={styles.error}>
            <label className={styles.labelError}>{error}</label>
          </div>
          <div className={styles.button}>
            <Button Text='Register Now' onClick={handleSubmit} />
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
    </>
  )
}

export default Register