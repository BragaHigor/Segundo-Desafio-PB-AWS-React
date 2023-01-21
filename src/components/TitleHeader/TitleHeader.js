//CSS
import styles from "./TitleHeader.module.css"

const TitleHeader = () => {

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1 className={styles.h1}>Weekly Planner</h1>
                <p className={styles.paragrafo}>Use this planner to organize your daily issues.</p>
            </div>
        </div>
    )
}

export default TitleHeader