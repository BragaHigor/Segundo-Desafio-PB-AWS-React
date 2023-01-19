//CSS
import styles from '../InputDate/InputDate.module.css'

const InputDate = ({Text, type, placeholder, value, onChange, max}) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{Text}</label>
            <input className={styles.input}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                max={max}
            />
        </div>
    )
}

export default InputDate