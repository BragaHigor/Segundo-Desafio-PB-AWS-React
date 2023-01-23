//CSS
import styles from '../InputLogin/InputLogin.module.css'

//components
import IconLogin from '../InputLogin/IconLogin'

const InputLogin = ({ Text, type, placeholder, value, onChange, icon, putInside, onFocus, onBlur }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{Text}</label>
            <input className={styles.input}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <IconLogin 
                icon={icon}
                putInside={putInside}
            />
        </div>
    )
}

export default InputLogin