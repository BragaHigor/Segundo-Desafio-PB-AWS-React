//CSS
import styles from '../Home/Home.module.css'

//router
import { useNavigate } from 'react-router-dom'

//components
import Button from '../../components/Button/Button'

//hooks
import useAuth from '../../hooks/useAuth'


const Home = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <title>Home</title>
      <Button Text="Sair" onClick={() => [logout(), navigate('/')]}>
        Sair 
      </Button>
       
    </div>
  )
}

export default Home