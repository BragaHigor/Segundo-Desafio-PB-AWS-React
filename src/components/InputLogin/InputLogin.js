//CSS
import styles from '../InputLogin/InputLogin.module.css'

const InputLogin = ({ Text, type, placeholder, value, onChange }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{Text}</label>
            <input className={styles.input}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}

export default InputLogin