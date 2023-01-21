//CSS
import styles from "./LogoutLogoUOL.module.css"

//image
import iconLogout from '../../assets/img/Arrow.svg'
import CompassBlack from '../../assets/img/LogoCompassBlack.svg'

//hooks
import useAuth from '../../hooks/useAuth'

//router
import { useNavigate } from 'react-router-dom'

const LogoutLogoUOL = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div>
                <img src={CompassBlack} alt="Logo Compass Black"/>
            </div>
            <div className={styles.iconLogout}>
                <img src={iconLogout} alt="Logout" />
                <span className={styles.Logout} onClick={() => [logout(), navigate('/')]}>Logout</span>
            </div>
        </div>
    )
}

export default LogoutLogoUOL