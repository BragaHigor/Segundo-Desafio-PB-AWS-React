//image
import iconPassword from '../../assets/img/icon-password.svg'
import iconUser from '../../assets/img/icon-user.svg'

//stylesComponents
import { Icon } from '../InputLogin/Icon.styles'

const IconLogin = (props) => {
  return (
    <Icon 
        putInside={props.putInside}>
        <img src={props.icon  === "iconPassword" ? iconPassword : iconUser } />
    </Icon>
  )
}

export default IconLogin