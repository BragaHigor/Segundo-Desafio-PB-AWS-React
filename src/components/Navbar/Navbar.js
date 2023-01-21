//CSS
import styles from "./Navbar.module.css"

//components
import LogoutLogoUOL from '../LogoutLogoUOL/LogoutLogoUOL'
import TitleHeader from '../TitleHeader/TitleHeader'
import Time from "../Time/Time"
import ApiTempo from "../ApiTempo/ApiTempo"

const Navbar = () => {
  
    return (
      <div className={styles.navbar}>
        <TitleHeader />
        <Time />
        <ApiTempo /> 
        <LogoutLogoUOL />
      </div>
    )
}

export default Navbar