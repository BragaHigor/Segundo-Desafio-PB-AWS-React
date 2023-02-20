//CSS
import styles from '../Input/Input.module.css'

const Input = ({Text, type, placeholder, value, onChange, name, onBlur}) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={name}>{Text}</label>
            <input className={styles.input}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                onBlur={onBlur}
            />
        </div>
    )
}

export default Input