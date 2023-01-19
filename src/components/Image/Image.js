//CSS
import styles from '../Image/Image.module.css'

//image
import CompassWhite from '../../assets/img/LogoCompassWhite.svg'

const Image = () => {
    return (
        <div className={styles.image}>
            <img className={styles.compass} src={CompassWhite} alt="Logo Compass White" />
        </div>
    )
}

export default Image