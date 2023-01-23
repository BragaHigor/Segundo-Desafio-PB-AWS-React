//CSS
import styles from '../Login/Login.module.css'

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import InputLogin from "../../components/InputLogin/InputLogin"
import Button from "../../components/Button/Button"
import Image from '../../components/Image/Image'

//hooks
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [iconPassword, setIconPassword] = useState(false)
  const [iconUser, setIconUser] = useState(false)

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email | !password) {
      setError('Fill in all fields');
      return
    }

    const res = login(email, password)

    if (res) {
      setError(res)
      return
    }

    navigate('/home')

  }

  useEffect(() => {

    if(email.length > 0){
      setIconUser(true)
    }

  },[handleLogin, email])


  useEffect(() => {

    if(password.length > 0){
      setIconPassword(true)
    }

  },[handleLogin, password])


  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1 className={styles.title}>Welcome,</h1>
            <p className={styles.paragrafo}>To continue browsing safely, log in to the network.</p>
          </div>
          <label className={styles.Login}>Login</label>
          <div className={styles.inputUserName}>
            <InputLogin
              type='email'
              placeholder='user name'
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError('')]}
              icon={"iconUser"}
              putInside={iconUser}
              onFocus={() => {setIconUser(true)}}
              onBlur={ () => {if(email.length === 0){setIconUser(false)}}}
            />
          </div>
          <div className={styles.inputPassword}>
          <InputLogin
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError('')]}
            icon={"iconPassword"}
            putInside={iconPassword}
            onFocus={() => {setIconPassword(true)}}
            onBlur={ () => {if(password.length === 0){setIconPassword(false)}}}
          />
          </div>
          <div className={styles.error}>
            <label className={styles.labelError}>{error}</label>
          </div>
          <div className={styles.button}>
            <Button Text='Log in' onClick={handleLogin} />
            <div className={styles.acessoRegister}>
              <p className={styles.labelRegister}>
                Don't have an account?
                <span>
                  <Link to='/register' className={styles.labelStrong}>&nbsp;Register here</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image />
    </div>
  )
}

export default Login