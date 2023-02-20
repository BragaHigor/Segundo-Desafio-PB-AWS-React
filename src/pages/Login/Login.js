//CSS
import styles from '../Login/Login.module.css'

//toastify
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//axios
import http from '../../server/http'

//router
import { Link, useNavigate } from 'react-router-dom'

//components
import InputLogin from "../../components/InputLogin/InputLogin"
import Button from "../../components/Button/Button"
import Image from '../../components/Image/Image'

//hooks
import { useEffect, useState } from 'react'


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [iconPassword, setIconPassword] = useState(false)
  const [iconUser, setIconUser] = useState(false)

  const navigate = useNavigate();

  const loginSubmit = async () => {

    await http({
      method:'post',
      url: 'users/sign-in',
      data: {
        email,
        password
      }
    }) 

    .then((response) => {
      console.log(response)

      setTimeout(() => {
        navigate('/home')
      }, 2300)
      
      localStorage.setItem("city_API", JSON.stringify(response.data.user.city))
      localStorage.setItem("country_API", JSON.stringify(response.data.user.country))
      localStorage.setItem("token_API", JSON.stringify(response.data.token))
      
      toast.success('Access released', {
        position: "bottom-left",
        autoClose: 2000,
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
      toast.error('Wrong password or email', {
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


  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email | !password) {
      setError('Fill in all fields');
      return
    } else {
      loginSubmit()
    }

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
    <>
    <ToastContainer />
    <div className={styles.all}>
      <div className={styles.container}>
        <form className={styles.content} onSubmit={handleLogin}>
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
        </form>
      </div>
      <Image />
    </div>
    </>
  )
}

export default Login