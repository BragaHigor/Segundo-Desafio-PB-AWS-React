//CSS
import styles from '../Button/Button.module.css'

const Button = ({Text, onClick, onChange, Type='button'}) => {
  return (
      <button className={styles.btn}
        type={Type}
        onChange={onChange}
        onClick={onClick}
        >
          {Text}
      </button>
  )
}

export default Button