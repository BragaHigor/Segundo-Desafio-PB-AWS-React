//CSS
import styles from '../Login/Login.module.css'

//image
import iconPassword from '../../assets/img/icon-password.svg'
import iconUser from '../../assets/img/icon-user.svg'

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import InputLogin from "../../components/InputLogin/InputLogin"
import Button from "../../components/Button/Button"
import Image from '../../components/Image/Image'

//hooks
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div className={styles.all}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h1>Welcome,</h1>
            <p>To continue browsing safely, log in to the network.</p>
          </div>
          <label className={styles.Login}>Login</label>
          <div className={styles.inputUserName}>
            <InputLogin
              type='email'
              placeholder='user name'
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError('')]}
            />
            
            {/* <div className={styles.icons}> */}
              <img className={styles.iconUser} src={iconUser} alt="Logo User" />
            {/* </div> */}
          </div>
          <div className={styles.inputPassword}>
          <InputLogin
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError('')]}
          />
          {/* <div className={styles.icons}> */}
            <img className={styles.iconPassword} src={iconPassword} alt="Logo Password" />
          {/* </div> */}
          </div>
          <div className={styles.error}>
            <label className={styles.labelError}>{error}</label>
          </div>
          <div className={styles.button}>
            <Button Text='Entrar' onClick={handleLogin} />
            <div className={styles.acessoRegister}>
              <p className={styles.labelRegister}>
                Don't have an account?
                <span>
                  <Link to='/register' className={styles.labelStrong}>&nbsp;Register</Link>
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